/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input,Card, CardItem, List, ListItem} from 'native-base';

import UploadForm from './uploadForm';
import NewPatient from './newPatient';
import LocatePic from './locatePic';
import RecherchePatient from './recherchePatient';
import RechercheP from './rechercheP';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Button from 'react-native-animated-button';
const window = Dimensions.get('window');
export default class categories extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
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
  render() {
    return (
	<View>
	<Header text="Les categories" loaded={this.state.loaded}/>
		 <View>
			 <Button
					style={{marginTop:10,alignSelf:'center', height: 55,width:260, backgroundColor: 'white', borderWidth: 1 , borderColor: '#29235c', borderRadius: 5}}
					activeStyle={{marginTop:10,alignSelf:'center',height: 55,width:100, backgroundColor: 'white', borderWidth: 1, borderColor: '#29235c', borderRadius: 5}}
					text="Grain de beauté"
					animated={true}
					type="iconBottom"
					onLongPress={() => {
				  console.log('onLongPress...');
				}}
					onPress={() => {
				  console.log('onPress...');
				}}
					onPressIn={() => {
				  console.log('onPressIn...');
				}}
					onPressOut={() => {
				  console.log('onPressOut...');
				}}
            >
				</Button>
	  </View>	
     </View>
    );
  }
}

AppRegistry.registerComponent('categories', () => categories);
