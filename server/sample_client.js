const SocketIOClient = require('socket.io-client');
const fetch = require('node-fetch');

const id = 'topjohnwu';
const pwd = 'happy123';

let user_list;

// Login
fetch('http://localhost:8888/login', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({ id: id, pwd: pwd })
})
.then(res => res.json())
.then(json => {
	if (json.status) {

		// If login success, initialize a socket connection
		let socket = SocketIOClient('http://localhost:8888')

		// ACK immediately
		socket.on('connect', () => {
			console.log(`Connect with id[${socket.io.engine.id}]`)
			socket.emit("ACK", id);
		})

		// Monitor user list in idle screen
		socket.on('USER_UPDATE', (user) => {
			/* TIP for UI: if user id is not in user list, add to user list,
			 * else update the online status of user
			 */
			console.log(user)
		})


		fetch('http://localhost:8888/users')
			.then(res => res.json())
			.then(json => {
				user_list = json;
				// TODO: Populate UI with user_list
				console.log(user_list);
			})

		/***************************
		 * Example: Chat with test *
		 ***************************/

		// Assume user selected the user 'test' to start chat

		fetch('http://localhost:8888/chat', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id, with: 'test' })
		})
		.then(res => res.json())
		.then(json => {
			// TODO: Populate UI with msg list
			console.log(json.msgs)

			socket.on('NEW_MSG', (msg) => {
				// TODO: Add new msg to UI
				console.log(msg)
			})

			// Join the room
			socket.emit('JOIN_ROOM', json.room)

			/* This sends a msg to the current room
			 * use it after joining a room */
			socket.emit('SEND_MSG', {
				room: json.room,
				payload: {
					id: id,
					msg: 'Hello World!'
				}
			})

			// If the user leaves the chat screen, leave the room and unregister
			socket.emit('LEAVE_ROOM', json.room);
			socket.removeAllListeners("NEW_MSG");
		})
	}
})
