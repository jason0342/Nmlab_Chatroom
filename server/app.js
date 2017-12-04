const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')

// TODO: Use MongoDB
let user_list = []
let room_list = {}
let sock_user_map = {}

let test_user = {
	id: 'test',
	pwd: '123',
	online: true
};
user_list.push(test_user);

function getUserFromDB(id) {
	let filtered = user_list.filter((user) => user.id === id);
	if (filtered.length > 0)
		return filtered[0];
	else
		return null;
}

function stripPwd(user) {
	return {
		id: user.id,
		online: user.online
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
		io.emit('USER_UPDATE', req_user);
		res.json({ status: true });
	}
})

app.get('/users', (req, res) => {
	res.json(user_list.map(user => stripPwd(user)));
})

app.post('/chat', (req, res) => {
	let pair = [];
	pair.push(req.body.id);
	pair.push(req.body.with);
	let room = pair.sort().join();
	if (!room_list[room])
		room_list[room] = [];
	res.json({
		room: room,
		msgs: room_list[room]
	})
})

io.on('connection', (socket) => {

	socket.on('ACK', (id) => {
		console.log(`${id}: connect[${socket.id}]`);
		sock_user_map[socket.id] = id;
		let db_user = getUserFromDB(id);
		db_user.online = true
		io.emit('USER_UPDATE', stripPwd(db_user));
	})

	socket.on('JOIN_ROOM', (room) => {
		console.log(`${sock_user_map[socket.id]}: JOIN_ROOM[${room}]`);
		socket.join(room);
	})

	socket.on('LEAVE_ROOM', (room) => {
		console.log(`${sock_user_map[socket.id]}: LEAVE_ROOM[${room}]`);
		socket.leave(room);
	})

	socket.on('SEND_MSG', (req) => {
		let msg = req.payload;
		msg.timestamp = Date.now()
		console.log(`${sock_user_map[socket.id]}: SEND_MSG[${JSON.stringify(msg)}]`);
		room_list[req.room].push(msg);
		/* Only those in the room need to know the new msg */
		io.to(req.room).emit('NEW_MSG', msg);
	})

	socket.on('disconnect', () => {
		console.log(`${sock_user_map[socket.id]}: disconnect`);
		let db_user = getUserFromDB(sock_user_map[socket.id]);
		delete sock_user_map[socket.id];
		db_user.online = false;
		io.emit('USER_UPDATE', stripPwd(db_user));
	})
})

http.listen(8888, () => {
	console.log('Server is up');
})
