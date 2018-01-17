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
        {this.props.showTime?
        <View style={[styles.alignCenter]}> 
          <Text style={[styles.sendTimeText]}>{this.getTime(this.props.sendTime)}</Text>
        </View>
        :<View/>
        }
        {this.props.isSelf? 
        <View style={[styles.chatTextViewSelf]}>
          {this.props.read?
          <View style={[styles.readCircleView]}>
            <View style={[styles.readCircle, styles.alignCenter]}>
              <Text style={[styles.readText]}>R</Text>
            </View>
          </View>:<View/>
          }
          <Text style={[styles.chatTextSelf]}>{this.props.text}</Text>
        </View> :
        <View style={[styles.chatTextView]}>
          <Text style={[styles.chatText]}>{this.props.text}</Text>
        </View>
        }
        {this.props.showTime?
        <View style={{alignItems:(this.props.isSelf?'flex-end':'flex-start')}}> 
          <Text style={[styles.sendTimeText]}>
            {this.getTime(this.props.readTime)==''?' Unseen ':' Seen'+this.getTime(this.props.readTime)}
          </Text>
        </View>
        :<View/>
        }
      </View>
    );
  }
  getTime(ts) {
    if(ts<0) return '';
    let time = new Date(ts);
    let month = String(time.getMonth() + 1);
    let day = String(time.getDate());
    let hour = String(time.getHours());
    let minute = String(time.getMinutes());
    if(time.getMinutes()<10) minute = '0' + minute;
    return ' '+month+'/'+day+' '+hour+':'+minute+' ';
  }
}

module.exports = ChatGrid;