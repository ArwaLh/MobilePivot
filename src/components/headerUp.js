import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View
} from 'react-native';
import { Container, Content, Icon } from 'native-base';

export default class headerUp extends Component {

  render(){
    return (
      <View style={styles.header}>
	  	 <Icon name="ios-arrow-back" style={{color: '#F0FFFF', fontSize: 20}}/>
        <View style={styles.header_item}>
			<Text style={styles.header_text}>{this.props.text}</Text>
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
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
  //  marginTop: 5,
	marginLeft: 10
  }
});

AppRegistry.registerComponent('headerUp', () => headerUp);