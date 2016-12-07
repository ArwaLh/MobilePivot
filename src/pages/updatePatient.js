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
  TextInput,
  BackAndroid,
  TouchableHighlight,
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
import LocatePic from './locatePic';
import Icon from 'react-native-vector-icons/FontAwesome'; 
export default class updatePatient extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	uploadP(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
	  
    return (
   <View>
	<HeaderUp text="Rechercher un patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<View style={styles.body2}>
				<Text style={{fontFamily: 'Roboto', fontSize:16,color:'black', marginTop:15}}>
					  Ajouter et modifier des nouvelles données dans le dossier medical du patient
				</Text>
		</View>
		<View style={{margin:55}}>  
	         <Grid>
			    <Col>
					<InputGroup style={{width: 240}}>
						 <Input placeholder="rechercher un patient" />
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
			onPress={this.uploadP.bind(this)}
			style={styles.primary_button}
			textStyle={styles.primary_button_text}>Localiser Photo</Button>
		
    </ScrollView>
   </View>
    );
  }
}

AppRegistry.registerComponent('updatePatient', () => updatePatient);
