import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from '../style/main.style.js';

class Grid extends Component {
	constructor(props) {
    super(props);
    this.renderGridImage = this.renderGridImage.bind(this);
    this.gridButtonStyle = this.gridButtonStyle.bind(this);
  }
  render() {
    return (
      <View style={[styles.grid]}>
        <TouchableOpacity
          style={[styles.roomGridButton, 
            (this.props.value.online?{backgroundColor: 'lightgreen'}:{backgroundColor: 'steelblue'})]}
          onPress={this.props.onGridPress}>
          <View style={[styles.roomGridPictureView]}>
            <View style={[styles.roomGridPictureBox]}/>
          </View>
          <View style={[styles.roomGridTextView]}>
            <View style={[styles.roomGridTextBox]}>
              <Text style={[styles.loginButtonText]}>{this.props.value.id}</Text>
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
}

module.exports = Grid;
