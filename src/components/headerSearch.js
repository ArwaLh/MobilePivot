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
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class headerSearch extends Component {
  render(){
    return (
       <View style={styles.header}>
		<Button transparent onPress={this.props.onpress}>
	  	 <Image style={{width:20,height:20,flex:1}} source={require('./img/arrow-left.png')}></Image>
		</Button>
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
	backgroundColor: '#322a7d',
  },
  header_item: {
	position: 'relative',
	paddingBottom: 3,
	marginRight: 40
  },
  header_text: {
    color: '#FFFFFF',
	fontSize: 18,
	fontWeight: 'bold',
	fontFamily: 'Roboto',
	marginRight: 50,
	marginTop: 7

  }
});

AppRegistry.registerComponent('headerSearch', () => headerSearch);