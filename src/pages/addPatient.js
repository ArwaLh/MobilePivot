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
import {InputGroup, Input, Button, Card, CardItem, Header, List, ListItem} from 'native-base';

import UploadForm from './uploadForm';
import NewPatient from './newPatient';
import LocatePic from './locatePic';
import UpdatePatient from './updatePatient';
import Icon from 'react-native-vector-icons/FontAwesome'; 
export default class addPatient extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	ajoutPat(){
		this.props.navigator.push({
          component: NewPatient
        });
	}
	modPat(){
		this.props.navigator.push({
          component: UpdatePatient
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Gestion des patients" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView> 
		 <View style={{margin:7, marginTop:30}}>
		 <List>
		 <ListItem>
		   <Grid>
		   <Row>
		      <Col style={{width:30,height:100, marginTop:5}}><Icon name="plus-circle" style={{color:'#29235c', fontSize:20}}  /></Col>
			    <Col>
					<Text style={{width:220, fontFamily: 'Roboto', fontSize:18, color:'#29235c'}}>Ajouter un patient</Text>
				</Col>
			</Row>

			<Row>
					<Button
					onPress={this.ajoutPat.bind(this)}
					style={styles.primary_button_ajout_patient}
					textStyle={styles.primary_button_text_ajout_patient}>AJOUTER UN NOUVEAU PATIENT</Button>
			</Row>
			</Grid>
		 </ListItem>
		  </List>	
	  </View>	
	   <View style={{margin:7, marginTop:15}}>
		 <List>
		 <ListItem>
		   <Grid>
		   <Row>
		      <Col style={{width:30,height:100, marginTop:5}}><Icon name="edit" style={{color:'#29235c', fontSize:20}}  /></Col>
			    <Col>
					<Text style={{width:250, fontFamily: 'Roboto', fontSize:18, color:'#29235c'}}>Modifier la fiche patient</Text>
				</Col>
			</Row>
			<Row>
					<Button
					onPress={this.modPat.bind(this)}
					style={styles.primary_button_ajout_patient}
					textStyle={styles.primary_button_text_ajout_patient}>MODIFIER LA FICHE PATIENT</Button>
			</Row>
			</Grid>
		 </ListItem>
		  </List>	
	  </View>

    </ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('addPatient', () => addPatient);
