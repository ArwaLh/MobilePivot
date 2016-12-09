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
  TouchableOpacity,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input, Button, Card, CardItem, Header} from 'native-base';
import UploadForm from './uploadForm';
import ValidMeta from './validMeta';
import TakePic from './takePic';
import NewPatient from './newPatient';
import GestionNaevus from './gestionNaevus';
import LocatePic from './locatePic';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import Autocomplete from 'react-native-autocomplete-input';
export default class recherchePatient extends Component {
	constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
		this.state = {
		  loaded: true,
		  items_pat: [],
		  query: ''
		}
	}
	uploadP(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	gestionNaevus(){
		this.props.navigator.push({
          component: GestionNaevus
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	componentDiDmount(){
		let items = [];
		//ADDING NEW PATIENT
		//get listStyleTypetasksRef.on('value', (dataSnapshot) => {
		this.itemsRef.child('medecins').child('patients').on('value', (snap) => {

		  // get children as an array

		  snap.forEach((child) => {
			items.push({
			  nom: child.val().nom,
			  _key: child.key,
			  prenom: child.val().prenom,
			  _key: child.key,
			  date_de_naissance: child.val().date_de_naissance,
			  _key: child.key,
			  lieu: child.val().lieu,
			  _key: child.key,
			  profession: child.val().profession,
			  _key: child.key,
			  telephone_patient: child.val().telephone_patient,
			  _key: child.key,
			  antecedents_personnels: child.val().antecedents_personnels,
			  _key: child.key,
			  antecedents_familiaux: child.val().antecedents_familiaux,
			  _key: child.key,
			  nombre_grain_de_beaute: child.val().nombre_grain_de_beaute,
			  _key: child.key,
			});
		  });

		});
		let patients=items;
		this.setState({
			items_pat: items
		});
		/* this.itemsRef.orderByChild('nom_pat').equalTo(this.state.email_medecin).on("child_added", function(snapshot) {
			AsyncStorage.setItem('medecin_username', snapshot.key);
			alert(snapshot.key);
		}); */
	}
	find_patient(query){
    if (query === '') {
      return [];
    }
	//
	this.itemsRef.child('medecins').child('patients').orderByChild('nom_pat').
	  equalTo(this.state.email_medecin). // The user-inputted search
	  on('value', function(snap) {
		alert(snap.val());
		
		const { patients } =snap.val();
		return patients;
	});
	//
	}
  render() {
	const data = this.find_patient(this.state.query);
    return (
   <View>
	<HeaderUp text="Rechercher un patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<View style={styles.body_recherche_patient}>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15}}>
					  Ajouter et modifier des nouvelles données dans le dossier medical du patient
				</Text>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15}}>
					  Afin de modifier le dossier médical du patient existant:
				</Text>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15}}>
					  -Saisissiez le nom et prénom du patient
					  -Saisissiez le dossier patient
				</Text>
		</View>
		<View style={{margin:55,marginBottom:40}}>  
	         <Grid>
			    <Col>
					<InputGroup style={{width: 240}}>
						 <Input placeholder="Nom Prénom" style={{color:"#29235c"}}/>
                    </InputGroup>
					<Autocomplete
						autoCapitalize="none"
						autoCorrect={false}
						data={data}
						defaultValue={this.state.query}
						placeholder="Nom Prénom"
						onChangeText={text => this.setState({query: text})}
						 renderItem={data => (
						  <TouchableOpacity onPress={() =>
							  this.setState({query: data})
							}
						  >
							<Text>{data}</Text>
						  </TouchableOpacity>
						)}
					  />
				</Col>
				<Col>   
				 <Button transparent style={{width: 200}}>
						<Icon name="search" />
                    </Button>
				</Col>	
		      </Grid>
		</View> 
		<Button
			onPress={this.gestionNaevus.bind(this)}
			style={styles.primary_button}
			textStyle={styles.primary_button_text}>Gérer naevus</Button>
		
    </ScrollView>
   </View>
    );
  }
}

AppRegistry.registerComponent('recherchePatient', () => recherchePatient);
