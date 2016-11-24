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
  Picker,
  ScrollView,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;

export default class validMeta extends Component {
	constructor (props) {
    super(props);
    this.state = {
	loaded:true,
      types1: [{label: 'Régulier', value: 0}, {label: 'Irrégulier', value: 1}],
      value1: 0,
      value1Index: 0,
      types2: [{label: 'Brun foncé', value: 0}, {label: 'Brun clair', value: 1}],
      value2: 0,
      value2Index: 0,
      types3: [{label: 'Oui', value: 0}, {label: 'Non', value: 1}],
      value3: 0,
      value3Index: 0,
	  chickenWings: 1.5,
	   value: 1.0,
		selected1: 'key1',
		selected2: 'key1',
		selected3: 'key1',
		color: 'red',
		mode: Picker.MODE_DIALOG,
    }
  }
  goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
  render() {
    return ( 
	<View>
	<HeaderUp text="Meta Data" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
<ScrollView>	
  <Card>
    <CardItem style={styles.body2}>
	 <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:60, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Bords</Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem>	
	  <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:60, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Couleur</Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem> 
	  <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Asymétrie</Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem>	
	  <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Phototype</Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem>	 
	 <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Diamètre</Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem> 
	  <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Suspicion</Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem>	
	  <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Antécédents dans la famille </Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem> 
	<ListItem>
			<Grid>
				<Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Nombre de grain de beauté</Text>
				</Col>
				<Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
				</Col>
			</Grid>
			</ListItem>	
	 <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>Phototype </Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem> 
	   <ListItem>   
	      <Grid>
              <Col>
					<Text style={{width:160, fontFamily: 'Arial', fontSize:14,color:'black', marginTop:10}}>SED </Text>
			  </Col>
              <Col>
					 <InputGroup borderType='regular'>
							<Input placeholder=''/>
					 </InputGroup> 
			 </Col> 
           </Grid>			 
	  </ListItem> 
	  
				
			<Button
				style={{flex:9,backgroundColor: "#53507c",width:200,height:40,marginLeft:80,marginBottom:50,alignItems:'center'}}
				textStyle={{fontSize: 18, color:'#fff',fontWeight:"bold"}}>Envoyer</Button>
     </CardItem>
  </Card>
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
  radioStyle: {
	/* borderRightWidth: 1,
    borderColor: '#2196f3',
    marginLeft: 50, */
  },
  radioButtonWrap: {
    marginRight: 30,
	
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('validMeta', () => validMeta);