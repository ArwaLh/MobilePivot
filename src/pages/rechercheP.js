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
  Image,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  TouchableHighlight,
  View
} from 'react-native';
import HeaderSearch from '../components/headerSearch';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input, Button, Card, CardItem, Header, List,ListItem} from 'native-base';
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
	AsyncStorage.multiRemove(["patient_id","medecin_patient"]);
		this.state = {
		  patients_array: [],
		  query: ''
		};
	}
	uploadP(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	gestionNaevus(){
		let patient_id='';
		this.itemsRef.child('medecins/'+this.state.username_med+"categories/grain_de_beaute"+'/patients').orderByChild('nom_pat').equalTo(this.state.query).once("child_added", function(snapshot) {
			patient_id=snapshot.key;
		});
		AsyncStorage.setItem("medecin_patient",JSON.stringify({"patient_id":patient_id,"medecin_id":this.state.username_med}));
		this.props.navigator.push({
        component: GestionNaevus
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	componentDidMount(){
		//asynchronous storage for medecin id
		AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
			this.setState({
				username_med:medecin_usernamee
			});
		//get patients list
		this.itemsRef.child('medecins/'+medecin_usernamee+"categories/grain_de_beaute"+"/patients/").on('value', (snap) => {
				let items=[];

				// get children as an array
				snap.forEach((child) => {
					items.push({
						nom_pat: child.val().nom_pat,
						prenom_pat: child.val().prenom_pat,
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
   static renderPatient(patient) {
    const { nom_pat,prenom_pat,telephone_patient } = patient;

    return (
      <View>
        <Text style={styles.titleText}>{nom_pat}</Text>
        <Text style={styles.directorText}>{prenom_pat}</Text>
        <Text style={styles.openingText}>{telephone_patient}</Text>
      </View>
    );
  }
	findPatient(query) {
	//this method is calleed whenever the user is typing
    if (query === '') {
      return [];
    }
    const { patients_array } = this.state;
	//alert(JSON.stringify(this.state.patients_array));	
    const regex = new RegExp(`${query.trim()}`, 'i');
    return patients_array.filter(patient => patient.nom_pat.search(regex) >= 0);
  }
  render() {
	const { query } = this.state;
    const patients_array = this.findPatient(query);
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
    return (
	 <View style={styles.firstContainer}>
		<HeaderSearch text="Rechercher un patient" onpress={this.goBack.bind(this)}/>
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
			data={patients_array.length === 1 && comp(query, patients_array[0].nom_pat) ? [] : patients_array}
			defaultValue={query}
			onChangeText={text => this.setState({ query: text })}
			placeholder="Nom Prénom"
			renderItem={({ nom_pat,prenom_pat,telephone_patient }) => (
			  <List>
			  <ListItem>
				<Button onPress={() => {this.setState({ query: nom_pat})}} transparent>
				  <Text style={styles.itemText}>
					M. / Mme {nom_pat} {prenom_pat}
				  </Text>
				  <Text style={styles.itemText_phone}>
					{"\n"}{telephone_patient}
				  </Text>
				</Button>
			  </ListItem>
			  </List>
				)}
		/>	
		<Button
			onPress={this.gestionNaevus.bind(this)}
			style={styles.primary_button_naevus}
			textStyle={styles.primary_button_text}>Gérer dossier</Button>
      </View>
    );
  }
}

AppRegistry.registerComponent('rechercheP', () => rechercheP);
