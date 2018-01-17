import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../style/main.style.js';

class Grid extends Component {
	constructor(props) {
    super(props);
    this.renderGridImage = this.renderGridImage.bind(this);
    this.gridButtonStyle = this.gridButtonStyle.bind(this);
    this.renderRead = this.renderRead.bind(this);
    this.renderColor = this.renderColor.bind(this);
    this.renderMsg = this.renderMsg.bind(this);
    this.hasNewMsg = this.hasNewMsg.bind(this);
  }
  render() {
    return (
      <View style={[styles.grid]}>
        <TouchableOpacity
          style={[styles.roomGridButton, 
            this.renderColor()]}
          onPress={this.props.onGridPress}>
          <View style={[styles.roomGridPictureView]}>
            <View style={[styles.roomGridPictureBox]}>
              <Text style={[styles.loginButtonText]}>{this.props.value.id}</Text>
            </View>
          </View>
          <View style={[styles.roomGridTextView]}>
            <View style={[styles.roomGridTextBox]}>
              {(typeof this.props.value.latest !== "undefined")?
              <Text style={[styles.loginButtonText]}
                numberOfLines={3}>
                {this.renderMsg()}
              </Text>
              :<View/>
              }
              {this.renderRead()}
            </View>
          </View>
          {this.renderGridImage()}
        </TouchableOpacity>
      </View>
    );
  }
  gridButtonStyle() {
    style = [styles.roomGridButton]
    if(this.props.value[0]) style.push({backgroundColor: 'lightgreen'});
    else style.push({backgroundColor: 'steelblue'});
    return style
  }
  renderGridImage() {
  }
  renderRead() {
    if (typeof this.props.value.latest === "undefined") return <View/>;
    if (this.hasNewMsg()) {
      return <View style={[styles.readCircleView]}>
          <Text style={[styles.newMsgText]}>New Message!</Text>
        </View>
    }
    if (this.props.value.latest.timestamp > this.props.value.latest.read) return <View/>;
    if (this.props.value.latest.id == this.props.value.id) return <View/>;
    return <View style={[styles.readCircleView]}>
        <View style={[styles.readCircle, styles.alignCenter]}>
          <Text style={[styles.readText]}>R</Text>
        </View>
      </View>;
  }
  renderMsg() {
    let msg = this.props.value.latest.msg;
    return ((this.props.value.latest.id==this.props.value.id)?this.props.value.latest.id:'You')+':\n\t'+msg;
  }
  renderColor() {
    if(this.hasNewMsg()) return {backgroundColor: 'red'};
    if(!this.props.value.online) return {backgroundColor: 'steelblue'};
    return {backgroundColor: 'lightgreen'};
    
  }
  hasNewMsg() {
    if (typeof this.props.value.latest !== "undefined") {
      if (this.props.value.latest.id == this.props.value.id) {
        if (this.props.value.latest.timestamp > this.props.value.latest.read)
          return true;
      }
    }
    return false;
  }
}

module.exports = Grid;
