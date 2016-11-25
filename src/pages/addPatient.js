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
  TouchableHighlight,
  View
} from 'react-native';
import HeaderOther from '../components/headerOther';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import {InputGroup, Input, Button, Card, CardItem, Header, List, ListItem} from 'native-base';

import UploadForm from './uploadForm';
import NewPatient from './newPatient';
import LocatePic from './locatePic';
import UpdatePatient from './updatePatient';
import Icon from 'react-native-vector-icons/FontAwesome'; 
export default class addPatient extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	oui(){
		this.props.navigator.push({
          component: NewPatient
        });
	}
	non(){
		this.props.navigator.push({
          component: UpdatePatient
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Gestion des patients" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView> 
		 <View>
		 <List>
		
		 <ListItem>
		   <Grid>
		      <Col><Icon name="search" /></Col>
			    <Col>
					<Text style={{width:220, fontFamily: 'Roboto', fontSize:18, color:'#29235c'}}>Ajouter un patient</Text>
				</Col>
			</Grid> 
		 </ListItem>
		  
		  </List>	
	  </View>	

    </ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('addPatient', () => addPatient);
