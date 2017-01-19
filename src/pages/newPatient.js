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
  PanResponder,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem, Picker} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import GestionNaevus from './gestionNaevus';
import LocatePic from './locatePic';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
export default class newPatient extends Component {
	constructor (props) {
    super(props);
	this.itemsRef = firebase.database().ref();
    this.state = {
		loaded:true,
		nom_pat:'',
		prenom_pat:'',
		dateNaissance_pat: '',
		lieu_pat:'',
		profession_pat:'',
		telephone_patient:'',
		antec_perso: 'oui',
		antec_fam: 'oui',
		nbreGrain: 'sup',
		items_pat:[],
		items_dossiers:[],
		datedate:"",
		username_med: '',
		patient_id: '',
		medecin_id: '',
		id: ''
	}
	this.onValueChangePerso=this.onValueChangePerso.bind(this);
	this.onValueChangeFam=this.onValueChangeFam.bind(this);
	this.onValueChangeNbreGrain=this.onValueChangeNbreGrain.bind(this);
	}
/*  	componentDidMount(){
		AsyncStorage.getItem('id').then((idd) => {
			AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
			alert(idd);
			alert(medecin_usernamee);

 			if(this.state.nom_pat!='' && this.state.prenom_pat!=''){ 
				this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').on('value', (snap) => {
				let items_pat=[];
				// get children as an array
				snap.forEach((child) => {
					items_pat.push({
						antecedents_familiaux :child.val().antecedents_familiaux,
					  _key: child.key,
					});
				});
				AsyncStorage.setItem("items_pat",JSON.stringify(items_pat.length.toString()));
				});
				AsyncStorage.setItem("items_pat").then((itemsPatt)=>{
				let items_patt=JSON.parse(itemsPatt);
				alert(items_patt);
			let patient_id="";
			patient_id=this.state.nom_pat.toLowerCase()+'_'+this.state.prenom_pat.toLowerCase()+'_'+items_patt;
			alert(patient_id);
			//here
			//récupérer la liste des dossiers
			this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').child(patient_id).child('dossiers_medicaux').on('value', (snap2) => {
			let items_dossiers=[];
			// get children as an array
			snap2.forEach((child) => {
				items_dossiers.push({
					date_creation_dossier: child.val().date_creation_dossier,
					date_MAJ_dossier: child.val().date_MAJ_dossier,
					emplacement: child.val().emplacement,
					nom_patient_dossier: child.val().nom_patient_dossier,
					prenom_patient_dossier: child.val().prenom_patient_dossier,
					nombre_images_dossier: child.val().nombre_images_dossier,
					_key: child.key
				});
			});
			AsyncStorage.setItem("doc_length",JSON.stringify(items_dossiers.length.toString()));
			});

			//ajout patient
			this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').child(patient_id).set({ 
				nom_pat: this.state.nom_pat, 
				prenom_pat: this.state.prenom_pat, 
				date_de_naissance_pat: this.state.dateNaissance_pat, 
				lieu_pat: this.state.lieu_pat, 
				profession_pat: this.state.profession_pat, 
				telephone_patient: "+336 "+this.state.telephone_patient, 
				antecedents_personnels: this.state.antec_perso, 
				antecedents_familiaux: this.state.antec_fam, 
				nombre_grain_de_beaute: this.state.nbreGrain, 
			})
			AsyncStorage.getItem("doc_length").then((doc_length)=>{
			let doc_lengthh=JSON.parse(doc_length);
			alert(doc_lengthh)
			let dossier_id=medecin_usernamee+'_'+patient_id+'_'+doc_lengthh;
			var mydate=new Date();
			this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').child(patient_id).child('dossiers_medicaux').child(dossier_id).set({ 
				date_creation_dossier: mydate.toString(),
				date_MAJ_dossier: mydate.toString(),
				nom_patient_dossier: this.state.nom_pat,
				prenom_patient_dossier: this.state.prenom_pat,
				emplacement:"",
				nombre_images_dossier: 0
			})
			AsyncStorage.removeItem('med_pat_file');
			AsyncStorage.setItem('med_pat_file',JSON.stringify({"medecin_id":medecin_usernamee,"patient_id":patient_id,"nom_pat":this.state.nom_pat,"prenom_pat":this.state.prenom_pat,"categorie": idd,"dossier_id":dossier_id}));
			alert("sucesss patient added"); 
			});
			});
			this.props.navigator.push({
			component: LocatePic
			});
			}
			});
			});
	}  */
	onValueChangePerso (value: string) {
        this.setState({
            antec_perso : value
        });
    }
	onValueChangeFam (value: string) {
        this.setState({
            antec_fam : value
        });
    }
	onValueChangeNbreGrain (value: string) {
        this.setState({
			nbreGrain: value
        });
    }
	locatePic(){
			//create category name

			//heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeereeeeeeee
 		if(this.state.nom_pat==''|| this.state.prenom_pat==''||this.state.dateNaissance_pat=='' || this.state.lieu_pat=='' || this.state.profession_pat=='' || this.state.telephone_patient=='' || this.state.antec_perso=='' || this.state.antec_fam==''  ||this.state.nbreGrain==''){
			alert("Vous n'avez pas remplis tous les champs!!");
		}else{ 
			AsyncStorage.getItem('id').then((idd) => {
			AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
			alert(idd);
			alert(medecin_usernamee);
				//
			//heeeeeeeeeeeeeeeeeere

 			if(this.state.nom_pat!='' && this.state.prenom_pat!=''){ 
				this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').on('value', (snap) => {
				let items_pat=[];
				// get children as an array
				snap.forEach((child) => {
					items_pat.push({
						antecedents_familiaux :child.val().antecedents_familiaux,
					  _key: child.key,
					});
				});
				this.setState({items_pat:items_pat});
				});
			let patient_id="";
			patient_id=this.state.nom_pat.toLowerCase()+'_'+this.state.prenom_pat.toLowerCase()+'_'+this.state.items_pat.length;
			alert(patient_id);
			//here
			//récupérer la liste des dossiers
			this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').child(patient_id).child('dossiers_medicaux').on('value', (snap2) => {
			let items_dossiers=[];
			// get children as an array
			snap2.forEach((child) => {
				items_dossiers.push({
					date_creation_dossier: child.val().date_creation_dossier,
					date_MAJ_dossier: child.val().date_MAJ_dossier,
					emplacement: child.val().emplacement,
					nom_patient_dossier: child.val().nom_patient_dossier,
					prenom_patient_dossier: child.val().prenom_patient_dossier,
					nombre_images_dossier: child.val().nombre_images_dossier,
					_key: child.key
				});
			});
			this.setState({items_dossiers:items_dossiers});
			});

			//ajout patient
			this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').child(patient_id).set({ 
				nom_pat: this.state.nom_pat, 
				prenom_pat: this.state.prenom_pat, 
				date_de_naissance_pat: this.state.dateNaissance_pat, 
				lieu_pat: this.state.lieu_pat, 
				profession_pat: this.state.profession_pat, 
				telephone_patient: "+336 "+this.state.telephone_patient, 
				antecedents_personnels: this.state.antec_perso, 
				antecedents_familiaux: this.state.antec_fam, 
				nombre_grain_de_beaute: this.state.nbreGrain, 
			})
			let dossier_id=medecin_usernamee+'_'+patient_id+'_'+this.state.items_dossiers;
			var mydate=new Date();
			this.itemsRef.child('medecins').child(medecin_usernamee).child("categories").child(idd).child('patients').child(patient_id).child('dossiers_medicaux').child(dossier_id).set({ 
				date_creation_dossier: mydate.toString(),
				date_MAJ_dossier: mydate.toString(),
				nom_patient_dossier: this.state.nom_pat,
				prenom_patient_dossier: this.state.prenom_pat,
				emplacement:"",
				nombre_images_dossier: 0
			})
			AsyncStorage.removeItem('med_pat_file');
			AsyncStorage.setItem('med_pat_file',JSON.stringify({"medecin_id":medecin_usernamee,"patient_id":patient_id,"nom_pat":this.state.nom_pat,"prenom_pat":this.state.prenom_pat,"categorie": idd,"dossier_id":dossier_id}));
			alert("sucesss patient added"); 
			this.props.navigator.push({
			component: LocatePic
			});
			}
			});
			});
		}//else ends here
	}
	goBack() {
		this.props.navigator.pop();
		return true; 
	}
  render() {
    return ( 
	<View>
	<HeaderUp text="  1/4   Ajouter un patient" loaded={true} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<View> 
				<TextInput
					required = {true}
					keyboardAppearance ='dark'
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({nom_pat: text})}
					value={this.state.nom_pat}
					placeholder={"Nom"}
					maxLength = {25}
					underlineColorAndroid="#53507c"/>
				<TextInput
				    required = {true}
				    Key = {true}
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({prenom_pat: text})}
					value={this.state.prenom_pat}
					placeholder={"Prénom"}
					maxLength = {25}
					underlineColorAndroid="#53507c"/>					
				 <Grid style={{marginTop:10}}>
					  <Col>
						<Text style={styles.date_de_naissance}>Date de naissance</Text>
					  </Col>
					  <Col>
					  	<DatePicker
							style={{width: 200,marginTop:10}}
							date={this.state.dateNaissance_pat}
							mode="date"
							placeholder={this.state.dateNaissance_pat}
							format="YYYY-MM-DD" 
							minDate="1940-01-01"
							maxDate="2030-01-01"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
							  dateTouch: {
								width: 142
							  },
							  dateTouchBody: {
								flexDirection: 'row',
								height: 40,
								width:150,
								alignItems: 'center',
								justifyContent: 'center'
							  },
							  dateIcon: {
								width: 32,
								height: 32,
								marginLeft: 5,
								marginRight: 5,
							  },
							  iconSource: {
							  source: './img/calendar.png'
							  },
							  dateInput: {
								flex: 1,
								height: 40,
								borderWidth: 1,
								borderColor: '#29235c',
								alignItems: 'center',
								justifyContent: 'center'
							  },
							  dateText: {
								color: '#333'
							  },
							  placeholderText: {
								color: '#29235c'
							  },
							  datePickerMask: {
								flex: 1,
								alignItems: 'flex-end',
								flexDirection: 'row',
								backgroundColor: '#00000077'
							  },
							  datePickerCon: {
								backgroundColor: '#fff',
								height: 0,
								overflow: 'hidden'
							  },
							  btnText: {
								position: 'absolute',
								top: 0,
								height: 42,
								padding: 20,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'center'
							  },
							  btnTextText: {
								fontSize: 16,
								color: '#29235c'
							  },
							  btnTextCancel: {
								color: '#29235c'
							  },
							  btnCancel: {
								left: 0
							  },
							  btnConfirm: {
								right: 0
							  },
							  datePicker: {
								marginTop: 42,
								borderTopColor: '#ccc',
								borderTopWidth: 1,
								backgroundColor: '#29235c'
							  },
							  disabled: {
								backgroundColor: '#eee'
							  }
							}}
							onDateChange={(date) => {this.setState({dateNaissance_pat: date})}}
						  />
					  </Col>
				 </Grid>  
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({lieu_pat: text})}
					value={this.state.lieu_pat}
					placeholder={"Lieu de résidence"}
					maxLength = {25}
					underlineColorAndroid="#29235c"/>		 
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({profession_pat: text})}
					value={this.state.profession_pat}
					placeholder={"Profession"}
					maxLength = {25}
					underlineColorAndroid="#29235c"/> 	
					
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({telephone_patient: text})}
					value={this.state.telephone_patient}
					keyboardType = 'phone-pad'
					placeholder={"Téléphone"}
					maxLength = {25}
					underlineColorAndroid="#53507c"/>	
				  <Grid style={{marginTop:10}}>
					  <Col>
							<Text style={styles.a_a_n}>Antécédents personnel</Text>
					  </Col>
					  <Col style={{marginLeft:150}}>
							<Picker
								iosHeader="Select one"
								mode="dropdown"
								selectedValue={this.state.antec_perso}
								onValueChange={this.onValueChangePerso.bind(this)}>
								<Item label="oui" value="oui" />
								<Item label="non" value="non" />  
						   </Picker>
					 </Col> 
				   </Grid>			 
				  <Grid>
					  <Col>
							<Text style={styles.a_a_n}>Antécédents familiaux </Text>
					  </Col>
					  <Col style={{marginLeft:150}}>
							 <Picker
								iosHeader="Select one"
								mode="dropdown"
								selectedValue={this.state.antec_fam}
								onValueChange={this.onValueChangeFam.bind(this)}>
								<Item label="oui" value="oui" />
								<Item label="non" value="non" />  
						   </Picker>
					 </Col> 
				   </Grid>			 
				<Grid>
					<Col>
						<Text style={styles.a_a_n}>Nombre de grain de beauté</Text>
					</Col>
					<Col style={{marginLeft:140}}>
						<Picker
							style={{width:110}}
							iosHeader="Select one"
							mode="dropdown"
							selectedValue={this.state.nbreGrain}
							onValueChange={this.onValueChangeNbreGrain.bind(this)}>
							<Item label="> 50" value="sup" />
							<Item label="< 50" value="inf" />  
						</Picker>
					</Col>
				</Grid>
			
			<Button
				onPress={this.locatePic.bind(this)}
				style={{flex:9,backgroundColor: "#29235c",width:200,height:40,marginLeft:80,marginBottom:10,marginTop:10,alignItems:'center'}}
				textStyle={{fontSize: 14, color:'#fff',fontFamily: 'Roboto'}}>Localiser le grain de beauté</Button>
		</View>
	</ScrollView>   
	</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  component: {
   marginBottom: 15,
   marginLeft: 20,
  },
  radioButtonWrap: {
    marginRight: 30,
	
  },
  textinput_new_patinet: {
    height: 40,
	width: 340,
	color: "#29235c",
	fontFamily: 'Roboto',
	fontSize: 17,
	margin: 10,
	marginBottom:0
  },
  date_de_naissance: {
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,
	margin:12  
  },
  a_a_n: {
	width:250,
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,
	margin:12,
	marginBottom:0
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('newPatient', () => newPatient);