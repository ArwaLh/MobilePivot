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
  SectionList,
  BackAndroid,
  AsyncStorage,
  TouchableHighlight,
  ListView,
  Platform,
  Picker,
  ProgressBar,
  TextInput,
  View
} from 'react-native';

import HeaderSearch from '../components/headerSearch';
import ValidMetaDynamic from './validMetaDynamic';
import styles from '../styles/common-styles.js';
import {Button, List, ListItem, Header} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import firebase from 'firebase';

export default class uploadFormDynamique extends Component {
	constructor (props) {
		super(props);
		this.itemsRef = firebase.database().ref("categories");
		this.state = {
		  medecin_id:"",
		  loaded:true,
		  dossier_id: '',
		  medecin_id: '',
		  selected_boolean: 'Non',
		  selected_text: '',
		  array_all: [],
		  input_num:"",
		  input_txt: "",
		  target_value: '',
		  criteres_values:[],
		  target_id: '',
		  patient_id: '',
		  list_length:"",
		  items:[],
		  med_pat_file:{},
		  my_textinput_array:[],
		}
		AsyncStorage.removeItem('valid_meta');
		this.goBack = this.goBack.bind(this);
		this.validMetadataDynamic = this.validMetadataDynamic.bind(this);
	}
 componentWillMount(){
	 AsyncStorage.removeItem('valid_meta');
	 this.setState({criteres_values:[]});
	AsyncStorage.getItem('path').then((pathUp) => {                                                   
	  this.setState({
		path:pathUp
	  });	
	  path= this.state.path;
	});
  }
 componentDidMount(){
	AsyncStorage.removeItem('valid_meta');
	// this.setState({criteres_values:[]});
	AsyncStorage.getItem('med_pat_file_location').then((med_pat_file_locationn) => {
	  const array=JSON.parse(med_pat_file_locationn);
	  this.itemsRef.child(array.id_medecin).child(array.motif).child("criteres").on('value', (snap) => {//get the criterias list
	    let array_cat=[];		
	    let items=[];
	    items=snap.val();
	    for (var k in items){
		  if (items.hasOwnProperty(k)) {
			array_cat.push({"key":k,"type":items[k].type_critere});	
		  }
	    }
	    this.setState({
			array_all:array,
			my_textinput_array:array_cat,
			list_length:array_cat.length
	    });
	  });
	});
  }
/*   removeDuplicates( arr, prop ) {
  var obj = {};
  for ( var i = 0, len = arr.length; i < len; i++ ){
    if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
  }
  var newArr = [];
  for ( var key in obj ) newArr.push(obj[key]);
  return newArr;
  } */
		
