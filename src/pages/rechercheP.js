/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AsyncStorage,
  Dimensions,
  Text,
  ScrollView,
  BackAndroid,
  View
} from 'react-native';

import HeaderSearch from '../components/headerSearch';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Button,List, ListItem,} from 'native-base';
import GestionNaevus from './gestionNaevus';
import firebase from 'firebase';
import Autocomplete from 'react-native-autocomplete-input';

export default class rechercheP extends Component {
  constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
	AsyncStorage.multiRemove(["patient_id","medecin_patient"]);
	this.state = {
	  patients_array: [],
	  query: '',
	  id: ''
	};
	this.goBack = this.goBack.bind(this);
	this.gestionNaevus = this.gestionNaevus.bind(this);
  }
  gestionNaevus(patient_id,nom_pat,prenom_pat){
	this.setState({ query: nom_pat+" "+prenom_pat});
	//let patient_id='';
	if (this.state.query === '') {
	  return [];//do nothing whenever the query is empty
	}
	AsyncStorage.setItem("medecin_patient",JSON.stringify({"id_patient":patient_id,"id_medecin":this.state.username_med,"categorie":this.state.id}));
	this.props.navigator.push({
       component: GestionNaevus
    }); 
  }
  goBack() {
	this.props.navigator.pop();
	return true; // do not exit app
  }
  componentDidMount(){
	//recherche par l'id du categorie!!!
	AsyncStorage.getItem('id').then((idd) => {
	  this.setState({
		id: idd
	 });
	});
	//asynchronous storage for medecin id
	AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
	  this.setState({
			username_med:medecin_usernamee
	  });
	  //get patients list
	  this.itemsRef.child('medecins').child(medecin_usernamee).child("patients").on('value', (snap) => {
		let items=[];
		// get children as an array
		snap.forEach((child) => {
			items.push({
				nom_pat: child.val().nom_pat,
				prenom_pat: child.val().prenom_pat,
				id: child.val().id,
				telephone_patient: child.val().telephone_patient,
				_key: child.key,
			});
		});
		//const patients_array = items;
		const patients_array = items; 
		this.setState({ patients_array });
	  });
	});	
  }
  findPatient(query) {
	//this method is called whenever the user is typing
    if (query === '') {
      return [];
    }
    const { patients_array } = this.state;	
    const regex1 = new RegExp(`${query.trim()}`, 'i');
    return patients_array.filter(patient => patient.nom_pat.search(regex1) >= 0);
  }
  render() {
	const { query } = this.state;
    const patients_array = this.findPatient(query);
    const comp = (s, s2, s3) => s.toLowerCase().trim() === s2.toLowerCase().trim().substr(0,s2.toLowerCase().trim().indexOf(' ')) && s.toLowerCase().trim() === s3.toLowerCase().trim().substr(0,s3.toLowerCase().trim().indexOf(' '));
    return (
	 <View style={styles.firstContainer}>
		<HeaderSearch text="Rechercher un patient" onpress={this.goBack}/>
		<ScrollView
		  scrollEnabled={true}
		  showsVerticalScrollIndicator={true}
		  keyboardShouldPersistTaps={true}
		  keyboardDismissMode='on-drag'>
		<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:55,marginLeft:25,marginRight:25}}>
		Ajouter et modifier des nouvelles données dans le dossier medical du patient
		</Text>
		<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black',marginLeft:25,marginRight:25}}>
		 Afin de modifier le dossier médical du patient existant:
		</Text>
		<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black',marginLeft:25,marginRight:25}}>
		 -Saisissez le nom et prénom du patient {"\n"}
		 -Sélectionnez le dossier patient
		</Text>
		<Autocomplete
		  ref="autocomplete"
		  autoCapitalize="none"
		  autoCorrect={false}
		  containerStyle={styles.autocompleteContainer}
		  inputContainerStyle={styles.autocompleteInput}
		  data={patients_array.length === 1 && comp(query, patients_array[0].nom_pat,  patients_array[0].prenom_pat) ? [] : patients_array}
		  defaultValue={query}
		  onChangeText={text => this.setState({ query: text })}
		  placeholder="Nom & Prénom"
		  renderItem={({ _key,nom_pat,prenom_pat,telephone_patient }) => (
			<List>
			  <ListItem style={{height:60}}>
				<Button onPress={this.gestionNaevus.bind(this,_key,nom_pat,prenom_pat)} transparent>
				  <Text style={styles.itemText}>
					M./Mme {nom_pat} {prenom_pat}
				  </Text>
				  <Text style={styles.itemText_phone}>
					{"\n"}{telephone_patient}
				  </Text>
				</Button>
			  </ListItem>
			</List>
		  )}
		/>	
		</ScrollView>
      </View>
    );
  }
}

AppRegistry.registerComponent('rechercheP', () => rechercheP);
