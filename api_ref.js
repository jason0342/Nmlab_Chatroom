/***********************
 * Client side actions *
 **********************/

// Client side should "emit" these events

'ACK'
'SEND_MSG'

/*************************
 * Client side callbacks *
 *************************/

// Client side should listen to these events

'USER_UPDATE'
'NEW_MSG'
'<event>'  /* The read notify event name is passed to client from server */

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
let login_res = { status: 'boolean' }

/* After login, connect a socket, and ack the server with your user name! */

/************
 * GET URLs *
 ************/

/* After login, we should request for a list of user.
 * When we are in the idle screen, all asynchonous user changes
 * will be handled by sockets via USER_UPDATE event */

// Use this URL with GET, return a list of user_res.
let list_user_url = '<server_ip>:8888/users'

// The response from using list_user_url
let user_list = [ 'user_res' ]

// This will be sent via USER_UPDATE event and list_user_url
let user_res = {
	id: 'string',
	online: 'boolean'
}

/************
 * Messages *
 ************/

/* After selecting a user, we should request for chat.
 * When we are in the room, all asynchronous new msgs will
 * then be handled by sockets via NEW_MSG event */

// Use this URL with POST, request body and response are defined below
let msgs_url = '<server_ip>:8888/msgs'

// The body for msgs_url
let msgs_req = {
	id: 'string',    /* who are you */
	dest: 'string',  /* who are you chatting with */
	idx: 'integer',  /* the index got from previous response. Set to 0 for the first request */
}

// The response of using msgs_url
let msgs_res = {
	msgs: [ 'msg_res' ],  /* A list of msgs */
	event: 'string',      /* The event to listen for read events */
	next: 'integer',      /* the index for the next request, 0 if no more is available */
}


/* Request body of SEND_MSG
 * This is what should be sent to server with SEND_MSG
 * the payload is a msg object */

let send_req = {
	dest: 'string',  /* yout target's id */
	msg: 'string',   /* the msg */
}

/* Response body of NEW_MSG
 * This is what will be sent to client of NEW_MSG event
 * A list of msg_res will also be sent as POST response body via chat_url */

let msg_res = {
	timestamp: 'integer',  /* A timestamp is added in the server side, use this as an unique ID for the msg */
	id: 'string',
	dest: 'string'
	msg: 'string',
	read: 'integer',       /* the time when dest read the msg, -1 if not read yet */
}
