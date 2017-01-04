/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Dimensions,
  ListView,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { List, ListItem, Button, Grid, Col, Row} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';import Hr from 'react-native-hr';
const window = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import LocatePic from './locatePic';
import GestionFichier from './gestionFichier';
export default class gestionNaevus extends Component {
	constructor (props) {
		super(props);
		this.itemsRef = firebase.database().ref();
		this.state = {
			dataSource: new ListView.DataSource({
			  rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			patient: null,
			dossiers_medicaux: [],
			patient_id: '',
			medecin_id: '',
			nom_pat: '',
			prenom_pat: '',
		};
	}
	componentDidMount(){
		AsyncStorage.getItem('medecin_patient').then((patient_medecin_arrayy) => {
			const arr=JSON.parse(patient_medecin_arrayy);
			this.itemsRef.child('medecins/'+arr.medecin_id+'/patients/'+arr.patient_id+'/dossiers_medicaux/').on('value', (snap) => {
			let items=[];
			// get children as an array
			snap.forEach((child) => {
				items.push({
					nom_patient_dossier: child.val().nom_patient_dossier,
					prenom_patient_dossier: child.val().prenom_patient_dossier,
					nombre_images_dossier: child.val().nombre_images_dossier,
					telephone_patient_dossier: child.val().telephone_patient_dossier,
					date_creation_dossier: child.val().date_creation_dossier,
					date_MAJ_dossier: child.val().date_MAJ_dossier,
					categorie: child.val().categorie,
					_key: child.key
				});
			});
			this.setState({
			  dataSource: this.state.dataSource.cloneWithRows(items),
			  patient_id: arr.patient_id,
			  medecin_id: arr.medecin_id,
			});
			//const patients_array = items;
			const dossiers_medicaux = items; 
			this.setState({ dossiers_medicaux });
			});
			let patient_a=null;
			this.itemsRef.child('medecins/'+arr.medecin_id+'/patients').orderByKey().equalTo(arr.patient_id).once("child_added", function(snapshot) {
				patient_a = snapshot.val(); 
			});
			alert(patient_a);
			this.setState({
				patient:patient_a,
				patient_name:patient_a.nom_pat,
				patient_tel:patient_a.telephone_patient,
				patient_lastname:patient_a.prenom_pat
			});
		});
	}
	goBack() { 
		this.props.navigator.pop();
		return true;
	}
	localiser_photo(id){
		alert(id);
		AsyncStorage.removeItem("med_pat_file");
		AsyncStorage.setItem("med_pat_file",JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":id}));
		this.props.navigator.push({
          component: LocatePic
        }); 
	}
	nouveau_fichier(){
		let my_date=new Date();
		let dossier_id=this.state.medecin_id+'_'+this.state.patient_id+'_'+this.state.dossiers_medicaux.length;
		this.itemsRef.child('medecins/'+this.state.medecin_id+'/patients/'+this.state.patient_id).child('dossiers_medicaux/'+dossier_id).set({ 
			date_creation_dossier: my_date.toString(),
			date_MAJ_dossier: my_date.toString(),
			nom_patient_dossier: this.state.patient.nom_pat,
			prenom_patient_dossier: this.state.patient.prenom_pat,
			telephone_patient_dossier: this.state.patient.telephone_patient,
			nombre_images_dossier: 0,
			categorie: "grain de beauté"
		})
	}	