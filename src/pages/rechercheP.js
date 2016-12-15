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
		  query: ''
		};
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
	 componentDidMount(){
		//asynchronous storage for medecin id
		AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
			this.setState({
				username_med:medecin_usernamee
			});
		//get patients list
		this.itemsRef.child('medecins/'+'arwa0'+"/patients/").on('value', (snap) => {
				let items=[];
				// get children as an array
				snap.forEach((child) => {
					items.push({
						antecedents_familiaux :child.val().antecedents_familiaux,
						antecedents_personnels: child.val().antecedents_personnels,
						date_de_naissance_pat: child.val().date_de_naissance_pat,
						lieu_pat: child.val().lieu_pat,
						nom_pat: child.val().nom_pat,
						nombre_grain_de_beaute: child.val().nombre_grain_de_beaute,
						prenom_pat: child.val().prenom_pat,
						profession_pat: child.val().profession_pat,
						telephone_patient: child.val().telephone_patient,
						_key: child.key,
					});
				});
				alert(items.length);
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
    const regex = new RegExp(`${query.trim()}`, 'i');
    return patients_array.filter(patient => patient.nom_pat.search(regex) >= 0);
  }
  render() {
	const { query } = this.state;
    const patients_array = this.findPatient(query);
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
    return (
   <View>
	<HeaderUp text="Rechercher un patient" loaded={true} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<View style={styles.body_recherche_patient}>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15}}>
					  Ajouter et modifier des nouvelles données dans le dossier medical du patient
				</Text>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15}}>
					  Afin de modifier le dossier médical du patient existant:
				</Text>
				<Text style={{fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:15}}>
					  -Saisissez le nom et prénom du patient {"\n"}
					  -Sélectionnez le dossier patient
				</Text>
		</View>
		<View style={{marginLeft:38,marginBottom:20,flexDirection:'row', flexWrap:'wrap',flex: 1}}> 
			<Grid>
				<Col>
					<Autocomplete
					  ref="autocomplete"
					  autoCapitalize="none"
					  autoCorrect={false}
					  containerStyle={styles.autocompleteContainer}
					  inputContainerStyle={styles.autocompleteInput}
					  style={{color: '#29235c',backgroundColor: 'transparent'}}
					  data={patients_array.length === 1 && comp(query, patients_array[0].nom_pat) ? [] : patients_array}
					  defaultValue={query}
					  onChangeText={text => this.setState({ query: text })}
					  placeholder="Nom Prénom"
					  renderItem={({ nom_pat,telephone_patient }) => (
						<Button onPress={() => {this.setState({ query: nom_pat})}} transparent>
						  <Text style={styles.itemText}>
							M. / Mme {nom_pat}{"\n"} +336{telephone_patient}
						  </Text>
						</Button>
					  )}
					/>
				</Col>
				<Col>
					<Icon name="search" style={{margin:0,marginTop:25,padding:0,right:0,left:70,color: '#29235c',fontSize:14}}/>	
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
