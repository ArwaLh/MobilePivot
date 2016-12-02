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
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, Picker} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-vector-icons/FontAwesome';
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

export default class uploadForm extends Component {
	constructor (props) {
		super(props);
		this.storageRef = firebase.storage();
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
		  choisir: 'choisir',
		  chickenWings: 1.5,
		   value: 1.0,
		selectedItem: undefined,
         selected1: 'key0',
		 selected2: 'key3',
		 selected3: 'key5',
		 selected4: 'key7',
		 selected5: 'key24',
         results: {
         items: []
                  } 
		}
	}
	 componentDidMount(){
		AsyncStorage.getItem('phototype').then((phototypee) => {
		  this.setState({
			choisir: '',
			loaded:true
		  });
		});
		alert(this.state.phototype);
	}
	 componentWillMount(){
		AsyncStorage.getItem('phototype').then((phototypee) => {
		  this.setState({
			phototype: phototypee,
			loaded:true
		  });
		});
		alert(this.state.phototype);
	}
	
	onValueChangeBords (value: string) {
        this.setState({
            selected1 : value
	});}

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
	componentWillMount(){

    AsyncStorage.getItem('path').then((pathUp) => {                                                   
      this.setState({
		path:pathUp,
		rnfbURI: RNFetchBlob.wrap(pathUp),
        loaded: true
      });
	  alert(this.state.path);
    });

  }
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
		
		// create Blob from file path
		Blob
			.build(this.state.rnfbURI, { type : 'image/jpg;'})
			.then((blob) => {
			  // upload image using Firebase SDK
			  var uploadTask= this.storageRef
				.ref('images')
				.child(testImageName)
				.put(blob, {contentType : 'image/jpg'});
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
								<Item label="Régulier" value="key0" />
								<Item label="Irrégulier" value="key1" />
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
								<Item label="Brun foncé" value="key3" />
								<Item label="Brun clair" value="key4" />
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
								<Item label="Oui" value="key5" />
								<Item label="Non" value="key6" />
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
					style={{borderColor: "#53507c",width:180,height:40,marginLeft:69}}
					textStyle={{fontSize: 15, color:'#53507c'}}
					bordered><Text>{this.state.choisir}</Text> phototype <Text> {this.state.phototype}</Text></Button>
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
								<Item label="0,2" value="key7" />
								<Item label="1.3" value="key8" />
								<Item label="2.3 " value="key9" />
								<Item label="4.3 mm" value="key10" />
								<Item label="5.2 mm" value="key11" />
								<Item label="6 mm" value="key12" />	
								<Item label="0,2" value="key13" />
								<Item label="1.3" value="key14" />
								<Item label="2.3 " value="key15" />
								<Item label="4.3 mm" value="key16" />
								<Item label="5.2 mm" value="key17" />
								<Item label="6 mm" value="key18" />	
								<Item label="1.3" value="key19" />
								<Item label="2.3 " value="key20" />
								<Item label="4.3 mm" value="key21" />
								<Item label="5.2 mm" value="key22" />
								<Item label="6 mm" value="key23" />	
							
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
									<Item label="0,2" value="key24" />
									<Item label="1.3" value="key25" />
									<Item label="2.3 " value="key26" />
									<Item label="4.3" value="key27" />
									<Item label="5.2" value="key28" />
									<Item label="6" value="key29" />	
						</Picker>
					</Col>	
				</Row>
	       <Row>
				<Col>
					<Text style={styles.suspicion}>Suspicion</Text>
				</Col>
				<Col>
						<Text style={styles.melanome}> Mélanome: {this.state.value} %</Text>
				</Col>
			</Row>
			<Row >	
			<Slider
				value={this.state.value}
				style={styles.slidee}
				onValueChange={(value) => this.setState({value})} >
			</Slider>
            </Row>			
			</Grid>
			<ListItem>
			<Button
			    onPress={this.validMetadata.bind(this)} 
				style={{flex:9,backgroundColor: "#29235c",width:200,height:40,marginLeft:60,marginTop:10,alignItems:'center'}}
				textStyle={{fontSize: 18, color:'#fff'}}
				onPress={this.uploadPic.bind(this)}>VALIDER</Button>
			</ListItem>
			
         </ScrollView> 
	</View>
    );
  }
  	 validMetadata(){
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