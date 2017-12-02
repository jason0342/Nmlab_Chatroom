/***********************
 * Client side actions *
 **********************/

 // Client side should "emit" these events

'ACK'
'JOIN_ROOM'
'LEAVE_ROOM'
'SEND_MSG'

/*************************
 * Client side callbacks *
 *************************/

 // Client side should listen to these events

'USER_UPDATE'
'NEW_MSG'

/**********
 * Logins *
 **********/

let login_url = '<server_ip>:8888/login'

// request body
let login_req = {
	id: 'string',
	pwd: 'string'
}

// response body
let login_res = {
	status: 'boolean'
}

/* After login, connect a socket, and ack the server with your user name! */

/************
 * GET URLs *
 ************/

/* After login, we should request for a list of user.
 * When we are in the idle screen, all asynchonous user changes
 * will be handled by sockets via USER_UPDATE event */

// Use this URL with GET, return a list of user_res.
let list_user_url = '<server_ip>:8888/users'

// This will be sent via USER_UPDATE event and list_user_url
let user_res = {
	id: 'string'
	online: 'boolean'
}

/************
 * Messages *
 ************/

/* After selecting a user, we should request for chat.
 * When we are in the room, all asynchronous new msgs will
 * then be handled by sockets via NEW_MSG event */

// Use this URL with POST, request body and response are defined below
let chat_url = '<server_ip>:8888/chat'

let chat_req = {
	id: 'string',    /* who are you */
	with: 'string'   /* who are you chatting with */
}

let chat_res = {
	room: 'string',      /* The sever will give you a room id, use this in sending msgs */
	msgs: [ 'msg_res' ]  /* A list of previous msgs */
}


/* Request body of SEND_MSG
 * This is what should be sent to server with SEND_MSG
 * the payload is a msg object */

let msg_req = {
	room: 'string',  /* The room id you get from POST response of chat_url (chat_res.room) */
	payload: {
		id: 'string',
		msg: 'string'
	}
}

/* Response body of NEW_MSG
 * This is what will be sent to client of NEW_MSG event
 * A list of msg_res will also be sent as POST response body via chat_url */

let msg_res = {
	id: 'string',
	msg: 'string',
	timestamp: 'integer'  /* A timestamp is added in the server side */
}

/******************
 * Data Structure *
 *****************/

/* Each room consist of a list of msgs
 * Each msg is stored in the format of msg_res */
