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
  Image,
  Linking,
  ListView,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import {List, ListItem, Button} from 'native-base';
import Categories from './categories';
import login from './login';
import uploadFormDynamique from './uploadFormDynamique';
import Hr from 'react-native-hr';
import firebase from 'firebase';

export default class lastOne extends Component {
	constructor(props){
    super(props);
	this.button_last=this.button_last.bind(this);
	this.retour_categorie=this.retour_categorie.bind(this);
	}	     
   button_last(){
		this.props.navigator.push({
		 component: Categories
		});
	}
	retour_categorie(){
		this.props.navigator.push({
          component: login
        }); 
	}
  render() {
    return (
	<View>
		<Header text="Katomi SKIN" loaded={true}/>
		<Image style={styles.image_last_one} source={{uri:'http://localhost:8081/img/last.png'}}/>
		<Text style={styles.text_last_one}> Vous pouvez retourner sur la liste {"\n"}des catégories</Text>	
		<Button
			onPress={this.retour_categorie}
			style={styles.button_last}
			textStyle={styles.text_return_btn_last_one}>Liste des catégories</Button>
			<Hr lineColor='#29235c' line={{width:10}}/>
		<Text style={styles.text_last_one}> Rendez-vous sur notre site {"\n"}web Katomi </Text>			
		<Text style={styles.text_last_one_link}
			onPress={() => Linking.openURL('https://osereso.tn/')}>
		  ACCEDER AU SITE KATOMI 
		</Text>
     </View>
    );
  }
}

AppRegistry.registerComponent('lastOne', () => lastOne);
