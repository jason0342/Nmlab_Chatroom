import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './client/component/screen/LoginScreen.component.js';
import MainScreen from './client/component/screen/MainScreen.component.js';
import RoomScreen from './client/component/screen/RoomScreen.component.js';

const ChatRoomNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  Main: { screen: MainScreen },
  Room: { screen: RoomScreen },
});

export default class ChatRoomApp extends Component {
  render() {
    return (
      <ChatRoomNavigator />
    );
  }
}
