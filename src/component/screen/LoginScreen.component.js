import React, { Component } from 'react';
import EventEmitter from "react-native-eventemitter";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import SocketConnector from "src/component.SocketConnector.component.js"
import styles from 'src/style/main.style.js';
import EmptyDOM from 'src/component/EmptyDOM.component.js';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName:'',
      password:'',
    }
    this.onLogin = this.onLogin.bind(this);
  }
  static navigationOptions = {
    header: null ,
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header, styles.alignCenter]}>
          <Text style={[styles.headerText]}>Chat Room</Text>
        </View>
        <View style={[styles.main, styles.alignCenter]}>
          <TextInput style={[styles.accountTextInput]}
            placeholder="UserName"
            underlineColorAndroid='transparent'
            onChangeText={(userName)=>{this.setState({userName});}}
            value={this.state.userName}
          />
          <TextInput style={[styles.accountTextInput]}
            placeholder="Password"
            underlineColorAndroid='transparent'
            onChangeText={(password)=>{this.setState({password});}}
            value={this.state.password}
          />
        </View>
        <View style={[styles.footer, styles.alignCenter]}>
          <EmptyDOM />
          <TouchableOpacity
            style={[styles.loginButton, styles.alignCenter]}
            onPress={this.onLogin}>
            <Text style={[styles.loginButtonText]}>Login</Text>
          </TouchableOpacity>
          <EmptyDOM />
        </View>
       </View>
    );
  }
  onLogin() {
    this.props.navigation.navigate('Main');
    // fetch('url', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({userName: this.state.userName, password: this.state.password})
    // })
    // .then((response) => response.json())
    // .then((responseJson) => {
    //   if(responseJson) {
    //     this.props.navigation.navigate('Main');
    //   }
    //   else {
    //     Alert.alert('Incorrect password!', '')
    //   }
    // })
    
  }
}

module.exports = LoginScreen;