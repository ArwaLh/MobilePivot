/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  AppRegistry,
  AsyncStorage,
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
export default class rechercheP extends Component {
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
			//
/* 	AsyncStorage.getItem('medecin_username').then((medecin_username) => {
		  this.setState({
			username_med: medecin_username
		  });
		this.itemsRef.child('medecins/'+medecin_username).child('patients/').on('value', (snap) => {
			let items=[];
				// get children as an array
			snap.forEach((child) => {
				items.push({
					antecedents_familiaux :child.val().antecedents_familiaux,
					antecedents_personnels:child.val().antecedents_personnels,
					date_de_naissance_pat:child.val().date_de_naissance_pat,
					lieu_pat:child.val().lieu_pat,
					nom_pat:child.val().nom_pat,
					nombre_grain_de_beaute:child.val().nombre_grain_de_beaute,
					prenom_pat:child.val().prenom_pat,
					profession_pat:child.val().profession_pat,
					telephone_patient:child.val().telephone_patient,
					_key: child.key,
				});
			});
			this.setState({
				items_pat: items
			});
		});
	}); */	
		this.props.navigator.push({
          component: GestionNaevus
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	 componentDidMount(){
	   	this.setState({
			loaded: true
		});
		AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
		  this.setState({
			username_med: medecin_usernamee
		  });
		});
   }
	find_patient(query){
	//look for all the patients in the database
		  if (query === '') {
			this.itemsRef.child('medecins/'+this.state.username_med).child('patients/').on('value', (snap) => {
			let items=[];
				// get children as an array
			snap.forEach((child) => {
				items.push({
					antecedents_familiaux :child.val().antecedents_familiaux,
					antecedents_personnels:child.val().antecedents_personnels,
					date_de_naissance_pat:child.val().date_de_naissance_pat,
					lieu_pat:child.val().lieu_pat,
					nom_pat:child.val().nom_pat,
					nombre_grain_de_beaute:child.val().nombre_grain_de_beaute,
					prenom_pat:child.val().prenom_pat,
					profession_pat:child.val().profession_pat,
					telephone_patient:child.val().telephone_patient,
					_key: child.key,
				});
			});
			this.setState({
				items_pat: items
			});
			});
		  }

		//filter patients
		this.itemsRef.child('medecins/'+this.state.username_med).child('patients/').orderByChild('nom_pat').
		  startAt(query). // The user-inputted search
		  on('value', function(snap) {
			const patients =snap.val();
			return patients;
		});

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
					<Autocomplete
						autoCapitalize="none"
						autoCorrect={false}
						data={data}
						defaultValue={this.state.query}
						placeholder="Nom & Prénom"
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

AppRegistry.registerComponent('rechercheP', () => rechercheP);
