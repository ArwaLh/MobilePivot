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
			<Image style={{width:37,height:37,flex:1,margin:0,padding:0}} source={{uri: 'katomi_interne'}}></Image>
        </View>
		<View style={styles.header_item_text}>
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
    flex: 1,
	height:60,
	backgroundColor: '#322a7d',
  },
  header_item: {
	position: 'relative',
	marginRight: 20,
	height:37,
	width:37
  },
  header_item_text: {
	position: 'relative',
	paddingBottom: 3,
	marginRight: 40
  },
  header_text: {
	color:'white',
	fontSize: 18,
	fontWeight: 'bold',
	color:'white',
	fontFamily: 'Roboto',
	marginRight: 60
  }
});

AppRegistry.registerComponent('header', () => header);