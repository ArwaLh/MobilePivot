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
  Picker,
  ProgressBar,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import {Button, List, ListItem, Header} from 'native-base';
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
		this.goBack = this.goBack.bind(this);
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
		alert(array.id_medecin);
		//get the criterias list
		this.itemsRef.child(array.id_medecin).child(array.categorie).child("criteres").on('value', (snap) => {
			let array_cat=[];		
			let items=[];
			items=snap.val();
			for (var k in items){
				if (items.hasOwnProperty(k)) {
					 array_cat.push({"key":k,"type":items[k].type_critere});	
				}
			}
			alert(array_cat.length);
			this.setState({
			  dataSource: this.state.dataSource.cloneWithRows(array_cat),
			  my_textinput_array:array_cat,
			  list_length:array_cat.length
			});
		});
		});
	}
		
 	validMetadataDynamic(){
	
	alert(JSON.stringify(this.state.criteres_values));

	AsyncStorage.removeItem('med_pat_file_location_image_data');
	AsyncStorage.setItem('med_pat_file_location_image_data', JSON.stringify(this.state.criteres_values));   
 		this.props.navigator.push({
		  component: ValidMetaDynamic
		  
		}); 
	  } 
  /*change the cursor to the next field*/
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
		items_names[i]="state"+i;
	}
	let Arr = this.state.my_textinput_array.map((data) => {
      return (
	  <View style={styles.subBody}>
         <View>
          {data.type=="Boolean" ? (
			<Grid>
			  <Row>
				<Col>  
					<Text key={items_names[i]} style={styles.upload_dynamic}> {data.key}</Text>
				</Col>
				<Col style={{ marginLeft:80}}>	
                   <Picker 
						style={{width:100, color:"#29235c",marginTop:10}}
						ref={data.key}
						mode="dropdown"
						selectedValue={items_names[i]}
						onValueChange={(value) => {
							items_names[i]=value;
							const criteres_values = this.state.criteres_values;
							const criteria_name=data.key;
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
					<Text key={items_names[i]} style={styles.upload_dynamic}> {data.key}</Text>
				</Col>
				<Col style={{ marginLeft:80}}>	
				  <TextInput
					ref={data.key}
					placeholder={data.key}
					style={{width:100, textAlign :"left"}}
					keyboardType='numbers-and-punctuation'
					value={items_names[i]}
					blurOnSubmit={true}
					onSubmitEditing={(text2) => {
						const criteres_values = this.state.criteres_values;
						const criteria_name=data.key;
						criteres_values.push({"criteria_name":criteria_name,"value":items_names[i]});
						this.setState({criteres_values:criteres_values});
						}}
					onChangeText={(text2) => {
						items_names[i]=text2;
					}}
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
					<Text key={items_names[i]} style={styles.upload_dynamic}>{data.key}</Text>
				</Col>
				<Col style={{ marginLeft:80}}>
					<TextInput
						ref={data.key}
						placeholder={data.key}
						keyboardType="default"
						value={items_names[i]}
						blurOnSubmit={true}
						onSubmitEditing={(text) => {
							const criteres_values = this.state.criteres_values;
							let criteria_name=data.key;
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
	<HeaderUp text=" 3/4 Upload Photo" loaded={this.state.loaded} onpress={this.goBack}/>
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