import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  AppRegistry,
  TouchableOpacity,
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
		this.state = {
		  loaded: true
		}
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
			<Image style={styles.image_splash} source={{uri:'http://localhost:8081/img/splash_katomi.png'}}>
				<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
					<TouchableOpacity
						onPress={this.demarrer.bind(this)}
						style={{width:200,height:50,marginLeft:115,marginTop:500,marginBottom:10}}
						bordered><Text style={{color: 'transparent'}}>DÉMARRER</Text></TouchableOpacity>
					<TouchableOpacity
						onPress={this.didacticiel.bind(this)}
						style={{width:200,height:50,marginLeft:115,marginTop:0,marginBottom:15}}
						bordered><Text style={{color: 'transparent'}}>DIDACTICIEL</Text></TouchableOpacity>
				</View>
			</Image>
		</View>
		);
	}
}
AppRegistry.registerComponent('splashscreen', () => splashscreen);