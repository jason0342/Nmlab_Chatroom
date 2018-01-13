const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')

class SocketUserMap {
	constructor() {
		this.s2u = {};
		this.u2s = {};
	}

	addPair(socket, userid) {
		this.s2u[socket.id] = userid;
		this.u2s[userid] = socket;
	}

	remove(socket) {
		let userid = this.getUser(socket.id);
		delete this.s2u[socket.id];
		delete this.u2s[userid];
	}

	getSocket(userid) {
		return this.u2s[userid];
	}

	getUser(socket) {
		return this.s2u[socket.id];
	}
}

// TODO: Use MongoDB
let user_list = []
let room_list = {}
let mapping = new SocketUserMap();

let test_user = {
	id: 'test',
	pwd: '123',
	online: false
};
user_list.push(test_user);

function getUserFromDB(id) {
	let filtered = user_list.filter(user => user.id === id);
	if (filtered.length > 0)
		return filtered[0];
	else
		return null;
}

const stripPwd = user => { return { id: user.id, online: user.online } }

const getRoom = (a, b) => [a, b].sort().join();

const msgRead = (msg, id) => {
	if (msg.read === -1 && msg.dest === id) {
		let event = getRoom(msg.id, msg.dest);
		msg.read = Date.now();
		console.log(`READ_${event}: `, msg);
		io.emit(event, { timestamp: msg.timestamp, read: msg.read });
	}
}

app.use(bodyParser.json())

app.post('/login', (req, res) => {
	let req_user = req.body;
	let db_user = getUserFromDB(req_user.id);
	if (db_user) {
		if (db_user.pwd === req_user.pwd)
			res.json({ status: true });
		else
			res.json({ status: false });
	} else {
		req_user.online = false;
		user_list.push(req_user);
		res.json({ status: true });
	}
})

app.get('/users', (req, res) => {
	res.json(user_list.map(stripPwd));
})

app.post('/msgs', (req, res) => {
	let room = getRoom(req.body.id, req.body.dest);
	if (!room_list[room])
		room_list[room] = [];
	let idx = req.body.idx == 0 ? room_list[room].length : req.body.idx;
	let next = idx - 10 > 0 ? idx - 10 : 0;
	let msgs = room_list[room].slice(next, idx);
	// Mark all msgs as read
	msgs.forEach(msg => msgRead(msg, req.body.id));
	res.json({
		msgs: msgs,
		event: room,
		next: next
	})
})

io.on('connection', socket => {

	socket.on('ACK', id => {
		console.log(`${id}: connect[${socket.id}]`);
		mapping.addPair(socket, id);
		let db_user = getUserFromDB(id);
		db_user.online = true
		io.emit('USER_UPDATE', stripPwd(db_user));
	})

	socket.on('SEND_MSG', (msg, callback) => {
		let id = mapping.getUser(socket);
		let room = getRoom(id, msg.dest);

		// Update the msg
		msg.id = id;
		msg.timestamp = Date.now();
		msg.read = -1;
		console.log(`${id} SEND_MSG: `, msg);
		callback(msg);

		room_list[room].push(msg);

		let target = mapping.getSocket(msg.dest);
		if (target) {
			// If target is online, send him a notice
			target.emit('NEW_MSG', msg, (tgt_id) => msgRead(msg, tgt_id));
		}

	})

	socket.on('disconnect', () => {
		let id = mapping.getUser(socket);
		console.log(`${id}: disconnect`);
		mapping.remove(socket);
		let db_user = getUserFromDB(id);
		db_user.online = false;
		io.emit('USER_UPDATE', stripPwd(db_user));
	})
})

http.listen(8888, () => {
	console.log('Server is up');
})
