/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Platform,
  AsyncStorage,
  ScrollView,
  ProgressBarAndroid,
  TextInput,
  View
} from 'react-native';

import HeaderSearch from '../components/headerSearch';
import styles from '../styles/common-styles.js';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import UploadForm from './uploadForm';
import LastOne from './lastOne';

const testImageName = `patient_pic_${Platform.OS}_${new Date()}.jpg`
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
const testFile = null;

export default class validMeta extends Component {
  constructor (props) {
    super(props);
	this.itemsRef = firebase.database().ref();
	this.storageRef = firebase.storage().ref();
	this.state = {
		array: [],
		bords: '',
		couleur: '',
		loaded: true,
		dossier_id: '',
		progress_bar_value: 0,
		progress_text_value: 0,
		medecin_id: '',
		patient_id: '',
		motif_id: '',
		downloadURL:""
	}
	this.validate=this.validate.bind(this);
	this.uploadP=this.uploadP.bind(this);
	this.goBack=this.goBack.bind(this);
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
	    alert(arr.id_motif)
	  this.setState({
		array:arr,
		dossier_id: arr.id_dossier,
		medecin_id: arr.id_medecin,
		patient_id: arr.id_patient,
		motif_id: arr.id_motif
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
	let that = this;
	let progress=0;
	let id_medecin=this.state.medecin_id;
	let id_patient=this.state.patient_id;
	let id_dossier=this.state.dossier_id;
	let id_motif=this.state.motif_id;
	let my_array=this.state.array;
	alert(my_array.nombre_images_motif)
	//alert(my_array.nombre_images_dossier)
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
	
	Blob // create Blob from file path
	  .build(rnfbURI, { type : 'image/jpg;'})
	  .then((blob) => {
	  var uploadTask= firebase.storage()// upload image using Firebase SDK 
		.ref() 
		.child('medecins'+'_'+this.state.medecin_id).child('patients'+'_'+this.state.patient_id).child('dossier_medical'+'_'+this.state.dossier_id).child('motifs'+'_'+this.state.motif_id).child('images'+'_'+this.state.motif_id)
		.child(testImageName.substring(0,44).replace(/\s/g, "_"))
		.put(blob, {contentType : 'image/jpg'});
		uploadTask.on('state_changed', function(snapshot){
			progress =Math.round(snapshot.bytesTransferred / snapshot.totalBytes);
			progress_text =Math.floor(snapshot.bytesTransferred / snapshot.totalBytes)*100;
			that.setState({progress_bar_value:progress});
			that.setState({progress_text_value:progress_text});
		}, function(error) {
		  alert("Erreur dans l'upload");
		}, function() {
			blob.close();
			let downloadURL = uploadTask.snapshot.downloadURL;
			
			/*-----Add to firebase databse method ----*/	
		let compte_rendu=new Date();/** and store image name */
		let image_id=testImageName.substring(0,44).replace(/\s/g, "_");
		  that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossier_medical').child(id_dossier).child("motifs").child(id_motif).child('images').child(image_id).set({ 
			date_compte_rendu_consultation: compte_rendu.toString(),
			bords:my_array.bords,
			couleur:my_array.couleur,
			epaisseur:my_array.epaisseur,
			diametre:my_array.diametre,
			asymetrie:my_array.asymetrie,
			phototype:my_array.phototype,
			SED:my_array.sed,
			suspicion:my_array.suspicion,
			imageName:image_id       
		  })
			that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossier_medical').child(id_dossier).update({ //update medical folder data
				date_MAJ_dossier: compte_rendu.toString(),
				nombre_images_dossier:parseInt(my_array.nombre_images_dossier)+1
		    });
			that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossier_medical').child(id_dossier).child("motifs").child(id_motif).update({ //update medical folder data
				date_MAJ_motif: compte_rendu.toString(),
				nombre_images_motif: parseInt(my_array.nombre_images_motif)+1
		    });
		  alert("Upload terminé",downloadURL);
		});/** end getItem id category */
		that.props.navigator.push({
			 component: LastOne
		}); 
		})
  }
  render() {
    return ( 
	<View>
	  <HeaderSearch text="Données patient" onpress={this.goBack}/>
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
			<Col style={{width:170}}>
			  <Button onPress={this.uploadP} textStyle={styles.back_to_upload_button_valid_meta} style={{height:40}}transparent> MODIFIER LES INORMATIONS</Button> 
			</Col>
			<Col style={{height:30,marginBottom:30}}>	
			  <Button
			    onPress={this.validate.bind(this)}
			    style={styles.send_button_valid_meta}
			    textStyle={{fontSize: 15, color:'#fff'}}>Envoyer</Button>
			</Col>
		  </Row>
		  <Row>
		  <Col style={{marginLeft:20,marginTop:10,marginRight:20}}>
			<Text style={{color:"#29235c"}}>{this.state.progress_text_value}%</Text>
			<ProgressBarAndroid progress={this.state.progress_bar_value} styleAttr="Horizontal" indeterminate={false} color="purple" style={{height:30}}/>
		  </Col>
		  </Row>
		</Grid>			
	  </ScrollView>   
	</View>
    );
  }
}
AppRegistry.registerComponent('validMeta', () => validMeta);