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
import {InputGroup, Input, Button, Card, CardItem, Header} from 'native-base';
import UploadForm from './uploadForm';
import ValidMeta from './validMeta';
import TakePic from './takePic';
import NewPatient from './newPatient';
import GestionNaevus from './gestionNaevus';
import LocatePic from './locatePic';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import Autocomplete from 'react-native-autocomplete-input';
export default class recherchePatient extends Component {
	constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
		this.state = {
		  loaded: true,
		  items_pat: [],
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
   }
  render() {
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
					  -Saisissiez le nom et prénom du patient
					  -Saisissiez le dossier patient
				</Text>
		</View>
		<View style={{margin:55,marginBottom:40}}>  
	         <Grid>
			    <Col>
					<InputGroup style={{width: 240}}>
						 <Input placeholder="Nom Prénom" style={{color:"#29235c"}}/>
                    </InputGroup>
				</Col>
				<Col>   
				 <Button transparent style={{width: 200}}>
						<Icon name="search" />
                    </Button>
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

AppRegistry.registerComponent('recherchePatient', () => recherchePatient);
