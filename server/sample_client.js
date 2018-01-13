const SocketIOClient = require('socket.io-client');
const fetch = require('node-fetch');

const id = 'topjohnwu';
const pwd = 'happy123';
const target = 'test';

// const id = 'test';
// const pwd = '123';
// const target = 'topjohnwu';

const gen_post_req = (body) => {
	return {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body)
	}
}

// Login
fetch('http://localhost:8888/login', gen_post_req({ id: id, pwd: pwd }))
.then(res => res.json())
.then(json => {
	if (json.status) {

		// If login success, initialize a socket connection
		let socket = SocketIOClient('http://localhost:8888')

		// ACK immediately
		socket.on('connect', () => {
			console.log(`CONNECT[${socket.io.engine.id}]`)
			socket.emit('ACK', id);
		})

		// Monitor user list in idle screen
		socket.on('USER_UPDATE', user => {
			/* TODO: if user id is not in user list, add to user list,
			 * else update the online status of user */
			if (user.id !== id)
				console.log('USER_UPDATE: ', user);
		})

		// When a new msgs is sent to user
		socket.on('NEW_MSG', (msg, readCallback) => {
			/* TODO: use a variable (e.g. react state) to toggle whether the user
			 * is in user list screen or chat screen. If in user list screen, show
			 * the msg as a notification; if in the chat screen, push the msg to UI
			 * and call the readCallback with ID to tell the server that you've read the msg */

			console.log('NEW_MSG: ', msg);

			/* The push below won't work as in this example we don't have the global reference to the msg_list
			 * This should be handled in react states, I placed this here for your reference as a reminder */

			// msg_list.push(msg);

			/* DO NOT call this callback if user is in user list screen since we should only receive a notification
			 * Here let's assume we are in chat screen, so we call the callback */
			readCallback(id);
		})


		fetch('http://localhost:8888/users')
		.then(res => res.json())
		.then(json => {
			// TODO: Populate UI with user_list in user list screen
			let user_list = json.filter(user => user.id !== id)
			console.log('GET_USERS: ', user_list);
		})

		/*****************************
		 * Example: Chat with target *
		 *****************************/

		/* Assume user selected the user target to start chat
		 * When user selects a user to open the chat screen, first request
		 * for a first batch of msgs by setting the request body idx to 0.
		 * You will get the event name to monitor read events from json.event */

		fetch('http://localhost:8888/msgs', gen_post_req({ id: id, dest: target, idx: 0 }))
		.then(res => res.json())
		.then(json => {
			// TODO: Populate UI with msg list in chat screen
			let msg_list = json.msgs;
			console.log('GET_MSGS[0]: ', msg_list);

			// Monitor read events
			socket.on(json.event, msg => {
				/* TODO: This event includes both the cases when your target read your msg, or me myself read the target's msg
				 * The response msg is a stripped down version of msg, it only contains 2 entries: timestamp and read
				 * Use the msg.timestamp as a unique ID to search through the list shown in the UI
				 * If exists (it might not, because we didn't fetch the whole history), update read timestamp with msg.read */

				let read_msg = msg_list.filter(m => m.timestamp === msg.timestamp)
				if (read_msg.length > 0) {
					read_msg = read_msg[0];
					read_msg.read = msg.read;
					console.log(`READ_${json.event}: `, read_msg);
				}
			})

			// Example: Show the next batch of requests if available
			if (json.idx > 0) {
				fetch('http://localhost:8888/msgs', gen_post_req({ id: id, dest: target, idx: json.idx }))
				.then(res => res.json())
				.then(new_json => {
					// TODO: Populate the next batch
					console.log(`GET_MSGS[${json.idx}]: `, new_json.msgs);
					new_json.msgs.push(msg_list);
					msg_list = new_json.msgs;
				})
			}

			// Example: Send a msg
			let new_msg = {
				dest: target,
				msg: 'Hello World!'
			};

			socket.emit('SEND_MSG', new_msg, server_msg => {
				/* Recieve callback from server
				 * TODO: Add the processed msg from server to the local msg_list
				 * If you have time, you can create a 2 stage UI like FB messenger:
				 * First add the new msg to the UI locally but show that it is not actually sent to the server yet
				 * Once the server received your msg it will trigger this callback, update the UI to indicate the change.
				 * This is similar to the little blue checkmark in FB MS */
				msg_list.push(server_msg);
			})

			// If the user leaves the chat screen, unregister the event
			socket.removeAllListeners(json.event);
		})
	}
})
