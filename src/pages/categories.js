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
import LastOne from './lastOne';
const window = Dimensions.get('window');
import firebase from 'firebase';

export default class categories extends Component {
	constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state={
		medecin_id:"",
		dataSource: ds.cloneWithRows(['row 1', 'row 2']),
	}
	}
	componentWillMount(){
		AsyncStorage.getItem('user_data').then((email)=>{
/* 			alert("email");
			alert(email); */
		this.itemsRef.child('medecins').orderByChild('email_medecin').equalTo(email).once("child_added", function(snapshot) {
			AsyncStorage.setItem('a', snapshot.key);
		});
		});
		AsyncStorage.getItem('medecin_username').then((medecin_id)=>{
			this.itemsRef.child('medecins').child(medecin_id).child('categories').on('value', (snap) => {
			//mapping
			let array_cat=[];		
			let items=[];
			items=snap.val();
			for (var k in items){
				if (items.hasOwnProperty(k)) {
					 //alert("Key is " + k + ", value is" + items[k]);
					 array_cat.push({"key":k,"value":Object.values(items[k])});
					
				}
			}
			 alert(array_cat[1].key);
			keys=[];
			keys=Object.keys(items);
				this.setState({
				  dataSource: this.state.dataSource.cloneWithRows(array_cat),
				});
			});
			
		});
	}
	goBack() {
		this.props.navigator.pop();
		return true;
	}
   gestionP(id){
	   AsyncStorage.setItem('id',id);
		this.props.navigator.push({
		 component: GestionPatient
		});
	}
	last(){
		this.props.navigator.push({
		 component: LastOne
		});
	}	
  render() {
    return (
	<View>
	<Header text="Les categories" loaded={true}/>
		<ListView dataSource={this.state.dataSource}
		enableEmptySections={true}
        renderRow={(rowData) => 
					<List>
					  <ListItem style={{height:100, borderColor:'#29235c', width:340, paddingTop:0}}>
					  <Button onPress={this.gestionP.bind(this,rowData.key)} style={{height:100}}  transparent>
							<Text style={styles.listViewCategorie}>{rowData.key}</Text> 	
							<Text style={styles.listViewCategorie}>{rowData.value.nom_categorie}</Text> 	
					  </Button>
					  </ListItem>
					</List>
					} style={{backgroundColor: 'white'}}/>		
		<Button
			onPress={this.last.bind(this)}
			style={styles.send_button_valid_meta}
			textStyle={{fontSize: 15, color:'#fff'}}>To Last interface</Button>
     </View>
    );
  }
}

AppRegistry.registerComponent('categories', () => categories);
