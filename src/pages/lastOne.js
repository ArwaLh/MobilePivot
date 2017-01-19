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
import UploadForm from './uploadForm';
const window = Dimensions.get('window');
import firebase from 'firebase';

export default class categories extends Component {
	constructor(props){
    super(props);
	}	     
   button_last(){
		this.props.navigator.push({
		 component: GestionPatient
		});
	}
	uploadP(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
  goBack() {
		this.props.navigator.pop();
		return true; 
	}	
  render() {
    return (
	<View>
		<HeaderUp text="Last One" loaded={true} onpress={this.goBack.bind(this)}/>
		<Image style={styles.image_last_one} source={{uri:'http://localhost:8081/img/last.png'}}/>
		<Text style={styles.text_last_one}> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ligula non odio gravida pharetra quis in eros </Text>
		<Button
			onPress={this.button_last.bind(this)}
			style={styles.button_last}
			textStyle={{fontSize: 15, color:'#fff'}}>Revenir</Button>	
		<Button onPress={this.uploadP.bind(this)} textStyle={styles.back_to_upload_button_valid_meta} transparent>ACCEDER AU SITE KATOMI </Button>	
     </View>
    );
  }
}

AppRegistry.registerComponent('categories', () => categories);
