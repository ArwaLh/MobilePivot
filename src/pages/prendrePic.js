import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  AppRegistry,
  Dimensions
} from 'react-native';
import TakePic from './takePic';
import Login from './login';
import {Button} from 'native-base';
import Header from '../components/header';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Col, Row, Grid } from "react-native-easy-grid";


import styles from '../styles/common-styles.js';

const window = Dimensions.get('window');

export default class prendrePic extends Component {
	
  constructor(props){
	super(props);
  }
  takePic(){  
	this.props.navigator.push({ 
		 component: TakePic
	});
  }  
  render() {
	return (
	<View>
		<Header text="Katomi" loaded={true}/>
		 <Button onPress={this.takePic.bind(this)} style={{width: 300,height:250, marginTop:140}} transparent>
			<Grid>
				<Row>
					<Icon name="camera" style={{color:'#29235c', fontSize:70, marginLeft:130}} />
				</Row>
				<Row>		   
					<Text style={{fontSize: 18,fontWeight:"bold", color:'#29235c', marginLeft:50}}>Prendre une photo du patient</Text> 
				</Row> 
			</Grid>
        </Button>		
    </View>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
	);
  }
}
AppRegistry.registerComponent('prendrePic', () => prendrePic);