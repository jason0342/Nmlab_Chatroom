import React, { Component } from 'react';
import { RefreshControl, ScrollView, TextInput, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import EventEmitter from "react-native-eventemitter";
import SocketConnector from "../SocketConnector.component.js"
import styles from '../../style/main.style.js';
import EmptyDOM from '../EmptyDOM.component.js';
import Grid from '../Grid.component.js';
import ChatGrid from '../ChatGrid.component.js';
import AppConstants from '../../constant/AppConstants.js'

class RoomScreen extends Component {
  constructor(props) {
    super(props);
    const naviParams = this.props.navigation.state.params;
    this.leaveRoom = this.leaveRoom.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.appendMsg = this.appendMsg.bind(this);
    this.loadNextBatch = this.loadNextBatch.bind(this);
    this.checkReadMsg = this.checkReadMsg.bind(this);
    this.state = {
      msgList: [[true,'abc'],[false,'def'],[true,'ghi']],
      inputMsg: '',
      room: '',
      selfID: naviParams.selfID,
      targetID: naviParams.id,
      batchIdx: 0,
      refreshing: false,
    }
    fetch(AppConstants.SERVER_URL+'/msgs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: naviParams.selfID, dest: naviParams.id, idx: 0 })
    })
    .then((res) => res.json())
    .then((json) => {
      // TODO: Populate UI with user_list
      SocketConnector.sendEvent('JOIN_ROOM', json.room);
      SocketConnector.addEventListener(json.event, (msg) => {
        EventEmitter.emit('READ', msg);
      });
      this.setState({msgList: json.msgs});
      this.setState({batchIdx: json.next});
      // this.setState({room: json.room});
      // console.log(json);
    });
  }
  componentWillMount() {
    EventEmitter.on('NEW_MSG', (msg, readCallback) => {
      this.appendMsg(msg);
      readCallback(selfID);
    });
    EventEmitter.on('READ', (msg) => {
      this.checkReadMsg(msg);
    });
  }
  componentWillUnmount() {
    // SocketConnector.sendEvent('LEAVE_ROOM', this.state.room);
    SocketConnector.removeEventListener("READ");
    EventEmitter.removeAllListeners("NEW_MSG");
    EventEmitter.removeAllListeners("READ");
  }
  static navigationOptions = {
    header: null ,
  };
  render() {
    const naviParams = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.header, styles.alignCenter]}
          onPress={this.leaveRoom}>
          <Text style={[styles.headerText]}>{naviParams.id}</Text>
        </TouchableOpacity>
        <View style={[styles.main]}>
          <ScrollView
            ref={ref => this.scrollView = ref}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.loadNextBatch}
              />
            }
            onContentSizeChange={(w, h) => {this.scrollView.scrollToEnd({animated: true});}}
            >
            {this.renderChat()}
          </ScrollView>
        </View>
        <View style={[styles.footer, {flexDirection:'column'}]}>
          <View style={[styles.chatFooter]}>
            <View style={[styles.chatTextInputView]}>
              <TextInput style={[styles.chatTextInput]}
                placeholder="Input text ..."
                underlineColorAndroid='transparent'
                onChangeText={(msg)=>{this.setState({inputMsg: msg});}}
                value={this.state.inputMsg}
              />
            </View>
            <View style={[styles.sendChatTextButtonView]}>
              <TouchableOpacity
                style={[styles.sendChatTextButton, styles.alignCenter]}
                onPress={this.sendMsg}>
                <Text style={[styles.sendButtonText]}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
          <EmptyDOM />
        </View>
      </View>
    );
  }
  leaveRoom() {
    this.props.navigation.goBack(null);
  }
  renderChat() {
    return this.state.msgList.map((value, index) => {
      return <ChatGrid
        key={index}
        isSelf={value.id==this.state.selfID}
        text={value.msg}
      />;
    });
  }
  sendMsg() {
    // console.log(this.state);
    let newMsg = {
      dest: this.state.targetID,
      msg: this.state.inputMsg,
    };
    SocketConnector.socket.emit('SEND_MSG', newMsg, server_msg => {
      this.appendMsg(server_msg);
    });
    this.setState({inputMsg:''});
  }
  appendMsg(msg) {
    this.setState({msgList:[...this.state.msgList, msg]});
  }
  loadNextBatch() {
    if (this.state.batchIdx > 0) {
      this.setState({refreshing: true});
      fetch(AppConstants.SERVER_URL+'/msgs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: this.state.selfID, dest: this.state.targetID, idx: this.state.batchIdx })
      })
      .then(res => res.json())
      .then(new_json => {
        // TODO: Populate the next batch
        // console.log(`GET_MSGS[${json.idx}]: `, new_json.msgs);
        this.setState({msgList:[...new_json.msgs, ...this.state.msgList]});
        this.setState({batchIdx: new_json.next});
        this.setState({refreshing: false});
      })
    }
  }
  checkReadMsg(msg) {
    if (typeof this.state.msgList === "undefined") return;
    let read_msg = this.state.msgList.filter(m => m.timestamp === msg.timestamp);
    if (read_msg.length > 0) {
      read_msg = read_msg[0];
      read_msg.read = msg.read;
      // console.log(`READ_${json.event}: `, read_msg);
    }
  }
}

module.exports = RoomScreen;