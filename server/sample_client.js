const SocketIOClient = require('socket.io-client')
const user = 'topjohnwu'
const room = 'test_room'

let socket = SocketIOClient('http://localhost:8888')

/**********************
 * Register callbacks *
 **********************/

socket.on('connect', () => {
	console.log(`Connect with id[${socket.io.engine.id}]`)
})

/* This is a callback when the room has a new msg */
socket.on('NEW_MSG', (msg) => {
	console.log(msg)
})

/* This is a callback when a new room is added */
socket.on('NEW_ROOM', (room) => {
	console.log(room)
})

socket.on('disconnect', () => {})

/********************
 * Actions examples *
 ********************/

// Join a room
socket.emit('JOIN_ROOM', room)

/* This sends a msg to the current room
 * use it after joining a room */
socket.emit('SEND_MSG', {
	room: room,
	payload: {
		user: user,
		msg: 'Hello World!'
	}
})

// Leave the room
socket.emit('LEAVE_ROOM', room);
