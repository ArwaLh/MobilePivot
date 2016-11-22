import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  BackAndroid,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class headerUp extends Component {
  render(){
    return (
      <View style={styles.header}>
	  	 <Icon name="arrow-left" size={40} style={{color: '#fff', fontSize: 25, width:40}}/>
        <View style={styles.header_item}>
			<Text style={styles.header_text}>{this.props.text}</Text>
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
    marginBottom: 20,
    flex: 1,
	height:80,
	backgroundColor: '#53507c',
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10,
	position: 'relative',
	paddingBottom: 3
  },
  header_text: {
    color: '#FFFFFF',
	fontSize: 25,
	fontWeight: 'bold',
	marginLeft: 5
  }
});

AppRegistry.registerComponent('headerUp', () => headerUp);