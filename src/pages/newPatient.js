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
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem, Picker} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import LocatePic from './locatePic';
import * as firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
import PhoneInput from 'react-native-phone-input';

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
	  items_dossiers:[],
	  datedate:"",
	  username_med: '',
	  patient_id: '',
	  medecin_id: '',
	  valid: '',//phone input
      type: '',
      value: ''
	}
	this.onValueChangePerso=this.onValueChangePerso.bind(this);
	this.onValueChangeFam=this.onValueChangeFam.bind(this);
	this.onValueChangeNbreGrain=this.onValueChangeNbreGrain.bind(this);
	this.locatePic=this.locatePic.bind(this);
  }  
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
  formatDate(date){
  var day = date.getDate();
  var monthIndex = date.getMonth()+1;
  var year = date.getFullYear();

  return day + '/' + monthIndex+ '/' + year;
  }
  locatePic(){//create category name
	if(this.refs.phone.isValidNumber()==false){
	  alert("Numéro de telephone est invalide")
	}else if(this.state.nom_pat==''|| this.state.prenom_pat==''||this.state.dateNaissance_pat=='' || this.state.lieu_pat=='' || this.state.profession_pat=='' || this.refs.phone.getValue()=="" || this.state.antec_perso=='' || this.state.antec_fam==''  ||this.state.nbreGrain==''){
	  alert("Vous n'avez pas remplis tous les champs!!");
	}else{ 
	  AsyncStorage.getItem('id').then((idd) => {
		AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
			//generate the pushed key
			let patient_id=this.itemsRef.push().getKey();
			let cr_date=this.formatDate(new Date());
			this.itemsRef.child('medecins').child(medecin_usernamee).child('patients').child(patient_id).set({ 
			  nom_pat: this.state.nom_pat.charAt(0).toUpperCase()+this.state.nom_pat.slice(1),
			  prenom_pat: this.state.prenom_pat.charAt(0).toUpperCase()+this.state.prenom_pat.slice(1), 
			  date_de_naissance_pat: this.state.dateNaissance_pat, 
			  lieu_pat: this.state.lieu_pat.charAt(0).toUpperCase()+this.state.lieu_pat.slice(1), 
			  profession_pat: this.state.profession_pat.charAt(0).toUpperCase()+this.state.profession_pat.slice(1), 
			  telephone_patient: this.refs.phone.getValue(), 
			  antecedents_personnels: this.state.antec_perso, 
			  antecedents_familiaux: this.state.antec_fam, 
			  nombre_grain_de_beaute: this.state.nbreGrain,
			  date_creation:cr_date.toString()
			})
			AsyncStorage.removeItem('med_pat_file');
			AsyncStorage.setItem('med_pat_file',JSON.stringify({"id_medecin":medecin_usernamee,"id_patient":patient_id,"nom_pat":this.state.nom_pat,"prenom_pat":this.state.prenom_pat,"categorie": idd,"nombre_images_dossier":0,"nom_pat":this.state.nom_pat,"prenom_pat":this.state.prenom_pat}));
			alert("Nouveau patient ajouté"); 
			this.props.navigator.push({
			  component: LocatePic
			});
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
		  <Grid style={{marginTop:8}}>
			<Col>
			  <Text style={styles.date_de_naissance}>Date de naissance</Text>
			</Col>
			<Col>
			  <DatePicker
				style={{width: 200,marginTop:6}}
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
			 
		  <PhoneInput ref='phone' initialCountry="tn" style={{height: 20,width: 330,margin:7,marginLeft:16,marginTop:22,borderColor:"#29235c",borderBottomWidth:1.5}} textStyle={{color: "#29235c",fontFamily: 'Roboto',fontSize: 16}}/>

		  <Grid style={{marginTop:10}}>
			<Col>
			  <Text style={styles.a_a_n}>Antécédents personnel</Text>
			</Col>
			<Col style={{marginLeft:150}}>
			  <Picker
				iosHeader="Select one"
				mode="dropdown"
				selectedValue={this.state.antec_perso}
				onValueChange={this.onValueChangePerso}>
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
				onValueChange={this.onValueChangeFam}>
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
				onValueChange={this.onValueChangeNbreGrain}>
				<Item label="> 50" value="sup" />
				<Item label="< 50" value="inf" />  
			  </Picker>
			 </Col>
		  </Grid>
		  <Button
			onPress={this.locatePic}
			style={{flex:9,backgroundColor: "#29235c",width:200,height:40,marginLeft:80,marginBottom:10,marginTop:10,alignItems:'center'}}
			textStyle={{fontSize: 14, color:'#fff',fontFamily: 'Roboto'}}>Localiser le grain de beauté</Button>
		</View>
	  </ScrollView>   
	</View>
    );
  }
}
const styles = StyleSheet.create({
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
	fontSize: 16,
	margin: 10,
	marginBottom:0
  },
  date_de_naissance: {
	fontFamily: 'Roboto',
	fontSize:16,
	color:'#29235c',
	marginTop:10,
	margin:13 
  },
  a_a_n: {
	width:250,
	fontFamily: 'Roboto',
	fontSize:16,
	color:'#29235c',
	marginTop:10,
	marginLeft:12,
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