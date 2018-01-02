import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../style/main.style.js';
import EmptyDOM from './EmptyDOM.component.js';

class ChatGrid extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        {this.props.isSelf ? 
        <View style={[styles.chatTextViewSelf]}>
          <Text style={[styles.chatTextSelf]}>{this.props.text}</Text>
        </View> :
        <View style={[styles.chatTextView]}>
          <Text style={[styles.chatText]}>{this.props.text}</Text>
        </View>
        }
      </View>
    );
  }
}

module.exports = ChatGrid;