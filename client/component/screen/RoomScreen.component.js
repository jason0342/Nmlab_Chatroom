import React, { Component } from 'react';
import { ScrollView, TextInput, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
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
    this.state = {
      msgList: [[true,'abc'],[false,'def'],[true,'ghi']],
      inputMsg: '',
      room: '',
      selfID: naviParams.selfID,
    }
    fetch(AppConstants.SERVER_URL+'/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: naviParams.selfID, with: naviParams.id })
    })
    .then((res) => res.json())
    .then((json) => {
      // TODO: Populate UI with user_list
      SocketConnector.sendEvent('JOIN_ROOM', json.room);
      this.setState({msgList: json.msgs})
      this.setState({room: json.room});
      // console.log(json);
    });
  }
  componentWillMount() {
    EventEmitter.on('NEW_MSG', (msg) => {
      this.appendMsg(msg);
    });
  }
  componentWillUnmount() {
    SocketConnector.sendEvent('LEAVE_ROOM', this.state.room);
    EventEmitter.removeAllListeners("NEW_MSG");
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
    SocketConnector.sendEvent('SEND_MSG', {
      room: this.state.room,
      payload: {
        id: this.state.selfID,
        msg: this.state.inputMsg,
      }
    });
    this.setState({inputMsg:''});
  }
  appendMsg(msg) {
    this.setState({msgList:[...this.state.msgList, msg]});
  }
}

module.exports = RoomScreen;