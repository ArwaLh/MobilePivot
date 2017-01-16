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
  Platform,
  Picker,
  AsyncStorage,
  ScrollView,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import UploadForm from './uploadForm';

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
export default class validMeta extends Component {
	constructor (props) {
    super(props);
	this.itemsRef = firebase.database().ref();
	this.state = {
		array: [],
		bords: '',
		couleur: '',
		loaded: true,
		dossier_id: '',
		medecin_id: '',
		patient_id: '',
		downloadURL:""
	}
	this.validate=this.validate.bind(this);
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	uploadP(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	componentDidMount(){
		AsyncStorage.getItem('med_pat_file_location_image_data').then((med_pat_file_location_image_dataa) => {
			const arr =JSON.parse(med_pat_file_location_image_dataa);
			alert(JSON.stringify(arr));
				this.setState({
					array:arr,
					dossier_id: arr.id_dossier,
					medecin_id: arr.id_medecin,
					patient_id: arr.id_patient
				});
		});
		AsyncStorage.getItem('path').then((pathUp) => {                                                   
		  this.setState({
			path:pathUp
		  });
		  path= this.state.path;
		});		
	}
	
	validate(){
		const dbRef = firebase.database().ref();
		let id_medecin=this.state.medecin_id;
		let id_patient=this.state.patient_id;
		let id_dossier=this.state.dossier_id;
		let my_array=this.state.array;
		alert("Patientez SVP");
		/*-----upload to firebase storage method ----*/
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
				.ref()
				.child('medecins'+'_'+this.state.medecin_id).child('categories'+'_'+'naevus').child('patients'+'_'+this.state.patient_id).child('dossiers_medicaux'+'_'+this.state.dossier_id).child('images')
				.child(testImageName)
				.put(blob, {contentType : 'image/jpg'});
				uploadTask.on('state_changed', function(snapshot){
					progress =Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					alert(progress); 
				}, function(error) {
				  alert("error in uploading");
				}, function() {
				  blob.close();
				  let downloadURL = uploadTask.snapshot.downloadURL;
				  /*-----Add to firebase databse method ----*/
				//and store image name
				let compte_rendu=new Date();
				let image_id=testImageName.substring(0,24).replace(/" "/g, "");
				dbRef.child('medecins').child(id_medecin).child('categories').child('naevus').child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).child('images').child(image_id).set({ 
					date_compte_rendu_consultation: compte_rendu.toString(),
					bords:my_array.bords,
					couleur:my_array.couleur,
					epaisseur:my_array.epaisseur,
					diametre:my_array.diametre,
					asymetrie:my_array.asymetrie,
					phototype:my_array.phototype,
					SED:my_array.sed,
					emplacement:my_array.emplacement,
					suspicion:my_array.suspicion,
					downloadURL:downloadURL
				})
				//upadet medical folder data
				dbRef.child('medecins').child(id_medecin).child('categories').child('naevus').child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).update({ 
				date_MAJ_dossier: compte_rendu.toString(),
				nombre_images_dossier: my_array.nombre_images_dossier+1
				});
				  alert("done uploading here is the download URL",downloadURL);
				});

			})
	}
  render() {
    return ( 
	<View>
	<HeaderUp text="4/4 Données patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
		<ScrollView>	
			<ListItem style={styles.list_MetaData}>   
				<Grid>
					<Col>
						<Text style={styles.metaDataForm}>Bords</Text>
					</Col>
					 <Col>
						 <Text  style={styles.metaDataForm2} >{this.state.array.bords}</Text>
					</Col> 
				 </Grid>			 
			</ListItem>	
			<ListItem style={styles.list_MetaData}>   
				 <Grid>
					 <Col>
						<Text style={styles.metaDataForm}>Couleur</Text>
					  </Col>
					 <Col>
						 <Text  style={styles.metaDataForm2} >{this.state.array.couleur}</Text>
					 </Col> 
				 </Grid>			 
			</ListItem> 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Asymétrie</Text>
							  </Col>
							  <Col>
									<Text style={styles.metaDataForm3}>{this.state.array.asymetrie}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem>
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Phototype </Text>
							  </Col>
							  <Col>
									 <Text style={styles.phototypeF}> Phototype {this.state.array.phototype}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem> 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>SED </Text>
							  </Col>
							  <Col>
									 <Text style={styles.metaDataForm3} > {this.state.array.sed}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem> 	  
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Diamètre</Text> 
							  </Col>
							  <Col>
									<Text style={styles.metaDataForm3}>{this.state.array.diametre}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem> 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Epaisseur</Text> 
							  </Col>
							  <Col>
								<Text style={styles.metaDataForm3}> {this.state.array.epaisseur}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem>	 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Suspicion</Text> 
							  </Col>
							  <Col>
									<Text style={styles.mélanomeF}> Mélanome: {this.state.array.suspicion}%</Text>
							 </Col> 
						   </Grid>			 
			</ListItem>	 
					
					  <Grid>
					    <Row style={{marginTop:20, marginLeft:10}}>
							  <Col style={{width:200}}>
								 <Button onPress={this.uploadP.bind(this)} textStyle={styles.back_to_upload_button_valid_meta} transparent>
										 MODIFIER LES INORMATIONS
								 </Button> 
							  </Col>
							 <Col>	
								<Button
									onPress={this.validate.bind(this)}
									style={styles.send_button_valid_meta}
									textStyle={{fontSize: 15, color:'#fff'}}>Envoyer</Button>
							</Col>
						</Row>	
					 </Grid>			
		</ScrollView>   
	</View>
    );
  }
}
AppRegistry.registerComponent('validMeta', () => validMeta);