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
import { Col, Row, Grid } from "react-native-easy-grid";

export default class lastOne extends Component {
	constructor(props){
    super(props);
	}	     
  render() {
    return (
	<View>
		<Header text="Katomi SKIN" loaded={true}/>
		<Image style={styles.image_last_one} source={{uri:'http://localhost:8081/img/last.png'}}/>
		<Text style={styles.text_last_one}> Rendez-vous sur notre site {"\n"}web Katomi </Text>			
		<Text style={styles.text_last_one_link}
			onPress={() => Linking.openURL('https://osereso.tn/')}>
		  ACCEDER AU SITE KATOMI 
		</Text>
		<Hr lineColor='black'  textColor='#29235c' line={{width:10}}/>	
		<Grid>
		  <Row style={{width:300, height:300, margin:10, marginLeft:50, marginTop:20}}>
			<Col style={{width:100, height:50}}><Icon name="smile-o" style={{color:'#29235c', fontSize:60}} /></Col>
			<Col style={{width:100, height:200}}><Text style={{fontFamily:'Roboto', fontSize:30, color:'#29235c', fontWeight:'bold', marginTop:10}}> OU </Text></Col>
			<Col style={{width:100, height:50}}><Icon name="frown-o" style={{color:'#29235c', fontSize:60}} /></Col>
		  </Row>	
		</Grid>
		<Text style={styles.text_last_one_link2}
			onPress={() => Linking.openURL('https://chiraz54.typeform.com/to/ZQXS3G')}>
		cliquez ici pour  donner votre avis  
		</Text>
     </View>
    );
  }
}

AppRegistry.registerComponent('lastOne', () => lastOne);
