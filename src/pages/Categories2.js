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
import HeaderSearch from '../components/headerSearch';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input,Card, CardItem, List, ListItem, Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import GestionPatient from './gestionPatient';
import LastOne from './lastOne';
const window = Dimensions.get('window');
import firebase from 'firebase';
import Autocomplete from 'react-native-autocomplete-input';
export default class Categories2 extends Component {
	constructor(props){
		super(props);
		this.itemsRef = firebase.database().ref("categories");
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state={
			categories_array: [],
			query: '',
			id: '',
			medecin_id:"",
			dataSource: ds.cloneWithRows(['row 1', 'row 2']),
		}
		this.gestionPatient=this.gestionPatient.bind(this);
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
 	componentDidMount(){
		//asynchronous storage for medecin id
		/* AsyncStorage.getItem('medecin_username').then((medecin_usernamee) => {
			this.setState({
				username_med:medecin_usernamee
			});
		//get patients list
		this.itemsRef.child('medecins').child(medecin_usernamee).child("patients").on('value', (snap) => {
				let items=[];
				// get children as an array
				snap.forEach((child) => {
					items.push({
						nom_pat: child.val().nom_pat,
						prenom_pat: child.val().prenom_pat,
						telephone_patient: child.val().telephone_patient,
						_key: child.key,
					});
				});
				//const patients_array = items;
				const patients_array = items; 
				this.setState({ patients_array });
			});
		}); */	
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
				const categories_array =array_cat; 
				this.setState({ categories_array });
			});
			
		});
   }
	findCategory(query) {
	//this method is called whenever the user is typing
    if (query === '') {
      return [];
    }
    const { categories_array } = this.state;	
    const regex1 = new RegExp(`${query.trim()}`, 'i');
    //const regex2 = new RegExp(`${query.trim()}.substr(${query.trim()}.indexOf(' ')+1)`, 'i');
	//str.substr(0,str.indexOf(' '));
    return categories_array.filter(categorie => categorie.value.search(regex1) >= 0);
  }
  	gestionPatient(){
		let categorie_id='';
		AsyncStorage.getItem('medecin_username').then((medecin_id)=>{
		this.itemsRef.orderByChild('nom_categorie').equalTo(this.state.query).once("child_added", function(snapshot) {
			categorie_id=snapshot.key;
		});
		AsyncStorage.setItem("medecin_patient",JSON.stringify({"medecin_id":this.state.username_med,"categorie":categorie_id}));
		this.props.navigator.push({
        component: GestionPatient
        }); 
        }); 
	}
  render() {
   const { query } = this.state;
    const categories_array = this.findCategory(query);
    const comp = (s, s2) => s.toLowerCase().trim() === s2.toLowerCase().trim();
    return (
	 <View style={styles.firstContainer}>
		<HeaderSearch text="Rechercher une catégorie" onpress={this.goBack}/>
        <Autocomplete
			ref="autocomplete"
			autoCapitalize="none"
			autoCorrect={false}
			containerStyle={styles.autocompleteContainer}
			inputContainerStyle={styles.autocompleteInput}
			data={categories_array.length === 1 && comp(query, categories_array[0].value) ? [] : categories_array}
			defaultValue={query}
			onChangeText={text => this.setState({ query: text })}
			placeholder="Nom catégorie"
			renderItem={({ value }) => (
			  <List>
			  <ListItem>
				<Button onPress={() => {this.setState({ query:value})}} transparent>
				  <Text style={styles.itemText}> {value}
				  </Text>
				</Button>
			  </ListItem>
			  </List>
				)}
		/>	
		<Button
			onPress={this.gestionPatient}
			style={styles.primary_button_naevus}
			textStyle={styles.primary_button_text}>Gérer les patients</Button>
      </View>
    );
  }
  }

AppRegistry.registerComponent('Categories2', () => Categories2);
