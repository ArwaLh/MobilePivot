import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';

export default class headerOther extends Component {

  render(){
    return (
      <View style={styles.header}>
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
	backgroundColor: '#3e3a6c',
    flex: 1
  },
  header_item: {
    paddingLeft: 10,
    paddingRight: 10
  },
  header_text: {
    color: '#000',
    fontSize: 18
  }
});

AppRegistry.registerComponent('headerOther', () => headerOther);