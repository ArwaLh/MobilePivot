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
  AsyncStorage,
  BackAndroid,
  TouchableHighlight,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input, Button, Card, CardItem, List, ListItem} from 'native-base';
import HeaderUp from '../components/headerUp';
import UploadForm from './uploadForm';
import NewPatient from './newPatient';
import LocatePic from './locatePic';
import RechercheP from './rechercheP';
import LastOne from './lastOne';
import Icon from 'react-native-vector-icons/FontAwesome'; 
const window = Dimensions.get('window');
export default class gestionPatient extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true,
          id: ''
		}
	}

	ajoutPat(){
		this.props.navigator.push({
			component: NewPatient
		});
	}
	modPat(){
		this.props.navigator.push({
          component: RechercheP
        }); 
	}
	last(){
		this.props.navigator.push({
          component: LastOne
        }); 
	}
	upl(){
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
	<HeaderUp text="   Gestion des patients" loaded={true} onpress={this.goBack.bind(this)}/>
		 <View style={{margin:7, marginTop:30}}>
		 <List>
		 <ListItem style={{height:(window.height/2)-70}}>
		   <Grid>
		   <Row>
		      <Col style={{width:30,height:50, marginTop:5}}><Icon name="plus-circle" style={{color:'#29235c', fontSize:20}} /></Col>
			    <Col>
					<Text style={{width:200, fontFamily: 'Roboto', fontSize:18, color:'#29235c'}}>Ajouter un patient{"\n"}</Text>
				</Col>	
			</Row>
			<Row style={{height:70, marginBottom:30}}>
				<Text style={{width:320, fontFamily: 'Roboto', fontSize:14, color:'#29235c'}}>Si vous voulez ajouter un patient il suffit de cliquer sur le bouton "AJOUTER UN PATIENT". Il vous suffira d'inserer les informations de votre patient.</Text>
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
	   <View style={{margin:7, marginBottom:35}}>
		 <List>
		 <ListItem style={{height:(window.height/2)-70}}>
		   <Grid>
		   <Row>
		      <Col style={{width:30,height:50}}><Icon name="edit" style={{color:'#29235c', fontSize:20}}  /></Col>
			    <Col>
					<Text style={{width:250, fontFamily: 'Roboto', fontSize:18, color:'#29235c'}}>Modifier la fiche patient{"\n"}</Text>
				</Col>
			</Row>	
			<Row style={{height:75, marginBottom:30}}>
			<Text style={{width:320, fontFamily: 'Roboto', fontSize:14, color:'#29235c'}}>Si vous voulez modifier la fiche du patient il suffit de cliquer sur le bouton "MODIFIER UN PATIENT". Il vous suffira de modifier les informations concernant votre patient.</Text>
			</Row>
			<Row>
				<Button
				onPress={this.modPat.bind(this)}
				style={styles.primary_button_modifier_patient}
				textStyle={styles.primary_button_text_ajout_patient}>MODIFIER LA FICHE PATIENT</Button>
			</Row>
			</Grid>
		 </ListItem>
		  </List>	
	  </View>
     </View>
    );
  }
}

AppRegistry.registerComponent('gestionPatient', () => gestionPatient);
