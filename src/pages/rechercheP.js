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
import Categories from './categories';
import GestionNaevus from './gestionNaevus';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Button,List, ListItem,} from 'native-base';
import firebase from 'firebase';
import Autocomplete from 'react-native-autocomplete-input';

export default class rechercheP extends Component {
  constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
	this.state = {
	  patients_array: [],
	  query: '',
	  id: '',
	  path: ''
	};
	this.goBack = this.goBack.bind(this);
  }
  goBack() {
	this.props.navigator.pop();
	return true; // do not exit app
  }
  categories(_key){
	let that=this;
	AsyncStorage.getItem('medecin_username').then((id_medecin) => {
	that.itemsRef.child("medecins").child(id_medecin).child("patients").child(_key).child("dossier_medical").once('value', function(snapshot) {
	if(Object.values(snapshot.val())[0].motifs){   
	
	if(Object.values(Object.values(snapshot.val())[0].motifs).length === 1){// if plus qu'une motif de consultation
	AsyncStorage.removeItem("med_pat_file_location");
	AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":id_medecin,"id_patient":_key,"id_dossier":Object.keys(snapshot.val())[0],"nombre_images_dossier":Object.values(snapshot.val())[0].nombre_images_dossier,"nombre_images_motif":Object.values(Object.values(snapshot.val())[0].motifs)[0].nombre_images_motif,"emplacement":Object.values(Object.values(snapshot.val())[0].motifs)[0].emplacement, "id_motif": Object.keys(Object.values(snapshot.val())[0].motifs)[0]}));
	  that.props.navigator.push({
       component: Categories
      }); 
	}else{// if un seul motif de consultation
	AsyncStorage.removeItem("med_pat_file_location");
	AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":id_medecin,"id_patient":_key,"id_dossier":Object.keys(snapshot.val())[0],"nombre_images_dossier":Object.values(snapshot.val())[0].nombre_images_dossier,"nombre_images_motif":Object.values(Object.values(snapshot.val())[0].motifs)[0].nombre_images_motif, "emplacement":Object.values(Object.values(snapshot.val())[0].motifs)[0].emplacement, "id_motif": Object.keys(Object.values(snapshot.val())[0].motifs)[0]}));
	  that.props.navigator.push({
       component: GestionNaevus
      }); 
	}
	}
	}); 
	});
  }
  componentDidMount(){
	let that=this;
	AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {//asynchronous storage for medecin id
	  that.setState({
			username_med:medecin_usernamee
	  }); 
	  that.itemsRef.child('medecins').child(medecin_usernamee).child("patients").once('value', (snap) => {//get patients list
		let items=[];
		snap.forEach((child) => {
			items.push({
				nom_pat: child.val().nom_pat,
				prenom_pat: child.val().prenom_pat,
				id: child.val().id,
				telephone_patient: child.val().telephone_patient,
				_key: child.key,
			});
		});
		const patients_array = items; 
		that.setState({ patients_array });
	  });
	});	
  }
  findPatient(query) {
    if (query === '') {//this method is called whenever the user is typing
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
		<HeaderSearch text="Identifier votre patient" onpress={this.goBack}/>
		<ScrollView
		  scrollEnabled={true}
		  showsVerticalScrollIndicator={true}
		  keyboardShouldPersistTaps={true}
		  keyboardDismissMode='on-drag'>
		<Text style={{fontFamily: 'Roboto', fontSize:14,color:'#29235c',margin:7, marginTop:55,marginLeft:25,marginRight:25}}>
		Merci de saisir les premiéres lettres de nom de patient
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
				<Button onPress={this.categories.bind(this, _key)} transparent>
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
