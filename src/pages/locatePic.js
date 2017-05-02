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
  Alert,
  Image,
  AsyncStorage,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import ButtonS from '../components/button';
import {InputGroup, Input, Button, Card, CardItem, Header, Icon} from 'native-base';
import Modal from 'react-native-modalbox';
const window = Dimensions.get('window');
import TakePicture from './takePic';
import * as firebase from 'firebase';
export default class locatePic extends Component {
  constructor(props){
    super(props);
	this.itemsRef=firebase.database().ref();
		this.state = {
		  loaded: true,
		  dossier_id: '',
		  medecin_id: '',
		  patient_id: '',
		  med_pat_file:{},
		  uri_img:'http://localhost:8081/img/Katomi-face-1.png',
		  cou: this.localiser_cou.bind(this),
		  epaule_gauche: this.localiser_epaule_gauche.bind(this),
		  epaule_droite: this.localiser_epaule_droite.bind(this),
		  thorax: this.localiser_thorax.bind(this),
		  abdomen: this.localiser_abdomen.bind(this),
		  main_droite: this.localiser_main_droite.bind(this),
		  main_gauche: this.localiser_main_gauche.bind(this),
		  jambe_droite: this.localiser_jambe_droite.bind(this),
		  jambe_gauche: this.localiser_jambe_gauche.bind(this),
		  text_tete: 'Tête',
		  text_thorax: 'Thorax',
		  text_abdomen: 'Abdomen',
		  text_cou: 'Cou',
		  text_epaule_droite: 'Épaule droite',
		  text_epaule_gauche: 'Épaule gauche',
		  text_jambe_droite: 'Jambe droite',
		  text_jambe_gauche: 'Jambe gauche',
		  text_main_droite: 'Main droite',
		  text_main_gauche: 'Main gauche',
		}
		this.localiser_tete=this.localiser_tete.bind(this);
		this.localiser_cou=this.localiser_cou.bind(this);
		this.localiser_nuque=this.localiser_nuque.bind(this);
		this.localiser_epaule_gauche=this.localiser_epaule_gauche.bind(this);
		this.localiser_epaule_droite=this.localiser_epaule_droite.bind(this);
		this.localiser_thorax=this.localiser_thorax.bind(this);
		this.localiser_abdomen=this.localiser_abdomen.bind(this);
		this.localiser_dos=this.localiser_dos.bind(this);
		this.localiser_main_gauche=this.localiser_main_gauche.bind(this);
		this.localiser_main_droite=this.localiser_main_droite.bind(this);
		this.localiser_jambe_gauche=this.localiser_jambe_gauche.bind(this);
		this.localiser_jambe_droite=this.localiser_jambe_droite.bind(this);
  }
  localiser_tete(){
	Alert.alert(
	  'Vous avez sélectionné',
	  'Tête',
	  [
		{text: 'Valider pour étape suivante', onPress: () =>{
		  //update dossier médical
		  AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
			const array=JSON.parse(med_pat_filee);
			this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
			let dossier_length=0;
			let items_pat=[];
			snap.forEach((child) => {
			  items_pat.push({
				nombre_images_dossier :child.val().nombre_images_dossier,
				_key: child.key,
			  });
			});
			if(items_pat==null){
				dossier_length=0;
			}else{
				dossier_length=items_pat.length
			}
			alert(dossier_length)
			let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
			let my_date=new Date();
			this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
			  date_creation_dossier: my_date.toString(),
			  date_MAJ_dossier: my_date.toString(),
			  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
			  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
			  emplacement:"Tête",
			  categorie_id:array.categorie,
			  nombre_images_dossier: array.nombre_images_dossier
			})
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
			this.props.navigator.push({
				component: TakePicture
			});
			});
		  });
		} 
		}
	  ]
	) 
  }
  localiser_cou(){
	Alert.alert(
		'Vous avez sélectionné',
		'Cou',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			  AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Cou",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}
			}
		  ]
	)
  }
  localiser_nuque(){
	Alert.alert(
		'Vous avez sélectionné',
		'Nuque',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Nuque",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}
			}
		  ]
	)
  }
  localiser_epaule_gauche(){
	Alert.alert(
		'Vous avez sélectionné',
		'Épaule gauche',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Épaule gauche",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}
			}
		  ]
	)
  }
  localiser_epaule_droite(){
	Alert.alert(
		'Vous avez sélectionné',
		'Épaule droite',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Épaule droite",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}}		
		  ]
	)
  }
  localiser_thorax(){
	Alert.alert(
		'Vous avez sélectionné',
		'Thorax',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Thorax",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}}
		  ]
	)
  }
  localiser_abdomen(){
	Alert.alert(
		'Vous avez sélectionné',
		'Abdomen',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Abdomen",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}}
		  ]
	)
  }
  localiser_dos(){
	Alert.alert(
		'Vous avez sélectionné',
		'Dos',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Dos",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}}
		  ]
	)
  }
  localiser_main_gauche(){
	Alert.alert(
		'Vous avez sélectionné',
		'Main gauche',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Main gauche",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}}
		  ]
	)
  }
  localiser_main_droite(){
	Alert.alert(
		'Vous avez sélectionné',
		'Main droite',
		[
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Main droite",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}}
		]
	)
  }
  localiser_jambe_gauche(){
	Alert.alert(
		'Vous avez sélectionné',
		'Jambe gauche',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Jambe gauche",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			}}
		  ]
	)
  }
  localiser_jambe_droite(){
	Alert.alert(
		'Vous avez sélectionné',
		'Jambe droite',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			//update dossier médical
			AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
				const array=JSON.parse(med_pat_filee);
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').once('value', (snap) => {
				let dossier_length=0;
				let items_pat=[];
				snap.forEach((child) => {
				  items_pat.push({
					nombre_images_dossier :child.val().nombre_images_dossier,
					_key: child.key,
				  });
				});
				if(items_pat==null){
					dossier_length=0;
				}else{
					dossier_length=items_pat.length
				}
				alert(dossier_length)
				let dossier_id=array.id_medecin+'_'+array.id_patient+'_'+dossier_length;
				let my_date=new Date();
				this.itemsRef.child('medecins').child(array.id_medecin).child('patients').child(array.id_patient).child('dossiers_medicaux').child(dossier_id).set({ //ajouter un nouveau dossier pour le nouveau patient
				  date_creation_dossier: my_date.toString(),
				  date_MAJ_dossier: my_date.toString(),
				  nom_patient_dossier: array.nom_pat.charAt(0).toUpperCase()+array.nom_pat.slice(1),
				  prenom_patient_dossier:array.prenom_pat.charAt(0).toUpperCase()+array.prenom_pat.slice(1),
				  emplacement:"Jambe droite",
				  categorie_id:array.categorie,
				  nombre_images_dossier: array.nombre_images_dossier
				})
				AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":array.id_medecin,"id_patient":dossier_id,"id_dossier":array.id_dossier,"nombre_images_dossier":array.nombre_images_dossier,"categorie":array.categorie,"emplacement":'Tête'}));
				this.props.navigator.push({
					component: TakePicture
				});
				});
			  });
			},style: styles.primary_button_oui}
		  ]
	)
  }
  face_avant(){
	this.setState({
		uri_img: 'http://localhost:8081/img/Katomi-face-1.png',
		cou: this.localiser_cou,
		epaule_gauche: this.localiser_epaule_gauche,
		epaule_droite: this.localiser_epaule_droite,
		thorax: this.localiser_thorax,
		abdomen: this.localiser_abdomen,
		main_droite: this.localiser_main_droite,
		main_gauche: this.localiser_main_gauche,
		jambe_droite: this.localiser_jambe_droite,
		jambe_gauche: this.localiser_jambe_gauche,
		text_tete: 'Tête',
		text_cou: 'Cou',
		text_thorax: 'Thorax',
		text_abdomen: 'Abdomen',
		text_epaule_droite: 'Épaule droite',
		text_epaule_gauche: 'Épaule gauche',
		text_jambe_droite: 'Jambe droite',
		text_jambe_gauche: 'Jambe gauche',
		text_main_droite: 'Main droite',
		text_main_gauche: 'Main gauche',
	});
  }
  face_arriere(){
	this.setState({
		uri_img: 'http://localhost:8081/img/Katomi-Face-2.png',
		cou: this.localiser_nuque,
		epaule_gauche: this.localiser_epaule_droite,
		epaule_droite: this.localiser_epaule_gauche,
		thorax: null,
		abdomen: this.localiser_dos,
		main_droite: this.localiser_main_gauche,
		main_gauche: this.localiser_main_droite,
		jambe_droite: this.localiser_jambe_gauche,
		jambe_gauche: this.localiser_jambe_droite,
		text_tete: 'Tête',
		text_cou: 'Nuque',
		text_thorax: '',
		text_abdomen: 'Dos',
		text_epaule_droite: 'Épaule gauche',
		text_epaule_gauche: 'Épaule droite',
		text_jambe_droite: 'Jambe gauche',
		text_jambe_gauche: 'Jambe droite',
		text_main_droite: 'Main gauche',
		text_main_gauche: 'Main droite',
	});
  }
  goBack() {
	this.props.navigator.pop();
	return true; // do not exit app
  }	
  render() {
    return (
	<View>
	<HeaderUp text="Séléction zone" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
		<Image style={styles.image} ref="img" source={{uri:this.state.uri_img}}>
			<View style={{flexDirection: 'row', flexWrap:'wrap',backgroundColor: 'transparent'}}>
				<Button onPress={this.face_avant.bind(this)} style={{backgroundColor:'transparent',marginLeft: 0,marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Avant</Text>
				</Button>
				<Button onPress={this.face_arriere.bind(this)} style={{backgroundColor:'transparent',marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Arriére</Text>
				</Button>
			</View>
			<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
			<TouchableOpacity
				onPress={this.localiser_tete}
				style={{width:100,height:22,marginLeft:55,marginTop:25,marginBottom:30,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_tete}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.cou}
				style={{width:100,height:22,marginLeft:216,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_cou}</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent',marginTop:0}}>
			<TouchableOpacity
				onPress={this.state.epaule_droite}
				style={{width:100,height:22,marginLeft:0,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_epaule_droite}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.epaule_gauche}
				style={{width:100,height:22,marginLeft:147,backgroundColor: "transparent",marginTop:6}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_epaule_gauche}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				accessible={false}
				onPress={this.state.thorax}
				style={{width:100,height:27,marginLeft:20,marginBottom:11,marginTop:20,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_thorax}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.abdomen}
				style={{width:100,height:28,marginLeft:230,marginBottom:0,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_abdomen}</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent',marginTop:0}}>
			<TouchableOpacity
				onPress={this.state.main_droite}
				style={{width:100,height:24,marginLeft:0,marginBottom:0,marginTop:0,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_main_droite}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.main_gauche}
				style={{width:100,height:22,marginLeft:162,marginBottom:0,marginTop:10,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_main_gauche}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={this.state.jambe_gauche}
				style={{width:100,height:24,marginLeft:230,marginTop:46,marginBottom:20,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_jambe_gauche}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.jambe_droite}
				style={{width:100,height:24,marginLeft:20,marginBottom:10,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_jambe_droite}</Text>
				</TouchableOpacity>
			</View>
		</Image>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
