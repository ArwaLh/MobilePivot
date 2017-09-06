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
  ListView,
  Platform,
  AsyncStorage,
  ScrollView,
  ProgressBarAndroid,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import {Button} from 'native-base';
import { Col, Row, Grid } from "react-native-easy-grid";
import UploadFormDynamique from './uploadFormDynamique';
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

export default class validMetaDynamic extends Component {
  constructor (props) {
    super(props);
	this.itemsRef = firebase.database().ref();
	this.storageRef = firebase.storage().ref();
	const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	this.state = {
		dataSource: ds.cloneWithRows(['row 1', 'row 2']),
		array: [],
		meta_arr: [],
		bords: '',
		couleur: '',
		loaded: true,
		dossier_id: '',
		progress_bar_value: 0,
		progress_text_value: 0,
		medecin_id: '',
		patient_id: '',
		downloadURL:""
	}
	this.validate=this.validate.bind(this);
	this.goBack=this.goBack.bind(this);
  }
  goBack() {
	this.props.navigator.pop();
	return true; // do not exit app
  }
  componentDidMount(){
	AsyncStorage.getItem('med_pat_file_location_image_data').then((med_pat_file_location_image_dataa) => {
	  const arr =JSON.parse(med_pat_file_location_image_dataa);
	  this.setState({
		array:arr,
		dossier_id: arr.id_dossier,
		medecin_id: arr.id_medecin,
		patient_id: arr.id_patient,
		category_id: arr.categorie,
	  });
	});	
	AsyncStorage.getItem('valid_meta').then((valid_meta) => {//get upload form dynamique data
	  const array =JSON.parse(valid_meta);
	  this.setState({
		meta_arr:array,
		dataSource: this.state.dataSource.cloneWithRows(array)
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
	let id_medecin=this.state.medecin_id;
	let id_patient=this.state.patient_id;
	let id_dossier=this.state.dossier_id;
	let id_category=this.state.category_id;
	let my_array=this.state.array;
	/*-----upload to firebase storage method ----*/
	firebase.auth()
      .signInWithEmailAndPassword(EMAIL, PASS-WORD)
      .catch((err) => {
		console.log('firebase sigin failed', err)
      })
	  
	firebase.auth().onAuthStateChanged((user) => {
		<Text>{JSON.stringify(user)}</Text>
	})
	const rnfbURI= RNFetchBlob.wrap(path);// create Blob from file path
   	Blob
	  .build(rnfbURI, { type : 'image/jpg;'})
	  .then((blob) => {
	  var uploadTask= firebase.storage()// upload image using Firebase SDK
		.ref()
		.child('medecins'+'_'+this.state.medecin_id).child('patients'+'_'+this.state.patient_id).child('categories'+'_'+id_category).child('dossiers_medicaux'+'_'+this.state.dossier_id).child('images'+'_'+this.state.category_id)
		.child(testImageName.substring(0,44).replace(/\s/g, "_"))
		.put(blob, {contentType : 'image/jpg'});
		uploadTask.on('state_changed', function(snapshot){
			progress =Math.round(snapshot.bytesTransferred / snapshot.totalBytes);
			progress_text =Math.floor(snapshot.bytesTransferred / snapshot.totalBytes)*100;
			that.setState({progress_bar_value:progress});
			that.setState({progress_text_value:progress_text});
		}, function(error) {
		  alert("Erreur dans l'upload du photo");
		}, function() {
		  blob.close();
		  let downloadURL = uploadTask.snapshot.downloadURL;
		  /*-----Add to firebase databse method ----*/
		//and store image name
		let compte_rendu=new Date();
		//create a JSON array from a javascript array
		let myarray_keys=[];
		let myarray_values=[];
		let array_all=[];		
		let items=[];
		for (var k in that.state.meta_arr){
		  if (that.state.meta_arr.hasOwnProperty(k)) {
			myarray_keys.push(that.state.meta_arr[k].criteria_name);	
		  }  
		} 
		for (var k in that.state.meta_arr){
		  if (that.state.meta_arr.hasOwnProperty(k)) {
			myarray_values.push(that.state.meta_arr[k].value);	
		  }  
		} 
		let obj ="{"
		for (var i =0; i < myarray_values.length;i++){
		  obj+=JSON.stringify(myarray_keys[i])+":"+JSON.stringify(myarray_values[i])+",";
		}
		obj+=JSON.stringify("date_compte_rendu_consultation")+":"+JSON.stringify(compte_rendu.toString())+"}";
		array_all=JSON.parse(obj);
		
		myarray=JSON.stringify(that.state.meta_arr);//merge both arrays
		let image_id=testImageName.substring(0,44).replace(/\s/g, "_");
  		AsyncStorage.getItem('id').then((idd)=>{
		  that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).child('images').child(image_id).set(array_all);
		  if(my_array.emplacement=="null"){
			that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).update({ //upadet medical folder data
				date_MAJ_dossier: compte_rendu.toString(),
				nombre_images_dossier: my_array.nombre_images_dossier+1
		    });
		  }else{
			that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).update({ //upadet medical folder data
				date_MAJ_dossier: compte_rendu.toString(),
				nombre_images_dossier: my_array.nombre_images_dossier+1,
				emplacement: my_array.emplacement
		    });
		  }		  
		  alert("Upload Terminé",downloadURL);
		  that.props.navigator.push({
			component: LastOne
		  });
		});    
		
		});//end get category ID 
	})  
  }
  renderRow(rowData,sectionID:number,rowID:number){
	return (
      <View style={styles.subBody}>
		<Grid>
		  <Row>
			<Col>  
				<Text style={styles.upload_dynamic}> {rowData.criteria_name}</Text>
			</Col>
			<Col>	
			  <Text style={styles.upload_dynamic}>{rowData.value}</Text>
			</Col>
		  </Row>
		</Grid>
	</View>
   );
  }
  render() {
	let that=this;
    return ( 
	<View>
	  <HeaderUp text="4/4 Données patient" loaded={this.state.loaded} onpress={this.goBack}/>
	  <ScrollView>	 
		<ListView dataSource={this.state.dataSource}
		  showsVerticalScrollIndicator={true}
		  renderRow={this.renderRow.bind(this)} style={{backgroundColor: 'white'}}
		  renderFooter={()=>{ <Row style={{margin:10}}>
			<Text style={{color:"#29235c"}}>{that.state.progress_text_value}%</Text>
		    <ProgressBarAndroid progress={that.state.progress_bar_value} styleAttr="Horizontal" indeterminate={false} color="purple" style={{height:60}}/>  
		  </Row>}}/>
		<Grid>
		  <Row style={{marginTop:20, marginLeft:10}}>
			<Col>	
			  <Button
				onPress={this.validate}
				style={styles.send_button_valid_meta_dyn}
				textStyle={{fontSize: 15, color:'#fff'}}>Envoyer</Button>
			</Col>
		  </Row>
		 
		</Grid>						
	  </ScrollView>   
	</View>
    );
  }
}
AppRegistry.registerComponent('validMetaDynamic', () => validMetaDynamic);