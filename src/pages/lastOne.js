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
const window = Dimensions.get('window');
export default class lastOne extends Component {
	constructor(props){
    super(props);
	}	     
  render() {
    return (
	<View>
		<Header text="Katomi" loaded={true}/>
		<Image style={{height: window.height-570, width:((window.width)/2)+60, marginLeft: ((window.width)/5)-15,marginRight: ((window.width)/5)-15, marginTop:(window.height)-600, marginBottom:(window.height)-620}} source={{uri:'http://localhost:8081/img/katomi_violet_mobile.png'}}/>
		<Text style={styles.text_last_one}> Rendez-vous sur notre site {"\n"}web Katomi </Text>			
		<Text style={styles.text_last_one_link}
			onPress={() => Linking.openURL('https://katomi.co/')}>
		  ACCEDER AU SITE KATOMI 
		</Text>
		<Hr lineColor='black'  textColor='#29235c' line={{width:10}}/>	
		<Grid>
		  <Row style={{width:300, height:300, margin:10, marginLeft:50, marginTop:40}}>
			<Col style={{width:100, height:50}}><Icon name="smile-o" style={{color:'#29235c', fontSize:60}} /></Col>
			<Col style={{width:100, height:200}}><Text style={{fontFamily:'Roboto', fontSize:30, color:'#29235c', fontWeight:'bold', marginTop:10}}> OU </Text></Col>
			<Col style={{width:100, height:50}}><Icon name="frown-o" style={{color:'#29235c', fontSize:60}} /></Col>
		  </Row>	
		</Grid>
		<Text style={styles.text_last_one_link2}
			onPress={() => Linking.openURL('https://chiraz54.typeform.com/to/Bkbkkw')}>
		cliquez ici pour  donner votre avis
		</Text>
     </View>
    );
  }
}

AppRegistry.registerComponent('lastOne', () => lastOne);
