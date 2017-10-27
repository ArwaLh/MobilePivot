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
import Header from '../components/header';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input,Card, CardItem, List, ListItem, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import UploadForm from './uploadForm';
import GestionNaevus from './gestionNaevus';
const window = Dimensions.get('window');
import firebase from 'firebase';

export default class categories extends Component {
  constructor(props){
	super(props);
	this.itemsRef = firebase.database().ref("categories");
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state={
	  medecin_id:"",
	  dataSource: ds.cloneWithRows(['row 1', 'row 2']),
	}
  }
  goBack() {
	this.props.navigator.pop();
	return true;
  }
  gestionP(id){
	let that = this;
 	AsyncStorage.getItem('med_pat_file_location').then((patient_medecin_arrayy) => {
		const arr=JSON.parse(patient_medecin_arrayy);
		that.itemsRef.child("medecins").child(arr.id_medecin).child("patients").child(arr.id_patient).child("dossier_medical").child(arr.id_dossier).child("motifs").child(arr.motif).update({
			categorie: id
		});  
 		that.props.navigator.push({ 
			 component: UploadForm
		}); 
	});
  }	 
  componentDidMount(){
	AsyncStorage.getItem('medecin_username').then((medecin_id)=>{
	  this.itemsRef.child(medecin_id).on('value', (snap) => {
	  //mapping
	  let array_cat=[];		
	  let items=[];
	  items=snap.val();
	  for (var k in items){
		if (items.hasOwnProperty(k)) {
			array_cat.push({"key":k,"value":items[k].nom_categorie});	
		}
	  }
	  this.setState({
		dataSource: this.state.dataSource.cloneWithRows(array_cat),
	  });
	  });
	});
  } 
  render() {
    return (
	<View>
	  <HeaderUp text="Les categories" loaded={true} onpress={this.goBack.bind(this)}/>
	  <ListView dataSource={this.state.dataSource}
		enableEmptySections={true}
        renderRow={(rowData) => 
		<List>
		  <ListItem style={{height:60, borderColor:'#29235c', width:340, paddingTop:0}}>
			<Button onPress={this.gestionP.bind(this,rowData.key)} style={{height:100}}  transparent>	
			  <Text style={styles.listViewCategorie}>{rowData.value}</Text> 	
			</Button>
		  </ListItem>
		</List>
	  } style={{backgroundColor: 'white'}}/>	
     </View>
    );
  }
}

AppRegistry.registerComponent('categories', () => categories);
