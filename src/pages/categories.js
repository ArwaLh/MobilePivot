/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  ScrollView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  ListView,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input,Card, CardItem, List, ListItem, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import GestionPatient from './gestionPatient';
const window = Dimensions.get('window');
import firebase from 'firebase';

export default class categories extends Component {
	constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
		  dataSource: ds.cloneWithRows(['row 1', 'row 2'])
		}
	}
	componentWillMount(){
		AsyncStorage.getItem('user_data').then((email)=>{
			alert("email");
			alert(email);
		this.itemsRef.child('medecins').orderByChild('email_medecin').equalTo(email).once("child_added", function(snapshot) {
			AsyncStorage.setItem('medecin_username', snapshot.key);
		});
		});
		AsyncStorage.getItem('medecin_username').then((medecin_id)=>{

			this.itemsRef.child('medecins').child("chiraz3").child('categories').on('value', (snap) => {
			let items={};
			items=snap.val();
				this.setState({
				  medecin_id:Object.keys(items)
				});
			});
						
		});
	}
	ajoutPat(){
		this.props.navigator.push({
          component: NewPatient
        });
	}
	modPat(){
		this.props.navigator.push({
          component: RechercheP
        }); 
	}
	upl(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}	
	goBack() {
		this.props.navigator.pop();
		return true;
	}
   gestionP(){
		this.props.navigator.push({
		 component: GestionPatient
		});
	}	
  render() {
    return (
	<View>
	<Header text="Les categories" loaded={true}/>
		<Text>{this.state.medecin_id}</Text>
     </View>
    );
  }
}

AppRegistry.registerComponent('categories', () => categories);
