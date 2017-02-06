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
		  selected_boolean: 'Non',
		  selected_text: '',
		  text: [],
		  target_value: '',
		  criteres_values:[],
		  target_id: '',
		  patient_id: '',
		  list_length:"",
		  med_pat_file:{},
		}
		this.goBack = this.goBack.bind(this);
		this.onValueChangeCriteria = this.onValueChangeCriteria.bind(this);
		this.validMetadataDynamic = this.validMetadataDynamic.bind(this);
	}
 componentWillMount(){
		AsyncStorage.getItem('path').then((pathUp) => {                                                   
		  this.setState({
			path:pathUp
		  });	
		  path= this.state.path;
		});
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
		alert(array.id_medecin);
		//get the criterias list
		this.itemsRef.child(array.id_medecin).child(array.categorie).child("criteres").on('value', (snap) => {
			let array_cat=[];		
			let items=[];
			items=snap.val();
			for (var k in items){
				if (items.hasOwnProperty(k)) {
					 array_cat.push({"key":k,"placeholder":items[k].nom_critere,"type":items[k].type_critere});	
				}
			}
			alert(array_cat.length);
			this.setState({
			  dataSource: this.state.dataSource.cloneWithRows(array_cat),
			  list_length:array_cat.length
			});
		});
		});
	}
		
 	validMetadataDynamic(){
	alert(this.state.list_length);
	
	//alert(this.state.criteres_values);
	this.state.criteres_values.forEach((element)=>{
		//alert(element)
	});
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
		let items=[];
		items=this.state.criteres_values;
		items.push(value);
		/*alert(JSON.stringify(this.state.target_id)); */
        this.setState({
			criteres_values:items,

		});
	}
	onValueChangeCriteriaText (value: string) {
		let items=[];
		items=this.state.criteres_values;
		items.push(this.state.rowID);
		/*alert(JSON.stringify(this.state.target_id)); */
        this.setState({
			criteres_values:items,

		});
	}
  onValueChangeBoolean (value: string) {
	this.setState({
		selected5 : value
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
						ref={rowID}
						mode="dropdown"
						selectedValue={this.state.rowID}
						onValueChange={(value:string) => this.setState({rowID:value})}>   
							{/*onValueChangeCouleur (value: string) {
			this.setState({
				selected2 : value
		});
	}*/}
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
					ref={rowID}
					placeholder={rowID}
					style={{width:100, textAlign :"left"}}
					keyboardType='numbers-and-punctuation'
					onChangeText={(text) => this.setState({rowID:text})}
					value={this.state.rowID}
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
						ref={rowID}
						placeholder={rowID}
						keyboardType="default"
						value={this.state.rowID}
						onChangeText={(text) => this.setState({rowID:text})}
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
				renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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