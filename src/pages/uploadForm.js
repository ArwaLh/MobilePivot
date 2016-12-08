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
  Image,
  ScrollView,
  BackAndroid,
  AsyncStorage,
  Platform,
  ProgressBar,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, Picker} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Progress from 'react-native-progress';
const Item = Picker.Item;
import ValidMeta from './validMeta';
import Phototype from './phototype';
const testImageName = `patient-pic-${Platform.OS}-${new Date()}.jpg`
const EMAIL = 'arwa.louihig@esprit.tn'
const PASSWORD = 'arwa24961322'
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob'; 
const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const dirs = RNFetchBlob.fs.dirs
const path=null;
const testFile = null
var progress=0;
export default class uploadForm extends Component {
	constructor (props) {
		super(props);
		this.state = {
		loaded:true,
	      choisir:'choisir',
		  phototype: '',
		  mel: 0.0,
		  selectedItem: undefined,
         selected1: 'Régulier',
		 selected2: 'Brun foncé',
		 selected3: 'Oui',
		 selected4: '0.2',
		 selected5: '0.2',
		}
	}

	componentWillMount(){
		AsyncStorage.getItem('Phototype_value').then((phototypee) => {
		  this.setState({
			phototype: phototypee
		  });
		});
		AsyncStorage.getItem('path').then((pathUp) => {                                                   
		  this.setState({
			path:pathUp,
			loaded: true
		  });
		  path= this.state.path;
		  alert(path);
		});
	 }
	onValueChangeBords (value: string) {
        this.setState({
            selected1 : value
		});
	}
	onValueChangeCouleur (value: string) {
			this.setState({
				selected2 : value
		});}
		
	onValueChangeAsymétrie (value: string) {
			this.setState({
				selected3 : value
		});}
		
	onValueChangeDiamètre (value: string) {
			this.setState({
				selected4 : value
		});}
		
