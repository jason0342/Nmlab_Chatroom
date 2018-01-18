import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import EventEmitter from "react-native-eventemitter";
import SocketConnector from "../SocketConnector.component.js"
import styles from '../../style/main.style.js';
import EmptyDOM from '../EmptyDOM.component.js';
import Grid from '../Grid.component.js';
import AppConstants from '../../constant/AppConstants.js'

console.disableYellowBox = true;

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.enterRoom = this.enterRoom.bind(this);
    this.updateRoomList = this.updateRoomList.bind(this);
    this.refetchRoomList = this.refetchRoomList.bind(this);
    this.updateLatestFromRoom = this.updateLatestFromRoom.bind(this);
    this.state = {
      // roomList: [[true,'abc','def'], [false,'123','456']],
      roomList: [],
      userName: this.props.navigation.state.params.userName,
    }
    fetch(AppConstants.SERVER_URL+'/users?id='+this.state.userName)
    .then((res) => res.json())
    .then((json) => {
      user_list = json.filter(user => user.id !== this.state.userName);
      this.setState({roomList: user_list});
      // console.log(user_list);
    });
  }
  componentWillMount() {
    EventEmitter.on('USER_UPDATE', (user) => {
      // console.log(user);
      this.updateRoomList(user);
    });
    EventEmitter.on('NEW_MSG_MAIN', (msg, readCallback) => {
      // console.log('NEW_MSG in main');
      let i = this.state.roomList.findIndex((value) => {
        return (value.id == msg.id);
      });
      this.state.roomList[i].latest = msg;
      this.setState({roomList:this.state.roomList});
    });
  }
  componentWillUnmount() {
    EventEmitter.removeAllListeners("USER_UPDATE");
    EventEmitter.removeAllListeners("NEW_MSG");
  }
  static navigationOptions = {
    header: null ,
  };
  render() {
    const naviParams = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={[styles.header, styles.alignCenter]}>
          <Text style={[styles.headerText]}>{this.state.userName}</Text>
        </View>
        <View style={[styles.main]}>
          {this.renderRoomList()}
        </View>
        <View style={[styles.footer, styles.alignCenter]}>
          <EmptyDOM />
          <TouchableOpacity
            style={[styles.loginButton, styles.alignCenter]}
            onPress={this.logout}>
            <Text style={[styles.loginButtonText]}>Logout</Text>
          </TouchableOpacity>
          <EmptyDOM />
        </View>
      </View>
    );
  }
  logout() {
    SocketConnector.stopConnection();
    this.props.navigation.goBack(null);
  }
  renderRoomList() {
    return this.state.roomList.map((value, index) => {
      if(value.id == this.state.userName) return;
      return <Grid
        key={value.id}
        value={value}
        onGridPress={() => {this.enterRoom(value.id)}}
      />;
    });
  }
  enterRoom(id) {
    this.props.navigation.navigate('Room', {
      selfID: this.state.userName,
      id: id,
      callback: ((latest) => {this.updateLatestFromRoom(id, latest)}),
    });
  }
  updateRoomList(user) {
    let i = this.state.roomList.findIndex((value) => {
      return value.id == user.id;
    });
    if(i == -1) this.setState({roomList: [...this.state.roomList, user]});
    else {
      let roomList = this.state.roomList;
      roomList[i].online = user.online;
      this.setState({roomList});
    }
  }
  refetchRoomList() {
    fetch(AppConstants.SERVER_URL+'/users?id='+this.state.userName)
    .then((res) => res.json())
    .then((json) => {
      user_list = json.filter(user => user.id !== this.state.userName);
      this.setState({roomList: user_list});
      // console.log(user_list);
    });
  }
  updateLatestFromRoom(id, latest) {
    let i = this.state.roomList.findIndex((value) => {
      return value.id == id;
    });
    this.state.roomList[i].latest = latest;
    this.setState({roomList:this.state.roomList});
  }
}

module.exports = MainScreen;
