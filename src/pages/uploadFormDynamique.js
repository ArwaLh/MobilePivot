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
  TouchableHighlight,
  ListView,
  Platform,
  ProgressBar,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import {Button, List, ListItem, Header, Picker} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import ValidMetaDynamic from './validMetaDynamic';
import NewPatientDynamic from './newPatientDynamic';
import firebase from 'firebase';

export default class uploadFormDynamique extends Component {
	constructor (props) {
		super(props);
		this.itemsRef = firebase.database().ref("categories");
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
		  medecin_id:"",
		  dataSource: ds.cloneWithRows(['row 1', 'row 2']),
		  loaded:true,
		  dossier_id: '',
		  medecin_id: '',
		  text: [],
		  target_value: '',
		  criteres_values:[],
		  target_id: '',
		  patient_id: '',
		  med_pat_file:{},
		}
		this.goBack = this.goBack.bind(this);
		this.onValueChangeCriteria = this.onValueChangeCriteria.bind(this);
		this.validMetadataDynamic = this.validMetadataDynamic.bind(this);
	}
 componentDidMount(){
		AsyncStorage.getItem('med_pat_file_location').then((med_pat_file_locationn) => {
		  const array=JSON.parse(med_pat_file_locationn);
			this.setState({ 
				med_pat_file:array,
				dossier_id: array.id_dossier,
				medecin_id: array.id_medecin,
				patient_id: array.id_patient
			});

		//get the criterias list
		alert(array.id_medecin);
		this.itemsRef.child(array.id_medecin).child(array.categorie).child("criteres").on('value', (snap) => {
			let array_cat=[];		
			let items=[];
			items=snap.val();
			for (var k in items){
				if (items.hasOwnProperty(k)) {
					 array_cat.push({"key":k,"placeholder":items[k].nom_critere,"type":items[k].type_critere});	
				}
			}
			alert(array_cat.placeholder);
			this.setState({
			  dataSource: this.state.dataSource.cloneWithRows(array_cat),
			});
		});
		});
	}
		
 	validMetadataDynamic(){
	alert(JSON.stringify(this.state.criteres_values));
		//send the data to valid meta dynamic	
/* 		alert(this.state.med_pat_file.nombre_images_dossier);

		AsyncStorage.removeItem('med_pat_file_location_image_data');
		AsyncStorage.setItem('med_pat_file_location_image_data', JSON.stringify({
			"id_medecin":this.state.medecin_id,
			"id_patient":this.state.patient_id,
			"id_dossier":this.state.dossier_id,
			"categorie":this.state.med_pat_file.categorie,
			"nombre_images_dossier":this.state.med_pat_file.nombre_images_dossier,
			"emplacement":this.state.med_pat_file.emplacement,
			"imageURL":this.state.path,
			'bords':this.state.selected1,
			'couleur':this.state.selected2,
			'asymetrie':this.state.selected3,
			'phototype':this.state.phototype,
			'sed':this.state.sed,
			'diametre':this.state.diametre,
			'epaisseur':this.state.epaisseur,
			'suspicion':this.state.mel
			}));   */
/* 		this.props.navigator.push({
		  component: ValidMetaDynamic
		  
		}); */
	  }     
	goBack() {
		this.props.navigator.pop();
		return true;
	}
	onValueChangeCriteria (value: string) {
		if(value!=""){
		let items=[];
		items=this.state.criteres_values;
		items.push({"critere":value});
		/*alert(JSON.stringify(this.state.target_id)); */
        this.setState({
			criteres_values:items,

		});
		}
	}
 componentWillMount(){
		AsyncStorage.getItem('path').then((pathUp) => {                                                   
		  this.setState({
			path:pathUp
		  });	
		  path= this.state.path;
		});
	}
  renderRow(rowData,sectionID:number,rowID:number){
            return (
              <View style={styles.subBody}>
                <TouchableHighlight>
                    <View>
                        {rowData.type=="Boolean" ? (
						<Grid>
						  <Row>
						<Col>  
							<Text style={styles.upload_dynamic}> {rowData.placeholder}</Text>
						</Col>
						<Col style={{ marginLeft:80}}>	
                        <Picker 
							style={{width:100, color:"#29235c",marginTop:10}}
							iosHeader="Select one"
							mode="dropdown"
							selectedValue="Oui"
							>  
								<Item label="Oui" value="Oui" />
								<Item label="Non" value="Non" />
						</Picker>
						</Col>
						</Row>
						</Grid>
                        ):rowData.type=="Numérique" ? (
						<Grid>
						  <Row>
						<Col>  
							<Text style={styles.upload_dynamic}> {rowData.placeholder}</Text>
						</Col>
						<Col style={{ marginLeft:80}}>	
                        <TextInput
							ref="diametre"
							placeholder={rowData.placeholder}
							style={{width:100, textAlign :"left"}}
							value={this.state.diametre}
							keyboardType='numbers-and-punctuation'
							maxLength ={5}
							underlineColorAndroid="#29235c"
						  />
						</Col>
						</Row>
						</Grid>
                        ):<View>
						<Grid>
						<Row>
						  <Col>
							<Text style={styles.upload_dynamic}>{rowData.placeholder}</Text>
						  </Col>
							<Col style={{ marginLeft:80}}>
								 <TextInput
									ref={rowData.placeholder}
									placeholder={rowData.placeholder}
									value={this.state.ref}
									keyboardType="default"
									style={{width:100, textAlign :"left"}}
									underlineColorAndroid="#29235c"
								  />
							</Col>	
						</Row>
						</Grid>
						</View>}
                   </View>
                </TouchableHighlight>
              </View>
        );
       }
  render() {
    return ( 
	<View>
	<HeaderUp text=" 3/4 Upload Photo" loaded={this.state.loaded} onpress={this.goBack}/>
	<ScrollView>
		<ListItem style={{marginRight:10,marginLeft:15, borderColor:'#29235c'}}>
			<Image style={styles.pic_cam} source={{uri:this.state.path}}/>
		</ListItem>
		    <ListView dataSource={this.state.dataSource}
				showsVerticalScrollIndicator={true}
				renderRow={this.renderRow.bind(this)} style={{backgroundColor: 'white'}}/>	
			<List>
			<ListItem>
			<Button
			    onPress={this.validMetadataDynamic}
				style={styles.go_to_valid_meta_button}
				textStyle={styles.go_to_valid_meta_text}
				>Valider</Button>
			</ListItem>
			</List>
         </ScrollView> 
	</View>
    );
  }
}

AppRegistry.registerComponent('uploadFormDynamique', () => uploadFormDynamique);