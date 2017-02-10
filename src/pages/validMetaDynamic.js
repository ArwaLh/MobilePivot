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
import UploadFormDynamique from './uploadFormDynamique';
import LastPageDynamic from './lastPageDynamic';

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
			alert("my data",med_pat_file_location_image_dataa);
			this.setState({
				array:arr,
				dossier_id: arr.id_dossier,
				medecin_id: arr.id_medecin,
				patient_id: arr.id_patient,
				category_id: arr.categorie,
				
			});
		});	
		//get upload form dynamique data
		AsyncStorage.getItem('valid_meta').then((valid_meta) => {
			const array =JSON.parse(valid_meta);
			alert(valid_meta);
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
		let id_medecin=this.state.medecin_id;
		let id_patient=this.state.patient_id;
		let id_dossier=this.state.dossier_id;
		let id_category=this.state.category_id;
		let my_array=this.state.array;
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
				.child('medecins'+'_'+this.state.medecin_id).child('patients'+'_'+this.state.patient_id).child('categories'+'_'+id_category).child('dossiers_medicaux'+'_'+this.state.dossier_id).child('images'+'_'+this.state.category_id)
				.child(testImageName.substring(0,44).replace(/\s/g, "_"))
				.put(blob, {contentType : 'image/jpg'});
				uploadTask.on('state_changed', function(snapshot){
					progress =Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
					alert(progress); 
				}, function(error) {
				  alert("error in uploading");
				}, function() {
				  blob.close();
				  let downloadURL = uploadTask.snapshot.downloadURL;
				  alert("done uploading",downloadURL);
				});    
				/*-----Add to firebase databse method ----*/
					//and store image name
					let compte_rendu                 =new Date();
					//create a JSON array from a javascript array
					let myarray_keys=[];
					let myarray_values=[];
					//create the JSON array all over again
					let array_all=[];		
					let items=[];
					//items=this.state.meta_arr;
					for (var k in this.state.meta_arr){
						if (this.state.meta_arr.hasOwnProperty(k)) {
							myarray_keys.push(this.state.meta_arr[k].criteria_name);	
						}  
					} 
					for (var k in this.state.meta_arr){
						if (this.state.meta_arr.hasOwnProperty(k)) {
							myarray_values.push(this.state.meta_arr[k].value);	
						}  
					} 
					let obj ="{"
					for (var i =0; i < myarray_values.length;i++){
					obj+=JSON.stringify(myarray_keys[i])+":"+JSON.stringify(myarray_values[i])+",";
	
					}
					obj+=JSON.stringify("date_compte_rendu_consultation")+":"+JSON.stringify(compte_rendu.toString())+"}";
					alert(obj);
					array_all=JSON.parse(obj);
					/*merge both arrays*/
					//alert(JSON.stringify(myarray_values));
					//alert(this.state.meta_arr[0].value);
					myarray=JSON.stringify(this.state.meta_arr);
					let image_id=testImageName.substring(0,44).replace(/\s/g, "_");
  					AsyncStorage.getItem('id').then((idd)=>{
						this.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).child('images').child(image_id).set(array_all);
						//upadet medical folder data
						this.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).update({ 
						date_MAJ_dossier: compte_rendu.toString(),
						nombre_images_dossier: my_array.nombre_images_dossier+1,
						emplacement: my_array.emplacement
						});
						this.props.navigator.push({
						  component: LastPageDynamic
						});
					});//end get category ID 
			})  
  }
  renderRow(rowData,sectionID:number,rowID:number){
	  /*for statement*/
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
    return ( 
	<View>
	<HeaderUp text="4/4 Données patient" loaded={this.state.loaded} onpress={this.goBack}/>
		<ScrollView>	 
		 <ListView dataSource={this.state.dataSource}
				showsVerticalScrollIndicator={true}
				renderRow={this.renderRow.bind(this)} style={{backgroundColor: 'white'}}/>
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