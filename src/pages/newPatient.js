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

import firebase from 'firebase';
import DatePicker from 'react-native-datepicker';
export default class newPatient extends Component {
	constructor (props) {
    super(props);
	this.itemsRef = firebase.database().ref();
    this.state = {
	loaded:true,
      types1: [{label: 'Régulier', value: 0}, {label: 'Irrégulier', value: 1}],
      value1: 0,
      value1Index: 0,
      types2: [{label: 'Brun foncé', value: 0}, {label: 'Brun clair', value: 1}],
      value2: 0,
      value2Index: 0,
      types3: [{label: 'Oui', value: 0}, {label: 'Non', value: 1}],
      value3: 0,
      value3Index: 0,
	  chickenWings: 1.5,
	  value: 1.0,
	  selectedItem: undefined,
      antec_perso: 'oui_antec_perso',
      antec_fam: 'oui_antec_fam',
      nbreGrain: 'sup',
      results: {
      items: []
      },
	  date:"2016-05-25"	  
	}}
	 componentWillMount(){
		AsyncStorage.getItem('medecin_username').then((medecin_username) => {
		  this.setState({
			username_med: medecin_username,
			loaded: true
		  });
		});
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
  
	locatePic(){
		let items = [];
		//ADDING NEW PATIENT
		//get listStyleTypetasksRef.on('value', (dataSnapshot) => {
		this.itemsRef.child('medecins').child('patients').on('value', (snap) => {

		  // get children as an array

		  snap.forEach((child) => {
			items.push({
			  nom: child.val().nom,
			  _key: child.key,
			  prenom: child.val().prenom,
			  _key: child.key,
			  date_de_naissance: child.val().date_de_naissance,
			  _key: child.key,
			  lieu: child.val().lieu,
			  _key: child.key,
			  profession: child.val().profession,
			  _key: child.key,
			  antecedents_personnels: child.val().antecedents_personnels,
			  _key: child.key,
			  antecedents_familiaux: child.val().antecedents_familiaux,
			  _key: child.key,
			  nombre_grain_de_beaute: child.val().nombre_grain_de_beaute,
			  _key: child.key,
			});
		  });

		});
		let patients=items;
		let patient_id=this.state.nom_pat.substring(0, 1)+this.state.prenom_pat.substring(0, 1)+patients.length;
		this.itemsRef.child('medecins/'+this.state.username_med).child('patients/'+patient_id).set({ 
		nom_pat: this.state.nom_pat, 
		prenom_pat: this.state.prenom_pat, 
		date_de_naissance_pat: this.state.dateNaissance_pat, 
		lieu_pat: this.state.lieu_pat, 
		profession_pat: this.state.profession_pat, 
		antecedents_personnels: this.state.antec_perso, 
		antecedents_familiaux: this.state.antec_fam, 
		nombre_grain_de_beaute: this.state.nbreGrain, 
		})
		alert("sucesss patient added");
	/* 	this.props.navigator.push({
          component: LocatePic
        }); */ 
	}
  goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	
	
  render() {
    return ( 
	<View>
	<HeaderUp text="1/4 Nouveau Patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<View style={styles.body2}>  
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({nom_pat: text})}
					value={this.state.nom_pat}
					placeholder={"Nom"}
					underlineColorAndroid="#53507c"/>
   
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({prenom_pat: text})}
					value={this.state.prenom_pat}
					placeholder={"Prénom"}
					underlineColorAndroid="#53507c"/>		 
				 <Grid>
					  <Col>
						<Text style={styles.date_de_naissance}>Date de naissance</Text>
					  </Col>
					  <Col>
					  	<DatePicker
							startY={1900}
							endY={2022}
							startM={1}
							
							/>
					  </Col>
				 </Grid>  
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({lieu_pat: text})}
					value={this.state.lieu_pat}
					placeholder={"Lieu de résidence"}
					underlineColorAndroid="#29235c"/>		 
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					onChangeText={(text) => this.setState({profession_pat: text})}
					value={this.state.profession_pat}
					placeholder={"Profession"}
					underlineColorAndroid="#29235c"/> 	
					
				<TextInput
					style={styles.textinput_new_patinet}
					placeholderTextColor="#29235c"
					keyboardType = 'numeric'
					placeholder={"Téléphone"}
					maxLength = {20}
					underlineColorAndroid="#53507c"/>	

				  <Grid>
					  <Col>
							<Text style={styles.a_a_n}>Antécédents personnel</Text>
					  </Col>
					  <Col style={{marginLeft:150}}>
							<Picker
								iosHeader="Select one"
								mode="dropdown"
								selectedValue={this.state.antec_perso}
								onValueChange={this.onValueChangePerso.bind(this)}>
								<Item label="oui" value="oui_antec_perso" />
								<Item label="non" value="non_antec_perso" />  
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
								<Item label="oui" value="oui_antec_fam" />
								<Item label="non" value="non_antec_fam" />  
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
				style={{flex:9,backgroundColor: "#29235c",width:200,height:40,marginLeft:80,marginBottom:30,marginTop:10,alignItems:'center'}}
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
  radioStyle: {
	/* borderRightWidth: 1,
    borderColor: '#2196f3',
    marginLeft: 50, */
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
	margin: 10
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
	margin:12
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('newPatient', () => newPatient);