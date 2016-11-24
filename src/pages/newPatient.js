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
  Picker,
  ScrollView,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, InputGroup, Input} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;

export default class newPatient extends Component {
	constructor (props) {
    super(props);
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
		selected1: 'key1',
		selected2: 'key1',
		selected3: 'key1',
		color: 'red',
		mode: Picker.MODE_DIALOG,
    }
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
				<Text style={{fontFamily: 'Arial', fontSize:17,color:'black',textAlign: 'left',marginLeft:10}}>Nom</Text>
				 <TextInput
					style={styles.textinput}
					value={this.state.nom}
					underlineColorAndroid="black"
				  />
				<Text style={{fontFamily: 'Arial', fontSize:17,color:'black',textAlign: 'left',marginLeft:10}}>Prénom</Text>
				<TextInput
					style={styles.textinput}
					value={this.state.prenom}
					underlineColorAndroid="black"
				  />
				<Text style={{fontFamily: 'Arial', fontSize:17,color:'black',textAlign: 'left',marginLeft:10}}>Date de naissance</Text>
				<TextInput
					style={styles.textinput}
					value={this.state.date_naissance}
					underlineColorAndroid="black"
				  />
				  <Text style={{fontFamily: 'Arial', fontSize:17,color:'black',textAlign: 'left',marginLeft:10}}>Profession</Text>
				<TextInput
					style={styles.textinput}
					value={this.state.profession}
					underlineColorAndroid="black"
				  />
				<Text style={{fontFamily: 'Arial', fontSize:17,color:'black',textAlign: 'left',marginLeft:10}}>Antécédents personnels</Text>
				<TextInput
					style={styles.textinput}
					value={this.state.antecedent_personnel}
					underlineColorAndroid="black"
				  />
				<Text style={{fontFamily: 'Arial', fontSize:17,color:'black',textAlign: 'left',marginLeft:10}}>Antécédents dans la famille</Text>
				<TextInput
					style={styles.textinput}
					value={this.state.antecedent_famille}
					underlineColorAndroid="black"
				  />
				<Text style={{fontFamily: 'Arial', fontSize:17,color:'black',textAlign: 'left',marginLeft:10}}>Nombre de grain de beauté</Text>
				<TextInput
					style={styles.textinput}
					value={this.state.nbre_grain_beaute}
					underlineColorAndroid="black"
				  />
			<Button
				style={{flex:9,backgroundColor: "#53507c",width:200,height:40,marginLeft:80,marginBottom:50,alignItems:'center'}}
				textStyle={{fontSize: 18, color:'#fff',fontWeight:"bold"}}>Valider</Button>
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
  suspicion: {
	color: 'black',
	textAlign: 'left',
	padding:0,
	marginLeft:20,
	marginTop:30,
	fontFamily: 'Arial',
	fontSize: 15    
  },
  melanome: {
	color: 'black',
	textAlign: 'right',
	bottom:30,
	position: 'relative',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,
	marginRight:20  	  
  },
  slidee: {
	marginLeft: 60,
	marginRight: 60  
  },
  diametre: {
	color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,	
	marginBottom:15,	
  },
  asymetrie: {
	color: 'black',
	fontFamily: 'Arial',
	marginTop:10,
	fontSize: 15  
  },
  couleur: {
    color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,
	marginBottom:15  
  },
  phototype: {
	marginTop:10,
	fontFamily: 'Arial',
	marginBottom:15,
	fontSize: 15,
	color:"#000"
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
	  fontWeight:'bold'
  },
  bords: {
    color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,
	marginBottom:15}
});

AppRegistry.registerComponent('newPatient', () => newPatient);