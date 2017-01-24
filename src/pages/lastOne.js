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
import HeaderOther from '../components/headerOther';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input,Card, CardItem, List, ListItem, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import GestionPatient from './gestionPatient';
import uploadFormDynamique from './uploadFormDynamique';
const window = Dimensions.get('window');
import Hr from 'react-native-hr';
import firebase from 'firebase';

export default class lastOne extends Component {
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
          component: uploadFormDynamique
        }); 
	}
  goBack() {
		this.props.navigator.pop();
		return true; 
	}	
  render() {
    return (
	<View>
		<HeaderUp text="Katomi SKIN" loaded={true} onpress={this.goBack}/>
		<Image style={styles.image_last_one} source={{uri:'http://localhost:8081/img/last.png'}}/>
		<Text style={styles.text_last_one}> Vous pouvez retourner sur la liste {"\n"}des catégories</Text>	
		<Button
			onPress={this.retour_categorie}
			style={styles.button_last}
			textStyle={styles.text_return_btn_last_one}>liste des catégories</Button>
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
