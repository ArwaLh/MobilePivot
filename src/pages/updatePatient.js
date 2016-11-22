/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  BackAndroid,
  TouchableHighlight,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input, Button, Card, CardItem, Header, Icon} from 'native-base';

import UploadForm from './uploadForm';
import NewPatient from './newPatient';
export default class updatePatient extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Modifier Patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView  style={styles.body2}>  
		<Text style={{fontFamily: 'Arial', fontSize:20,color:'black',textAlign: 'center'}}>
			Veuillez saisir le nom du patinet
		</Text>
		<TextInput
			style={styles.textinput}
			value={this.state.nom_patinet}
			underlineColorAndroid="black"
		/>
		<Button
			onPress={this.locatePic.bind(this)}
			style={styles.primary_button_non}
			textStyle={styles.primary_button_text}>Localiser Photo</Button>
    </ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('updatePatient', () => updatePatient);
