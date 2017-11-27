import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import styles from 'src/style/main.style.js';

class Grid extends Component {
	constructor(props) {
    super(props);
    this.renderGridImage = this.renderGridImage.bind(this);
  }
  render() {
    return (
      <View style={[styles.grid]}>
        <TouchableOpacity
          style={[styles.roomGridButton]}
          onPress={this.props.enterRoom}>
          <View style={[styles.roomGridPictureView]}>
            <View style={[styles.roomGridPicture]}/>
          </View>
          <View style={[styles.roomGridTextView]}>
            <View style={[styles.roomGridText]}/>
          </View>
          {this.renderGridImage()}
        </TouchableOpacity>
      </View>
    );
  }
  renderGridImage() {
  }
}

module.exports = Grid;