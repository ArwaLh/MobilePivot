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
	this.state={
		medecin_id:"",
		dataSource: new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		}),
		dataSource2: new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2,
		}),
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
			let items={};
			items=snap.val();
				this.setState({
				  medecin_id:Object.keys(items),
				  dataSource: this.state.dataSource.cloneWithRows(items),
				  dataSource2: this.state.dataSource2.cloneWithRows(Object.keys(items))
				});
			});
						
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
					  <Button style={{height:100}}  transparent>
							<Text style={styles.listViewCategorie}>{rowData.nom_categorie}</Text> 	
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
