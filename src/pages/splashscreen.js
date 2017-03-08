import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  AppRegistry,
  Dimensions
} from 'react-native';
import Didacticiel from './didacticiel';
import Login from './login';
import {Button} from 'native-base';
import styles from '../styles/common-styles.js';

const window = Dimensions.get('window');
export default class splashscreen extends Component {
  constructor(props){
	super(props);
  }
  demarrer(){
	this.props.navigator.push({
		component: Login
	});
  }
  didacticiel(){
	this.props.navigator.push({
		component: Didacticiel
	});
  }
  render() {
	return (
	  <View>
		<Image style={styles.image_splash} source={{uri:'http://localhost:8081/img/splashscreen.png'}}>
			<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
				<Button
					onPress={this.demarrer.bind(this)}
					style={{width:200,height:50,marginLeft:(window.width/2)-100,marginTop:500,marginBottom:1,borderColor: 'white'}}
					bordered><Text style={{color: 'white'}}>DEMARRER</Text></Button>
				<Button
					onPress={this.didacticiel.bind(this)}
					style={{width:200,height:50,marginLeft:(window.width/2)-100,marginTop:0,marginBottom:15}}
					transparent><Text style={{color: 'white'}}>DIDACTICIEL</Text></Button>
			</View>
		</Image>
	  </View>
	);
  }
}
AppRegistry.registerComponent('splashscreen', () => splashscreen);