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
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button,Header} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;

export default class uploadForm extends Component {
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
  render() {
    return ( 
	<ScrollView>
	<Header style={{backgroundColor: '#53507c',height:100,padding:10}}>
		<Text style={styles.title_upload}>
			Upload photo
		</Text>
	</Header>	
		  <View style={{margin: 30}}>
			<RadioForm
				formHorizontal={true}
				animation={true}>
				<Text style={styles.bords}>Bords</Text>
				{this.state.types1.map((obj, i) => {
				  var that = this;
				  var is_selected = this.state.value1Index == i;
				  return (
					<View key={i} style={{marginRight: 25, paddingLeft:35}}>
					  <RadioButton
						isSelected={is_selected}
						obj={obj}
						index={i}
						labelHorizontal={false}
						buttonColor={'#53507c'}
						buttonSize={10}
						labelColor={'#000'}
						onPress={(value, index) => {
      					  this.setState({value1Index: index});
						}}
					  />
					</View>
				  )
				})}
			</RadioForm>
			<RadioForm
				formHorizontal={true}
				animation={true}>
				<Text style={styles.couleur}>Couleur</Text>
				{this.state.types2.map((obj, i) => {
				  var that = this;
				  var is_selected = this.state.value2Index == i;
				  return (
					<View key={i} style={{marginRight: 30, paddingLeft:16}}>
					  <RadioButton
						isSelected={is_selected}
						obj={obj}
						index={i}
						labelHorizontal={false}
						buttonColor={'#53507c'}
						buttonSize={10}
						labelColor={'#000'}
						onPress={(value, index) => {
						  this.setState({value2Index: index});
						}}
					  />
					</View>
				  )
				})}
			</RadioForm>
			<RadioForm
				formHorizontal={true}
				animation={true}>
				<Text style={styles.asymetrie}>Asymétrie</Text>
				{this.state.types3.map((obj, i) => {
				var that = this;
				var is_selected = this.state.value3Index == i;
				return (
					<View key={i} style={{paddingLeft:25,marginRight: 60}}>
					  <RadioButton
						isSelected={is_selected}
						obj={obj}
						index={i}
						labelHorizontal={false}
						buttonColor={'#53507c'}
						buttonSize={10}
						labelColor={'#000'}
						onPress={(value, index) => {
						  this.setState({value3Index: index});
						}}
					  />
					</View>
				)
				})}
			</RadioForm>
			<View style={{flexDirection:'row', flexWrap:'wrap'}}>
					<Text style={styles.phototype}>Phototype</Text>

					<Button
						style={{borderColor: "#53507c",width:200,height:40,marginLeft:30}}
						textStyle={{fontSize: 18, color:'#53507c',fontWeight:"bold"}}
						bordered>Choisir phototype</Button>
			</View>
			<Grid>
				<Col>
					<Text style={styles.diametre}>Diamètre</Text>
				</Col>
				<Col>
					<Picker
						style={styles.picker}
						selectedValue={this.state.selected1}
						onValueChange={this.onValueChange.bind(this, 'selected1')}>
							<Item label="0,2" value="key0" />
							<Item label="1.3" value="key1" />
							<Item label="2.3 " value="key2" />
							<Item label="4.3 mm" value="key3" />
							<Item label="5.2 mm" value="key4" />
							<Item label="6 mm" value="key5" />	
							<Item label="0,2" value="key0" />
							<Item label="1.3" value="key1" />
							<Item label="2.3 " value="key2" />
							<Item label="4.3 mm" value="key3" />
							<Item label="5.2 mm" value="key4" />
							<Item label="6 mm" value="key5" />	
							<Item label="1.3" value="key1" />
							<Item label="2.3 " value="key2" />
							<Item label="4.3 mm" value="key3" />
							<Item label="5.2 mm" value="key4" />
							<Item label="6 mm" value="key5" />	
							
					</Picker>
				</Col>
			</Grid>			
			<Text style={styles.suspicion}>Suspicion</Text>
			<Text style={styles.melanome}> Mélanome: {this.state.value}</Text>
			<Slider
				value={this.state.value}
				style={styles.slidee}
				onValueChange={(value) => this.setState({value})} />
		  </View> 
    </ScrollView> 
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
  suspicion: {
	color: 'black',
	textAlign: 'left',
	padding:0,
	justifyContent: 'flex-start',
	fontFamily: 'Arial',
	fontSize: 15    
  },
  melanome: {
	color: 'black',
	textAlign: 'right',
	bottom:20,
	justifyContent: 'flex-end',
	marginRight:20  	  
  },
  slidee: {
	marginLeft: 60,
	marginRight: 60  
  },
  diametre: {
	color: 'black',
	fontFamily: 'Arial',
	fontSize: 15   
  },
  asymetrie: {
	color: 'black',
	fontFamily: 'Arial',
	fontSize: 15  
  },
  couleur: {
    color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginBottom:35  
  },
  phototype: {
	marginTop:10,
	fontFamily: 'Arial',
	marginBottom:30,
	fontSize: 15,
	color:"#000"
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  height:40,
	  fontWeight:'bold'
  },
  bords: {
    color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginBottom:35}
});

AppRegistry.registerComponent('uploadForm', () => uploadForm);