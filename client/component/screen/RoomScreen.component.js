import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import EventEmitter from "react-native-eventemitter";
import SocketConnector from "../SocketConnector.component.js"
import styles from '../../style/main.style.js';
import EmptyDOM from '../EmptyDOM.component.js';
import Grid from '../Grid.component.js';
import AppConstants from '../../constant/AppConstants.js'

class RoomScreen extends Component {
  constructor(props) {
    super(props);
    const naviParams = this.props.navigation.state.params;
    this.leaveRoom = this.leaveRoom.bind(this);
    this.state = {
      // roomList: [[true,'abc','def'], [false,'123','456']],
      roomList: []
    }
    fetch(AppConstants.SERVER_URL+'/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: naviParams.userID, with: naviParams.id })
    })
    .then((res) => res.json())
    .then((json) => {
      // TODO: Populate UI with user_list
      console.log(json.msgs)
    });
  }
  componentWillMount() {
    EventEmitter.on('NEW_MSG', (msg) => {})
    // console.log('b', this.roomList);
  }
  static navigationOptions = {
    header: null ,
  };
  render() {
    const naviParams = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={[styles.header, styles.alignCenter]}>
          <Text style={[styles.headerText]}>naviParams.id</Text>
        </View>
        <View style={[styles.main]}>
          {this.renderChat()}
        </View>
        <View style={[styles.footer, styles.alignCenter]}>
          <EmptyDOM />
          <TouchableOpacity
            style={[styles.loginButton, styles.alignCenter]}
            onPress={this.leaveRoom}>
            <Text style={[styles.loginButtonText]}>Logout</Text>
          </TouchableOpacity>
          <EmptyDOM />
        </View>
      </View>
    );
  }
  leaveRoom() {
    this.props.navigation.goBack(null);
  }
  renderChat() {
    
  }
}

module.exports = RoomScreen;