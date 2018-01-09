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
import TakePic from './takePic';

const window = Dimensions.get('window');
export default class lastOne extends Component {
  constructor(props){
	super(props);
		this.goBack=this.goBack.bind(this);
 }	
 
  gestionF(){  
	this.props.navigator.push({ 
		 component: TakePic
	});
  }
  goBack() {
	this.props.navigator.pop();
	return true; // do not exit app
  }
  gestionP(){  
  this.props.navigator.pop();
	this.props.navigator.push({ 
		 component: TakePic
	});
  }
  render() {
    return (
	<View>
		<HeaderSearch text="Katomi" onpress={this.goBack}/>
		<Grid style={{height:100, width:400, marginLeft:35, marginTop:20}}> 
		    <Button onPress={this.gestionF.bind(this)} style={{width: 320,height:90, marginTop:50}} transparent>
				<Row>
				  <Col style={{width:65}}>
					<Icon name="camera" style={{color:'#29235c', fontSize:50}} />
				  </Col>
				  <Col style ={{width:300, marginTop:13}}>
					<Text style={{fontSize: 18,fontWeight:"bold", color:'#29235c'}}>Prendre une autre photo</Text> 
				  </Col>    
				</Row>	
			  </Button>			        
		</Grid>	
		<Grid>
		  <Row style={{width:300, height:300, margin:10, marginLeft:50, marginTop:220}}>
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
