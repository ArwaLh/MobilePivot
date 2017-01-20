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
import * as firebase from 'firebase';

export default class categories extends Component {
	constructor(props){
		super(props);
		this.itemsRef = firebase.database().ref();
	}
	goBack() {
		this.props.navigator.pop();
		return true;
	}
   gestionP(){
	 AsyncStorage.removeItem('id');  
	 AsyncStorage.setItem('id',"naevus");  
		this.props.navigator.push({ 
		 component: GestionPatient
		});
	}	
/* 	componentDidMount(){
		AsyncStorage.getItem('categories').then((categories)=>{
			let array_cat=JSON.parse(categories);
			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(array_cat)
			});
			
		});
	} */
  render() {
    return (
	<View>
	<Header text="Les categories" loaded={true}/>
	<Button onPress={this.gestionP.bind(this)}>	click me
	</Button>
		
     </View>
    );
  }
}

AppRegistry.registerComponent('categories', () => categories);
