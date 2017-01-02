/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import SplashScreen from './src/pages/splashscreen';
import Login from './src/pages/login';
import firebase from 'firebase';
// Initialize Firebase
const config = {
    apiKey: "AIzaSyC7F3pn_tG3LJk-4pPocpvMRyh8SEW-1sQ",
    authDomain: "katomi-148921.firebaseapp.com",
    databaseURL: "https://katomi-148921.firebaseio.com",
    storageBucket: "katomi-148921.appspot.com",
    messagingSenderId: "229375856602"
  };
firebase.initializeApp(config);
import styles from './src/styles/common-styles.js';
export default class FacebookApp extends Component {
	constructor(props){
		super(props);
		AsyncStorage.removeItem('Phototype_value');
		AsyncStorage.removeItem('patient_medecin');
		AsyncStorage.removeItem('medecin_username');
		this.state = {
		  component: null,
		  loaded: false
		};
	}
	render() {
		return (
		  <Navigator
			  initialRoute={{component: SplashScreen}}
			  configureScene={(route) => {
				return {
					...Navigator.SceneConfigs.HorizontalSwipeJump,
					gestures: {}
				};
			  }}
			  renderScene={(route, navigator) => {
				if(route.component){
				  return React.createElement(route.component, { navigator });
				}
			  }}
			/>
		);
	}
}

AppRegistry.registerComponent('FacebookApp', () => FacebookApp);
