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
import HeaderOther from '../components/headerOther';
import HeaderUp from '../components/headerUp';
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
		this.state = {
		  patients_array: [],
		  query: '',
		  patient_id: '',
		};
	}
	uploadP(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	gestionNaevus(){
		AsyncStorage.setItem('patient_medecin',JSON.stringify({"medecin_id":medecin_usernamee,"patient_id":this.state.patient_id,"nom_pat":this.state.nom_pat,"prenom_pat":this.state.prenom_pat}));
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
		this.itemsRef.child('medecins/'+medecin_usernamee+"/patients/").on('value', (snap) => {
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
	 <View style={styles.header}>
		<Button transparent onPress={this.goBack.bind(this)}>
	  	 <Image style={{width:20,height:20,flex:1}} source={{uri: 'http://localhost:8081/img/arrow-left.png'}}></Image>
		</Button>
        <View style={styles.header_item}>
			<Text style={styles.header_text}>Recherche patient</Text>
        </View>
      </View>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:55,margin:25}}>
					  Ajouter et modifier des nouvelles données dans le dossier medical du patient
				</Text>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15,margin:25}}>
					  Afin de modifier le dossier médical du patient existant:
				</Text>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15,margin:25}}>
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
				<TouchableOpacity onPress={() => {this.setState({ query: nom_pat})}}>
				  <Text style={styles.itemText}>
					M. / Mme {nom_pat} {prenom_pat}{"\n"} +336{telephone_patient}
				  </Text>
				</TouchableOpacity>
				)}
			/>	
			<Button
			style={styles.primary_button_naevus}
			textStyle={styles.primary_button_text}>Gérer naevus</Button>
      </View>
    );
  }
}

AppRegistry.registerComponent('rechercheP', () => rechercheP);
