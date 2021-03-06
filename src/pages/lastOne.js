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
import HeaderSearch from '../components/headerSearch';
import styles from '../styles/common-styles.js';
import Hr from 'react-native-hr';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import {Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import TakePic from './rechercheP';

const window = Dimensions.get('window');
export default class lastOne extends Component {
  constructor(props){
	super(props);
		this.goBack=this.goBack.bind(this);
 }	
  goBack() {
	this.props.navigator.pop();
	return true; // do not exit app
  }
  
  render() {
    return (
	<View>
		<HeaderSearch text="Katomi" onpress={this.goBack}/>
		<Grid>
		  <Row style={{width:300, height:300, marginLeft:50, marginTop:130}}>
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
