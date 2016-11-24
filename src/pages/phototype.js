/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class phototype extends Component {
	constructor (props) {
    super(props);
    this.state = {
	loaded:true, 
    }
  }
  goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
  render() {
    return ( 
	<View>
	  <HeaderUp text="Phototype" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
		<ScrollView>	
		  <List>
		     <ListItem>
				  <Grid>
					 <Col style={{ border: 1, borderColor:'black'}}>
							<Text>Nom</Text>
					  </Col>
					   <Col>
							<Text>Nom</Text>
					  </Col>
					   <Col>
							<Text>Nom</Text>
					  </Col>
				</ListItem>		
			 </Grid>
		  </List>
		  
		</ScrollView>   
	</View>
    );
  }
   onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  component: {
   marginBottom: 15,
   marginLeft: 20,
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('phototype', () => phototype);