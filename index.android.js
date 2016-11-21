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

import SplashScreen from 'react-native-splash-screen';
import Signup from './src/pages/signup';
import Login from './src/pages/login';
import LoginNative from './src/pages/loginNative';

import Account from './src/pages/account';

import Header from './src/components/header';
import * as firebase from 'firebase';
// Initialize Firebase
var config = {
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
		this.state = {
		  component: null,
		  loaded: false
		};
	}
	componentDidMount() {
        SplashScreen.hide();
    }
	render() {
		return (
		  <Navigator
			  initialRoute={{component: Login}}
			  configureScene={() => {
				return Navigator.SceneConfigs.HorizontalSwipeJump;
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
