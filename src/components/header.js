import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class header extends Component {

  render(){
    return (
      <View style={styles.header}>
        <View style={styles.header_item}>
			<Image source={{uri:'http://localhost:8081/img/logo_katomi.png'}}></Image>
			<Text style={styles.header_text}>{this.props.text}</Text>
        </View>
        <View style={styles.header_item}>
        {  !this.props.loaded &&
            <GiftedSpinner />
        }
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
	height: 150,
    flex: 1,
	backgroundColor: "#53507c",
  },
  header_item: {
    paddingLeft: 25,
    paddingRight: 10,
	position: 'relative',
  },
  header_text: {
    color: '#FFFFFF',
	fontSize: 45,
    margin: 30,
	textAlign: 'center'
  },
  image: {
    width:150,
    height:50,
    flex: 1
  },
});

AppRegistry.registerComponent('header', () => header);