  /*removeDuplicates(arr){
    let unique_array = []
    for(let i = 0;i < arr.length; i++){
		alert(arr.indexOf(arr[i]["criteria_name"]));
        if(unique_array.indexOf(arr[i]["criteria_name"]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
  }*/
  validMetadataDynamic(){	
	AsyncStorage.setItem('med_pat_file_location_image_data', JSON.stringify({
	"id_medecin":this.state.array_all.id_medecin,
	"id_patient":this.state.array_all.id_patient,
	"id_dossier":this.state.array_all.id_dossier,
	"nombre_images_dossier":this.state.array_all.nombre_images_dossier,
	"motif":this.state.array_all.motif,
	"id_motif":this.state.array_all.id_motif,
	"nombre_images_motif":this.state.array_all.nombre_images_motif,
	"imageURL":this.state.path
	})); 
 
	
	//let arr= this.removeDuplicates(this.state.criteres_values);
	//alert(arr)
	//alert(JSON.stringify(this.state.criteres_values))
	//alert(JSON.stringify(result[0]))
	//alert(JSON.stringify(arr.length));
	/*if(this.state.criteres_values.length !== this.state.my_textinput_array.length){
		AsyncStorage.removeItem('valid_meta');   
		AsyncStorage.setItem('valid_meta', JSON.stringify(this.state.criteres_values)); 
	}else{ */
		AsyncStorage.removeItem('valid_meta');   
		AsyncStorage.setItem('valid_meta', JSON.stringify(this.state.criteres_values)); 
	  this.props.navigator.push({
		component: ValidMetaDynamic
	  }); 
  } 
  focusNextField(newtField){
	this.refs[newtField].focus();
  }  
  goBack() {
	this.props.navigator.pop();
	return true;
  }
  render() {
	  
	 let items_names=new Array(this.state.list_length);
	for (var i = 0; i< this.state.list_length; i++){
		items_names[i]="";
	}
	let Arr = this.state.my_textinput_array.map((data) => {
      return (
	  <View style={styles.subBody}>
         <View>
          {data.type=="Boolean" ? (
			<Grid>
			  <Row>
				<Col>  
					<Text style={styles.upload_dynamic}> {data.key.replace(/_/g , " ")}</Text>
				</Col>
				<Col style={{ marginLeft:80}}>	
                   <Picker 
						style={{width:100, color:"#29235c",marginTop:10}}
						mode="dropdown"
						key={items_names[i]}
						selectedValue={items_names[i]}
						onValueChange={(value) => {
							items_names[i]=value;
							const criteres_values = this.state.criteres_values;
							const criteria_name=data.key;
							/*if(criteres_values_bool["criteria_name"] === data.key){
								alert(data.key)
							}*/
							criteres_values.push({"criteria_name":criteria_name,"value":items_names[i]});
							this.setState({criteres_values:criteres_values});
							}}>   
							<Item label="Oui" value="Oui" />
							<Item label="Non" value="Non" />
					</Picker>
				</Col>
			  </Row>
			</Grid>
          ):data.type=="Numérique" ? (
			<Grid>
			  <Row>
				<Col>  
					<Text style={styles.upload_dynamic}> {data.key.replace(/_/g , " ")}</Text>
				</Col>
				<Col style={{ marginLeft:80}}>	
				  <TextInput
					placeholder={data.key.replace(/_/g , " ")}
					key={items_names[i]}
					style={{width:100, textAlign :"left"}}
					keyboardType='numbers-and-punctuation'
					value={items_names[i]}
					blurOnSubmit={true}
					onSubmitEditing={() => {
						const criteres_values = this.state.criteres_values;
						const criteria_name=data.key;
						/*if(criteres_values_num["criteria_name"] === data.key){
							alert(data.key)
						}*/
						criteres_values.push({"criteria_name":criteria_name,"value":items_names[i]});
						this.setState({criteres_values:criteres_values});
						}}
					onChangeText={(text2) => {
						items_names[i]=text2;
					}}
					maxLength ={10}
					underlineColorAndroid="#29235c"
					/>
				</Col>
			  </Row>
			</Grid>
            ):<View>
			<Grid>
			  <Row>
				<Col>
					<Text style={styles.upload_dynamic}>{data.key.replace(/_/g , " ")}</Text>
				</Col>
				<Col style={{ marginLeft:80}}>
					<TextInput
						placeholder={data.key.replace(/_/g , " ")}
						key={items_names[i]}
						keyboardType="default"
						value={items_names[i]}
						blurOnSubmit={true}
						onSubmitEditing={() => {
							const criteres_values = this.state.criteres_values;
							const criteria_name=data.key;
							/*if(criteres_values_text["criteria_name"] === data.key){
								alert(data.key)
							}*/
							criteres_values.push({"criteria_name":criteria_name,"value":items_names[i]});
							this.setState({criteres_values:criteres_values});
						}}
						onChangeText={(text) => {
							items_names[i]=text;
						}}
						style={{width:100, textAlign :"left"}}
						underlineColorAndroid="#29235c"
					/>
				</Col>	
			  </Row>
			</Grid>
		  </View>}
     </View>
  </View>
	  );                         
    })    
    return ( 
	<View>
	  <HeaderSearch text="Upload Photo" onpress={this.goBack}/>
	<ScrollView>
		<ListItem style={{marginRight:10,marginLeft:15, borderColor:'#29235c'}}>
			<Image style={styles.pic_cam} source={{uri:this.state.path}}/>
		</ListItem>
		<View>
		 { Arr }
		</View>
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