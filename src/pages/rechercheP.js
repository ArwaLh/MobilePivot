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
		  loaded: true,
		  patients_array: [],
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
	 componentDidMount(){
	   	this.setState({
			loaded: true
		});
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
				const patients_array = items;
				this.setState({ patients_array });
			});
		});	
		//
	/* 	var json={
	  "medecins" : {
		"arwa0" : {
		  "email_medecin" : "arwa@osereso.fr",
		  "patients" : {
			"gvjfghj_fghh_1" : {
			  "antecedents_familiaux" : "oui_antec_fam",
			  "antecedents_personnels" : "non_antec_perso",
			  "date_de_naissance_pat" : "2016-01-07",
			  "lieu_pat" : "vhuu",
			  "nom_pat" : "gvjfghj",
			  "nombre_grain_de_beaute" : "sup",
			  "prenom_pat" : "fghh",
			  "profession_pat" : "ghjj",
			  "telephone_patient" : "852236"
			},
			"gvjuj_fghh_0" : {
			  "antecedents_familiaux" : "oui_antec_fam",
			  "antecedents_personnels" : "non_antec_perso",
			  "date_de_naissance_pat" : "2016-01-07",
			  "lieu_pat" : "vhuu",
			  "nom_pat" : "gvjuj",
			  "nombre_grain_de_beaute" : "sup",
			  "prenom_pat" : "fghh",
			  "profession_pat" : "ghjj",
			  "telephone_patient" : "852236"
			},
			"tvbjj_fhii_2" : {
			  "antecedents_familiaux" : "oui_antec_fam",
			  "antecedents_personnels" : "non_antec_perso",
			  "date_de_naissance_pat" : "2016-12-09",
			  "lieu_pat" : "ghh",
			  "nom_pat" : "tvbjj",
			  "nombre_grain_de_beaute" : "sup",
			  "prenom_pat" : "fhii",
			  "profession_pat" : "ggb",
			  "telephone_patient" : "96633"
			}
		  }
		},
		"chiraz2" : {
		  "email_medecin" : "chiraz.hamrouni@esprit.tn"
		},
		"chiraz3" : {
		  "email_medecin" : "chiraz@osereso.fr"
		},
		"cyrine1" : {
		  "email_medecin" : "cyrine@osereso.fr",
		  "patients" : {
			"aaaa_fvvv_1" : {
			  "antecedents_familiaux" : "non_antec_fam",
			  "antecedents_personnels" : "non_antec_perso",
			  "date_de_naissance_pat" : "2016-12-29",
			  "lieu_pat" : "hbb",
			  "nom_pat" : "aaaa",
			  "nombre_grain_de_beaute" : "sup",
			  "prenom_pat" : "fvvv",
			  "profession_pat" : "vvb ",
			  "telephone_patient" : "896633"
			},
			"ghjknnbvhh_fvvv_0" : {
			  "antecedents_familiaux" : "non_antec_fam",
			  "antecedents_personnels" : "non_antec_perso",
			  "date_de_naissance_pat" : "2016-12-29",
			  "lieu_pat" : "hbb",
			  "nom_pat" : "ghjknnbvhh",
			  "nombre_grain_de_beaute" : "sup",
			  "prenom_pat" : "fvvv",
			  "profession_pat" : "vvb ",
			  "telephone_patient" : "896633"
			}
		  }
		}
	  }
	} */
   }
	findPatient(query) {
	//this method is calleed whenever the user is typing
    if (query === '') {
      return [];
    }
    const { patients_array } = this.state;
/* 	var arr = Object.keys(patients_array).map(function(k) { return patients_array[k] }); */
    const regex = new RegExp(`${query.trim()}`, 'i');
    return patients_array.filter(patient => patient.nom_pat.search(regex) >= 0);
  }
  render() {
	const { query } = this.state;
    const patients_array = this.findPatient(query);
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
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
					  -Saisissez le nom et prénom du patient {"\n"}
					  -Sélectionnez le dossier patient
				</Text>
		</View>
		<View style={{marginLeft:38,marginBottom:20,flexDirection:'row', flexWrap:'wrap',flex: 1}}> 
			<Grid>
				<Col>
					<Autocomplete
					  autoCapitalize="none"
					  autoCorrect={true}
					  containerStyle={styles.autocompleteContainer}
					  inputContainerStyle={styles.autocompleteInput}
					  style={{color: '#29235c',backgroundColor: 'transparent'}}
					  data={patients_array.length === 1 && comp(query, patients_array[0].nom_pat) ? [] : patients_array}
					  defaultValue={query}
					  onChangeText={text => this.setState({ query: text })}
					  placeholder="Nom Prénom"
					  renderItem={({ nom_pat, prenom_pat , telephone_patient }) => (
					  <List>
					  <ListItem>
						<TouchableOpacity onPress={() => this.setState({ query: nom_pat })}>
						  <Text style={styles.itemText}>
							M. / Mme {nom_pat} {prenom_pat} {"\n"} +336 {telephone_patient}
						  </Text>
						</TouchableOpacity>
					  </ListItem>
					  </List>
					  )
					  }
					></Autocomplete>
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
