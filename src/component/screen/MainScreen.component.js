import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import EventEmitter from "react-native-eventemitter";
import SocketConnector from "src/component.SocketConnector.component.js"
import styles from 'src/style/main.style.js';
import EmptyDOM from 'src/component/EmptyDOM.component.js';
import Grid from 'src/component/Grid.component.js';

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      roomList: [('abc','def'), ('123','456')],
    }
  }
  static navigationOptions = {
    header: null ,
  };
  render() {
    const naviParams = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <View style={[styles.header, styles.alignCenter]}>
          <Text style={[styles.headerText]}>Chat Room</Text>
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
    this.props.navigation.goBack(null);
  }
  renderRoomList() {
    return this.state.roomList.map((value, index) => {
      return <Grid
        key={index}
        value={value}
        onGridPress={() => {this.enterRoom(index)}} 
      />;
    });
  }
  enterRoom(index) {

  }
}

module.exports = MainScreen;