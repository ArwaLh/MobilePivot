import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
export default class global extends Component {
constructor(props){
		super(props);
	config={
		apiKey: "AIzaSyC7F3pn_tG3LJk-4pPocpvMRyh8SEW-1sQ",
		authDomain: "katomi-148921.firebaseapp.com",
		databaseURL: "https://katomi-148921.firebaseio.com",
		storageBucket: "katomi-148921.appspot.com",
	}
}
}
AppRegistry.registerComponent('global', () => global);