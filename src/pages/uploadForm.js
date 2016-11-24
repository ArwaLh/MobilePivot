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
  BackAndroid,
  AsyncStorage,
  Platform,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
const Item = Picker.Item;
const testImageName = `patient-pic-${Platform.OS}-${new Date()}.jpg`
const EMAIL = 'arwa.louihig@esprit.tn'
const PASSWORD = 'arwa24961322'
import * as firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const dirs = RNFetchBlob.fs.dirs
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
			path:AsyncStorage.getItem("path"),
		}
	}
	componentWillMount(){

    AsyncStorage.getItem('path').then((pathUp) => {                                                   
      this.setState({
        path: JSON.parse(pathUp),
        loaded: true
      });
	  alert(pathUp);
    });

  }
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	uploadPic(){
		let rnfbURI = RNFetchBlob.wrap(this.state.path);
		// create Blob from file path
		Blob
			.build(rnfbURI, { type : 'image/jpg;'})
			.then((blob) => {
			  // upload image using Firebase SDK
			  var uploadTask= firebase.storage()
				.ref('images')
				.child(testImageName)
				.put(blob, { contentType : 'image/jpg' });
				uploadTask.on('state_changed', function(snapshot){
				  // Observe state change events such as progress, pause, and resume
				  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					let progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					alert("progress");
					alert(progress);
				}, function(error) {
				  alert("error iuploading");
				}, function() {
				  // Handle successful uploads on complete
				  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
				  var downloadURL = uploadTask.snapshot.downloadURL;
				  alert("done uploading here is the download URL",downloadURL);
				  blob.close()
				});
			}) 
	}
  render() {
    return ( 
	<View>
	<HeaderUp text="Upload Photo" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		  <List>
            <ListItem>
			<RadioForm
				formHorizontal={true}
				animation={true}>
				<Text style={styles.bords}>Bords</Text>
				{this.state.types1.map((obj, i) => {
				  var that = this;
				  var is_selected = this.state.value1Index == i;
				  return (
					<View key={i} style={{marginRight: 25, paddingLeft:39}}>
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
			</ListItem>
            <ListItem>
			<RadioForm
				formHorizontal={true}
				animation={true}>
				<Text style={styles.couleur}>Couleur</Text>
				{this.state.types2.map((obj, i) => {
				  var that = this;
				  var is_selected = this.state.value2Index == i;
				  return (
					<View key={i} style={{marginRight: 30, paddingLeft:20}}>
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
            </ListItem>
            <ListItem>
			<RadioForm
				formHorizontal={true}
				animation={true}>
				<Text style={styles.asymetrie}>Asymétrie</Text>
				{this.state.types3.map((obj, i) => {
				var that = this;
				var is_selected = this.state.value3Index == i;
				return (
					<View key={i} style={{paddingLeft:29,marginRight: 60}}>
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
            </ListItem>
            <ListItem>

			<View style={{flexDirection:'row', flexWrap:'wrap'}}>
				<Text style={styles.phototype}>Phototype</Text>
				<Button
					style={{borderColor: "#53507c",width:200,height:40,marginLeft:30}}
					textStyle={{fontSize: 18, color:'#53507c',fontWeight:"bold"}}
					bordered>Choisir phototype</Button>
			</View>
			</ListItem>
			<ListItem>
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
			</ListItem>						
			<Text style={styles.suspicion}>Suspicion</Text>
			<Text style={styles.melanome}> Mélanome: {this.state.value}</Text>
			<Slider
				value={this.state.value}
				style={styles.slidee}
				onValueChange={(value) => this.setState({value})} >
			</Slider>	
			<ListItem>
			<Button
				style={{flex:9,backgroundColor: "#53507c",width:200,height:40,marginLeft:60,marginBottom:50,alignItems:'center'}}
				textStyle={{fontSize: 18, color:'#fff',fontWeight:"bold"}}
				onPress={this.uploadPic.bind(this)}>Valider</Button>
			</ListItem>
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
	marginLeft:20,
	marginTop:30,
	fontFamily: 'Arial',
	fontSize: 15    
  },
  melanome: {
	color: 'black',
	textAlign: 'right',
	bottom:30,
	position: 'relative',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,
	marginRight:20  	  
  },
  slidee: {
	marginLeft: 60,
	marginRight: 60  
  },
  diametre: {
	color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,	
	marginBottom:15,	
  },
  asymetrie: {
	color: 'black',
	fontFamily: 'Arial',
	marginTop:10,
	fontSize: 15  
  },
  couleur: {
    color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,
	marginBottom:15  
  },
  phototype: {
	marginTop:10,
	fontFamily: 'Arial',
	marginBottom:15,
	fontSize: 15,
	color:"#000"
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
	  fontWeight:'bold'
  },
  bords: {
    color: 'black',
	fontFamily: 'Arial',
	fontSize: 15,
	marginTop:10,
	marginBottom:15}
});

AppRegistry.registerComponent('uploadForm', () => uploadForm);