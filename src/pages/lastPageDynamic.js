/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  ScrollView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Linking,
  Image,
  ListView,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import {List, ListItem, Button} from 'native-base';
import GestionPatient from './gestionPatient';
import Hr from 'react-native-hr';
import TakePic from './takePic';
import firebase from 'firebase';

export default class lastPageDynamic extends Component {
	constructor(props){
    super(props);
	this.button_last=this.button_last.bind(this);
	this.retour_categorie=this.retour_categorie.bind(this);
	this.goBack=this.goBack.bind(this);
	}	     
   button_last(){
		this.props.navigator.push({
		 component: GestionPatient
		});
	}
	retour_categorie(){
		this.props.navigator.push({
          component: TakePic
        }); 
	}
  goBack() {
		this.props.navigator.pop();
		return true; 
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
		
     </View>
    );
  }
}

AppRegistry.registerComponent('lastPageDynamic', () => lastPageDynamic);
