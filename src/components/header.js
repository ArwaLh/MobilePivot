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

export default class header extends Component {

  render(){
    return (
      <View style={styles.header}>
	  	<Image
            source={require('./img/ic_launcher.png')}
        />
        <View style={styles.header_item}>
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
    marginBottom: 20,
    flex: 1,
	backgroundColor: '#529ecc',
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
    marginTop: 10,
	marginLeft: 10
  }
});

AppRegistry.registerComponent('header', () => header);