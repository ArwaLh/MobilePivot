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
  SectionList,
  Platform,
  AsyncStorage,
  ScrollView,
  ActivityIndicator,
  ProgressBarAndroid,
  TextInput,
  View
} from 'react-native';

import HeaderSearch from '../components/headerSearch';
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
	//alert(this.state.dataSource)
	this.validate=this.validate.bind(this);
	this.goBack=this.goBack.bind(this);
	this.renderRow = this.renderRow.bind(this)
  }
  goBack() {
	AsyncStorage.removeItem('valid_meta');
	this.props.navigator.pop();
	return true; // do not exit app
  }
  componentWillMount(){
	//alert(Object.values(this.state.dataSource));
  }
  componentDidMount(){
	AsyncStorage.getItem('med_pat_file_location_image_data').then((med_pat_file_location_image_dataa) => {
	  const arr =JSON.parse(med_pat_file_location_image_dataa);
	  this.setState({
		array:arr,
		dossier_id: arr.id_dossier,
		medecin_id: arr.id_medecin,
		patient_id: arr.id_patient,
		motif_id: arr.id_motif
	  });
	  
	});	
	AsyncStorage.getItem('valid_meta').then((valid_meta) => {//get upload form dynamique data
	  const array =JSON.parse(valid_meta);
/* 	  	
	  //sort everything here
	  var result = array.reduce((unique, o) => {
		//alert(o["value"])
		if(!unique.find(obj => obj["criteria_name"] === o["criteria_name"] )) { //when you don't find them push
		unique.push(o);
		}
		return unique;
		},[]);
		//alert(result.length)
		for(let i =0; i< result.length; i++){
			if(array.indexOf(result[i])> -1){
			let arra=array.splice(1,array.indexOf(result[i]));
			//alert(this.state.criteres_values)
			}
		}
	  alert(result.length) */
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
	let id_motif=this.state.motif_id;
	let my_array=this.state.array;
	//alert(my_array.nombre_images_motif)
	//alert(my_array.nombre_images_dossier)
	/***-----upload to firebase storage method ----*/
	firebase.auth()
      .signInWithEmailAndPassword(EMAIL,PASSWORD)
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
		.child('medecins'+'_'+this.state.medecin_id).child('patients'+'_'+this.state.patient_id).child('dossier_medical'+'_'+this.state.dossier_id).child('motifs'+'_'+this.state.motif_id).child('images'+'_'+this.state.motif_id)
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
		/***-----Add to firebase databse method ----*/
		let compte_rendu=new Date();
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
		obj+=JSON.stringify("date_compte_rendu_consultation")+":"+JSON.stringify(compte_rendu.toString())+","+JSON.stringify("imageName")+":"+JSON.stringify(testImageName.substring(0,44).replace(/\s/g, "_"))+"}";
		array_all=JSON.parse(obj);
		
		myarray=JSON.stringify(that.state.meta_arr);// merge both arrays
		let image_id=testImageName.substring(0,44).replace(/\s/g, "_");
		  that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossier_medical').child(id_dossier).child("motifs").child(id_motif).child('images').child(image_id).set(array_all);
			that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossier_medical').child(id_dossier).update({ //update medical folder data
				date_MAJ_dossier: compte_rendu.toString(),
				nombre_images_dossier: parseInt(my_array.nombre_images_dossier)+1
		    });
			that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossier_medical').child(id_dossier).child("motifs").child(id_motif).update({ //update medical folder data
				date_MAJ_motif: compte_rendu.toString(),
				nombre_images_motif: parseInt(my_array.nombre_images_motif)+1
		    });	  
		  alert("Upload Terminé",downloadURL);
		  that.props.navigator.push({
			component: LastOne
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
	//alert(this.state.meta_arr);
    return ( 
	<View>
	 <HeaderSearch text="Données patient" onpress={this.goBack}/>
	  <ScrollView>	 
		<ListView dataSource={this.state.dataSource}
		  showsVerticalScrollIndicator={true}
		  renderRow={this.renderRow} style={{backgroundColor: 'white'}}
		  renderFooter={()=>{ <Row style={{margin:10}}>
			<Text style={{color:"#29235c"}}>{this.state.progress_text_value}%</Text>
		    <ProgressBarAndroid progress={this.state.progress_bar_value} styleAttr="Horizontal" indeterminate={false} color="purple" style={{height:60}}/>  
		  </Row>}}/>
		<Grid>
		  <Row style={{marginTop:20, marginLeft:25}}>
			<Col>	
			  <Button
				onPress={this.validate}
				style={styles.send_button_valid_meta_dyn}
				textStyle={{fontSize: 15, color:'#fff'}}>Envoyer</Button>
			</Col>
		  </Row>
		</Grid>	
		   <ActivityIndicator size="large" color="#29235c" />
	  </ScrollView>   
	</View>
    );
  }
}
AppRegistry.registerComponent('validMetaDynamic', () => validMetaDynamic);