	onValueChangeEpaisseur (value: string) {
			this.setState({
				selected5 : value
		});}
  
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}

	uploadPic(){
		firebase.auth()
          .signInWithEmailAndPassword(EMAIL, PASSWORD)
          .catch((err) => {
            console.log('firebase sigin failed', err)
          })

		firebase.auth().onAuthStateChanged((user) => {
			<Text>{JSON.stringify(user)}</Text>
		})
		const rnfbURI= RNFetchBlob.wrap(path);
		// create Blob from file path
		Blob
			.build(rnfbURI, { type : 'image/jpg;'})
			.then((blob) => {
			  // upload image using Firebase SDK
			  var uploadTask= firebase.storage()
				.ref('images')
				.child(testImageName)
				.put(blob, {contentType : 'image/jpg'});
				uploadTask.on('state_changed', function(snapshot){
					progress =Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					alert(progress); 
				}, function(error) {
				  alert("error in uploading");
				}, function() {
				  blob.close();
				  var downloadURL = uploadTask.snapshot.downloadURL;
				  alert("done uploading here is the download URL",downloadURL);
				});
			})
	}
  render() {
    return ( 
	<View>
	<HeaderUp text=" 3/4 Upload Photo" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		    <ListItem>

			 <Image style={{width:330, height: 160}} source={{uri:this.state.path}}/>

			</ListItem>
			<Grid>
			  <Row>
			<Col>  
				<Text style={styles.bords}>Bords</Text>
			</Col>
			<Col style={{ marginLeft:100}}>	
					<Picker 
					    style={{width:130, color:"#29235c" }}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChangeBords.bind(this)}>  
								<Item label="Régulier" value="Régulier" />
								<Item label="Irrégulier" value="Irrégulier" />
					</Picker>
			</Col>
			 </Row>
			  <Row>
			  <Col>
				<Text style={styles.couleur}>Couleur</Text>
			  </Col>
			  <Col style={{ marginLeft:70}}>	
				 <Picker
						style={{width:145, color:"#29235c" }}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChangeCouleur.bind(this)}>  
								<Item label="Brun foncé" value="Brun foncé" />
								<Item label="Brun clair" value="Brun clair" />
					</Picker>
					</Col>
				</Row>	
			  <Row>
			  <Col>
				<Text style={styles.asymetrie}>Asymétrie</Text>
			  </Col>
				<Col style={{ marginLeft:160}}>
					<Picker 
					    style={{width:100, color:"#29235c" }}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.selected3}
                        onValueChange={this.onValueChangeAsymétrie.bind(this)}>  
								<Item label="Oui" value="Oui" />
								<Item label="Non" value="Non" />
					</Picker>
				</Col>	
				</Row>
				<Row>
				<Col style={{width:100}}>
				<Text style={styles.phototypee}>Phototype</Text>
				 </Col>
				 <Col style={{width:200}}>
				 	<Button
				    onPress={this.phototypeb.bind(this)}
					style={{borderColor: "#53507c",width:150,height:40,marginLeft:69}}
					textStyle={{fontSize: 15, color:'#53507c'}}
					bordered> phototype <Text> {this.state.phototype}</Text></Button>
				</Col>
                </Row>
				
				<Row>
				<Col>
					<Text style={styles.diametre}>Diamètre</Text>
				</Col>
				<Col style={{ marginLeft:160}}>
					<Picker
					
					    style={{width:100, color:"#29235c" }}
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.selected4}
                        onValueChange={this.onValueChangeDiamètre.bind(this)}>  
								<Item label="0,2" value="0,2" />
								<Item label="1.3" value="1.3" />
								<Item label="2.3 " value="2.3" />
								<Item label="4.3 " value="4.3" />
								<Item label="5.2" value="5.2" />
								<Item label="6 " value="6" />	
								<Item label="0,2" value="0.2" />
								<Item label="1.3" value="1.3" />
								<Item label="2.3 " value="2.3" />
							
					</Picker>
				</Col>
			</Row>
			  <Row>
				  <Col>
					<Text style={styles.asymetrie}>Epaisseur</Text>
				  </Col>
					<Col style={{ marginLeft:160}}>
						<Picker 
						    style={{width:100, color:"#29235c" }}
							iosHeader="Select one"
							mode="dropdown"
							selectedValue={this.state.selected5}
							onValueChange={this.onValueChangeEpaisseur.bind(this)}>  
									<Item label="0,2" value="0.2" />
									<Item label="1.3" value="1.3" />
									<Item label="2.3 " value="2.3" />
									<Item label="4.3" value="4.3" />
						</Picker>
					</Col>	
				</Row>
	       <Row>
				<Col>
					<Text style={styles.suspicion}>Suspicion</Text>
				</Col>
				<Col>
						<Text style={styles.melanome}> Mélanome:{this.state.mel}% </Text>
				</Col>
			</Row>
			<Row >	
			<Slider
				ref="mel"
				value={this.state.mel}
				style={styles.slidee}
				onValueChange={(value) => this.setState({mel:value})} >
			</Slider>
            </Row>			
			</Grid>
			<ListItem>
			<Button
			    onPress={this.validMetadata.bind(this)}
				style={{flex:9,backgroundColor: "#29235c",width:200,height:40,marginLeft:60,marginBottom:50,alignItems:'center'}}
				textStyle={{fontSize: 18, color:'#fff',fontWeight:"bold"}}
				>Valider</Button>
			</ListItem>
         </ScrollView> 
	</View>
    );
  }
  	 validMetadata(){
		AsyncStorage.setItem('Bords_value',this.state.selected1); 
		AsyncStorage.setItem('Couleur_value',this.state.selected2); 
		AsyncStorage.setItem('Asymetrie_value',this.state.selected3);  
		AsyncStorage.setItem('Phototype_value',this.state.phototype);
		AsyncStorage.setItem('Sed_Value',this.state.sed);
		AsyncStorage.setItem('Diametre_value',this.state.selected4);  
		AsyncStorage.setItem('Epaisseur_value',this.state.selected5);
		AsyncStorage.setItem('Suspicion_value',JSON.stringify(this.state.mel));  
		this.props.navigator.push({
		  component: ValidMeta
		  
		});
	  }      
    phototypeb(){
		this.setState({choisir: '', loaded :true});
		this.props.navigator.push({
		  component: Phototype
		});
	  }
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
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',  
	margin:10
  },
  melanome: {
	fontFamily: 'Roboto',
	fontSize:15,
	color:'#29235c',
	marginLeft:50,
	marginTop:12
  },
  slidee: {
	width:280,
	marginLeft:30,
  },
  diametre: {
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,	
	marginBottom:15,
	margin:10
  },
  asymetrie: {
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,
    margin:10	
  },
  couleur: {
  	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,
	marginBottom:15,
    margin:10	
  },
  phototypee: {
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',  
	marginTop:10,
	marginBottom:15,
	margin:10
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
	  fontWeight:'bold'
  },
  bords: {
	fontFamily: 'Roboto',
	fontSize:17,
	color:'#29235c',
	marginTop:10,
	marginBottom:15,
	margin:10}
});

AppRegistry.registerComponent('uploadForm', () => uploadForm);