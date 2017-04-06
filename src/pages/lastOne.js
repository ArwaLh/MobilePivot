/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Dimensions,
  Text,
  Image,
  Linking,
  View
} from 'react-native';
import Header from '../components/header';
import styles from '../styles/common-styles.js';

export default class lastOne extends Component {
	constructor(props){
    super(props);
	}	     
  render() {
    return (
	<View>
		<Header text="Katomi SKIN" loaded={true}/>
		<Image style={styles.image_last_one} source={{uri:'http://localhost:8081/img/last.png'}}/>
		<Text style={styles.text_last_one}> Rendez-vous sur notre site {"\n"}web Katomi </Text>			
		<Text style={styles.text_last_one_link}
			onPress={() => Linking.openURL('https://osereso.tn/')}>
		  ACCEDER AU SITE KATOMI 
		</Text>
			
		<Text style={styles.text_last_one_link2}
			onPress={() => Linking.openURL('https://chiraz54.typeform.com/to/ZQXS3G')}>
		 Votre avis nous intéresse  
		</Text>
     </View>
    );
  }
}

AppRegistry.registerComponent('lastOne', () => lastOne);
