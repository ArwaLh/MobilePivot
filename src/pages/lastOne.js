/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  Dimensions,
  Text,
  Image,
  Linking,
  View
} from 'react-native';
import Header from '../components/header';
import styles from '../styles/common-styles.js';
import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import TakePic from './takePic';

const window = Dimensions.get('window');
export default class lastOne extends Component {
  constructor(props){
	super(props);
 }	
   gestionF(){  
	this.props.navigator.push({ 
		 component: TakePic
	});
/* 	    AsyncStorage.getItem('id').then((idd)=>{
		  that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).child('images').child(image_id).set(array_all);		  
		  alert("Upload Terminé",downloadURL);
		});    */
  }
  gestionP(){  
	this.props.navigator.push({ 
		 component: TakePic
	});
  }
  render() {
    return (
	<View>
		<Header text="Katomi" loaded={true}/>
		<Grid style={{height:100, width:400, marginLeft:50, marginTop:30}}> 
		    <Button onPress={this.gestionF.bind(this)} style={{width: 320,height:90}} transparent>
				<Row>
				  <Col style={{width:65}}>
					<Icon name="camera" style={{color:'#29235c', fontSize:50}} />
				  </Col>
				  <Col style ={{width:300}}>
					<Text style={{fontSize: 18,fontWeight:"bold", color:'#29235c'}}>Prendre une photo{"\n"}du même patient</Text> 
				  </Col>
				</Row>	
			  </Button>			        
		</Grid>	
		<Grid style={{height:100, width:400, marginLeft:50}}> 
		    <Button onPress={this.gestionP.bind(this)} style={{width: 320,height:90}} transparent>
				<Row>
				  <Col style={{width:65}}>
					<Icon name="camera" style={{color:'#29235c', fontSize:50}} />
				  </Col>
				  <Col style ={{width:300}}>
					<Text style={{fontSize: 18,fontWeight:"bold", color:'#29235c'}}>Prendre une photo{"\n"}d'un autre patient</Text> 
				  </Col>
				</Row>	
			  </Button>			 
		</Grid>
		<Hr lineColor='black'  textColor='#29235c' line={{width:10}}/>	
		<Grid>
		  <Row style={{width:300, height:300, margin:10, marginLeft:50, marginTop:40}}>
			<Col style={{width:100, height:50}}><Icon name="smile-o" style={{color:'#29235c', fontSize:60}} /></Col>
			<Col style={{width:100, height:200} }><Text style={{fontFamily:'Roboto', fontSize:30, color:'#29235c', fontWeight:'bold', marginTop:10}}> OU </Text></Col>
			<Col style={{width:100, height:50}}><Icon name="frown-o" style={{color:'#29235c',fontSize:60}} /></Col>
		  </Row>	
		</Grid>
		<Text style={styles.text_last_one_link2}
			onPress={() => Linking.openURL('https://katomi.typeform.com/to/Q2JNzb')}>
		Cliquez ici pour donner votre avis
		</Text>
				<Text style={styles.text_last_one_link}
			onPress={() => Linking.openURL('https://katomi.co/')}>
		  ACCEDER AU SITE KATOMI 
		</Text>
     </View>
    );
  }
}

AppRegistry.registerComponent('lastOne', () => lastOne);
