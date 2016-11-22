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
export default class addPatient extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	addPatient(){
		this.props.navigator.push({
          component: NewPatient
        });
	}
	uploadPhoto(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Ajouter Patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>  
		<Card style={styles.body2}>
			<CardItem style={{height:100}}>
				<Text style={{fontFamily: 'Arial', fontSize:20,color:'black',textAlign: 'center'}}>
				Voulez vous ajouter un nouveau patient?
				</Text>
            </CardItem>
			<CardItem style={{flexDirection:'row', flexWrap:'wrap',height:100}}>
			<Grid>
				<Col>
					<Button
						onPress={this.addPatient.bind(this)}
						style={styles.primary_button_oui}
						textStyle={styles.primary_button_text}>OUI</Button>
				</Col>
				<Col>
					<Button
						onPress={this.uploadPhoto.bind(this)}
						style={styles.primary_button_non}
						textStyle={styles.primary_button_text}>NON</Button>
		  		</Col>
			</Grid>
            </CardItem>
        </Card>
		
    </ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('addPatient', () => addPatient);
