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
  TouchableHighlight,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input, Button, Card, CardItem, Header, Icon} from 'native-base';

import UploadForm from './uploadForm';
export default class addPatient extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	addPatient(){
		alert("add patient");
	}
	uploadPhoto(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
  render() {
    return (
	<View style={styles.container}>
	<Header style={{backgroundColor: '#53507c'}}>
		<Text style={{color:"#fff"}}>
			Ajouter patient
		</Text>
	</Header>
	<ScrollView>  
		<Card style={styles.body2}>
			<CardItem>
				<Text>
				Voulez vous ajouter un nouveau patient?
				</Text>
            </CardItem>
			<CardItem style={{flexDirection:'row', flexWrap:'wrap'}}>
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
