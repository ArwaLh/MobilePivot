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
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem, Picker} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;

import firebase from 'firebase';
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
                  } 
	}}
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
		let patient_id=this.state.nom.substring(0, 1)+this.state.prenom.substring(0, 1)+patients.length;
		this.itemsRef.child('medecins').child('patients/'+patient_id).set({ 
		nom: this.state.nom, 
		prenom: this.state.prenom, 
		date_de_naissance: this.state.dateNaissance, 
		lieu: this.state.lieu, 
		profession: this.state.profession, 
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
	<HeaderUp text="Nouveau Patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<View style={styles.body2}>
			 <ListItem>   
				<TextInput
					style={styles.textinput}
					placeholderTextColor="#000"
					onChangeText={(text) => this.setState({nom: text})}
					value={this.state.nom}
					placeholder={"Nom"}
					underlineColorAndroid="#53507c"/>
			</ListItem>	
			<ListItem>   
				<TextInput
					style={styles.textinput}
					placeholderTextColor="#000"
					onChangeText={(text) => this.setState({prenom: text})}
					value={this.state.prenom}
					placeholder={"Prénom"}
					underlineColorAndroid="#53507c"/>		 
			</ListItem> 
			<ListItem>   
				<TextInput
					style={styles.textinput}
					placeholderTextColor="#000"
					onChangeText={(text) => this.setState({dateNaissance: text})}
					value={this.state.dateNaissance}
					placeholder={"Date de naissance"}
					underlineColorAndroid="#53507c"/>			 
			</ListItem>	
			<ListItem>   
				<TextInput
					style={styles.textinput}
					placeholderTextColor="#000"
					onChangeText={(text) => this.setState({lieu: text})}
					value={this.state.lieu}
					placeholder={"Lieu de résidence"}
					underlineColorAndroid="#53507c"/>		 
			</ListItem>	 
			<ListItem>   
				<TextInput
					style={styles.textinput}
					placeholderTextColor="#000"
					onChangeText={(text) => this.setState({profession: text})}
					value={this.state.profession}
					placeholder={"Profession"}
					underlineColorAndroid="#53507c"/> 		 
			  </ListItem> 
			  <ListItem>   
				  <Grid>
					  <Col>
							<Text style={{width:160, fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:10}}>Antécédents personnel</Text>
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
			  </ListItem>	
			  <ListItem>   
				  <Grid>
					  <Col>
							<Text style={{width:160, fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:10}}>Antécédents familiaux </Text>
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
			</ListItem> 
			<ListItem>
				<Grid>
					<Col>
						<Text style={{width:160, fontFamily: 'Roboto', fontSize:14,color:'black', marginTop:10}}>Nombre de grain de beauté</Text>
					</Col>
					<Col style={{marginLeft:140}}>
						<Picker
							iosHeader="Select one"
							mode="dropdown"
							selectedValue={this.state.nbreGrain}
							onValueChange={this.onValueChangeNbreGrain.bind(this)}>
							<Item label="> 50" value="sup" />
							<Item label="< 50" value="inf" />  
						</Picker>
					</Col>
				</Grid>
			</ListItem>	
			<Button
				onPress={this.locatePic.bind(this)}
				style={{flex:9,backgroundColor: "#53507c",width:200,height:40,marginLeft:80,marginBottom:50,marginTop:30,alignItems:'center'}}
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
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('newPatient', () => newPatient);