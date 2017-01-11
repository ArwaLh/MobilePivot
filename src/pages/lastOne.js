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
  ListView,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input,Card, CardItem, List, ListItem, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import GestionPatient from './gestionPatient';
const window = Dimensions.get('window');
import firebase from 'firebase';

export default class categories extends Component {
	constructor(props){
    super(props);
	}	
   gestionP(){
		this.props.navigator.push({
		 component: GestionPatient
		});
	}	
  render() {
    return (
	<View>
	<Header text="Derniere interface" loaded={true}/> 
		<Button
			onPress={this.gestionP.bind(this)}
			style={styles.send_button_valid_meta}
			textStyle={{fontSize: 15, color:'#fff'}}>Envoyer</Button>
     </View>
    );
  }
}

AppRegistry.registerComponent('categories', () => categories);
