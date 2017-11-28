const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const bodyParser = require('body-parser')

// TODO: Use MongoDB
let room_list = []
let user_list = []

app.use(bodyParser.json())

app.post('/login', (req, res) => {
	let req_user = req.body;
	console.log(req_user);
	let db_user = user_list.filter((user) => user.user === req_user.user)
	if (db_user.length > 0) {
		if (db_user[0].pwd === req_user.pwd)
			res.json({ status: true });
		else
			res.json({ status: false });
	} else {
		user_list.push(req_user);
		res.json({ status: true })
	}
})

app.get('/list/room', (req, res) => {
	res.json(Object.keys(room_list))
})

app.get('/list/msg/:room', (req, res) => {
	res.json(room_list[req.params.room])
})

io.on('connection', (socket) => {
	console.log(`${socket.id}: connect`);

	socket.on('JOIN_ROOM', (room) => {
		console.log(`${socket.id}: JOIN_ROOM[${room}]`);
		socket.join(room);
		let db_room = room_list[room];
		if (db_room === undefined) {
			room_list[room] = [];
			/* Everyone should know there is a new room */
			io.emit('NEW_ROOM', room);
		}
	})

	socket.on('LEAVE_ROOM', (room) => {
		console.log(`${socket.id}: LEAVE_ROOM[${room}]`);
		socket.leave(room);
	})

	socket.on('SEND_MSG', (req) => {
		let msg = req.payload;
		msg.timestamp = Date.now()
		console.log(`${socket.id}: SEND_MSG[${JSON.stringify(msg)}]`);
		room_list[req.room].push(msg);
		/* Only those in the room need to know the new msg */
		io.to(req.room).emit('NEW_MSG', msg);
	})

	socket.on('disconnect', () => {
		console.log(`${socket.id}: disconnect`);
	})
})

http.listen(8888, () => {
	console.log('Server is up');
})
