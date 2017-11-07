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
  BackAndroid,
  Navigator,
  AsyncStorage,
  PermissionsAndroid
} from 'react-native';

import SplashScreen from './src/pages/splashscreen';
import Login from './src/pages/login';
import firebase from 'firebase';
// Initialize Firebase
 console.disableYellowBox = true;
const config = {
    apiKey: "AIzaSyB1-UHxQsLRzCZBgFG6zEtrh9ybGm3XgxI",
    authDomain: "katomipix.firebaseapp.com",
    databaseURL: "https://katomipix.firebaseio.com",
    projectId: "katomipix",
    storageBucket: "katomipix.appspot.com",
    messagingSenderId: "565838743870",

  };
firebase.initializeApp(config);
import styles from './src/styles/common-styles.js';
export default class FacebookApp extends Component {
	constructor(props){
		super(props);
		this.state = {
		  component: null,
		  loaded: false,
		  
		};
	}
/* 	 requestCameraPermission() {
	  try {
		const granted =  PermissionsAndroid.request(
		  PermissionsAndroid.PERMISSIONS.CAMERA,
		  {
			'title': 'Cool Photo App Camera Permission',
			'message': 'Cool Photo App needs access to your camera ' +
					   'so you can take awesome pictures.'
		  }
		)
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		  console.log("You can use the camera")
		} else {
		  console.log("Camera permission denied")
		}
	  } catch (err) {
		console.warn(err)
	  }
	} */

/*    componentWillMount() {
    this.requestCameraPermission() // which always returns "You can use the camera" even if I disable camera permission access on my device
  } */	
	render() {
		return (
		  <Navigator
			  initialRoute={{component: SplashScreen}}
			  configureScene={(route) => {
				return {
					...Navigator.SceneConfigs.HorizontalSwipeJump,
					gestures: {},
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
