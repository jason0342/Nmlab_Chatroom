import React from 'react'
import SocketIOClient from 'socket.io-client';
import AppConstants from 'src/constant/AppConstants.js'

class SocketConnector {
  constructor() {
    this.socket.null;
  }

  static startConnection() {
    this.socket = SocketIOClient(AppConstants.SERVER_URL);
    this.socket.on('connet', (() => {
      this.connected = true;
    }).bind(this));

    this.socket.on('some server event', () => {
      // do something...
    });
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
    this.socket.emit(eventType, param)
  }
}

module.exports = SocketConnector;