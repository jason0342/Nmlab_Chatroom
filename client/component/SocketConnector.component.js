import React from 'react'
import SocketIOClient from 'socket.io-client';
import EventEmitter from "react-native-eventemitter";
import AppConstants from '../constant/AppConstants.js'


class SocketConnector {
  constructor() {
    this.socket.null;
  }

  static startConnection(userID) {
    this.socket = SocketIOClient(AppConstants.SERVER_URL);
    this.socket.on('connect', (() => {
      this.connected = true;
      this.socket.emit("ACK", userID);
    }).bind(this));

    this.socket.on('USER_UPDATE', (user) => {
      // console.log(user)
      EventEmitter.emit('USER_UPDATE', user);
      // do something...
    });

    this.socket.on('NEW_MSG', (msg, readCallback) => {
      // TODO: Add new msg to UI
      console.log(msg)
      EventEmitter.emit('NEW_MSG_MAIN', msg, readCallback);
      EventEmitter.emit('NEW_MSG_ROOM', msg, readCallback);
    })
  }

  static stopConnection() {
    if(this.socket != null) {
      this.socket.disconnect();
    }
  }

  static giveUserID(userID) {
    this.sendEvent('GIVE_USER_ID', { userID });
  }

  static sendEvent(eventType, param) {
    this.socket.emit(eventType, param);
  }

  static addEventListener(event, callback) {
    this.socket.on(event, callback);
  }
 
  static removeEventListener(event) {
    this.socket.removeAllListeners(event);
  }
}

module.exports = SocketConnector;
