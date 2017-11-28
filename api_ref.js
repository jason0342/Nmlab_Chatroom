/***********************
 * Client side actions *
 **********************/

 // Client side should "emit" these events

'JOIN_ROOM'
'LEAVE_ROOM'
'SEND_MSG'

/*************************
 * Client side callbacks *
 *************************/

 // Client side should listen to these events

'NEW_ROOM'
'NEW_MSG'

/**********
 * Logins *
 **********/

let login_url = '<server_ip>:8888/login'

// request body
let login_req = {
	user: 'string',
	pwd: 'string'
}

// response body
let login_res = {
	status: 'boolean'
}

/************
 * GET URLs *
 ************/

/* After login, we should request for a list of room.
 * When we are in the idle screen, all asynchonous room
 * additions will then be handled by sockets via NEW_ROOM event */

let list_room_url = '<server_ip>:8888/list/room'

/* After entering a room, we should request for a list of msgs.
 * When we are in the room, all asynchronous new msgs will
 * then be handled by sockets via NEW_MSG event */

let list_msg_url = '<server_ip>:8888/list/msg/<room>'

/************
 * Messages *
 ************/
let msg = {
	user: 'string',
	msg: 'string'
}

/* Request body of SEND_MSG
 * This is what should be sent to server with SEND_MSG
 * the payload is a msg object as defined above */

let msg_req = {
	room: 'string',
	payload: 'msg'
}

/* Response body of NEW_MSG
 * This is what will be sent to client of NEW_MSG event
 * A list of msg_res will be sent as GET response body via list_msg_url */

let msg_res = {
	user: 'string',
	msg: 'string',
	timestamp: 'integer'  /* A timestamp is added in the server side */
}

/******************
 * Data Structure *
 *****************/

/* Each room consist of a list of msgs
 * Each msg is stored in the format of msg_res */
