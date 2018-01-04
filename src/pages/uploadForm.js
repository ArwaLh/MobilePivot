/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Image,
  Dimensions,
  ScrollView,
  BackAndroid,
  AsyncStorage,
  Platform,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import HeaderSearch from '../components/headerSearch';
import styles from '../styles/common-styles.js';
import {Button, List, ListItem, Header, Picker} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import ValidMeta from './validMeta';
const window = Dimensions.get('window');
import Phototype from './phototype';

export default class uploadForm extends Component {
  constructor (props) {
	super(props);
	this.state = {
	  loaded:true,
	  choisir:'choisir',
	  phototype: '',
	  sed:'',
	  mel: 0.0,
      selected1: 'Régulier',
	  selected2: 'Brun foncé',
	  selected3: 'Oui',
	  selected4: '0.2',
	  selected5: '0.2',
	  diametre: '0.0',
	  epaisseur: '0.0',
	  dossier_id: '',
	  medecin_id: '',
	  patient_id: '',
	  med_pat_file:{},
	  x: '',
      y: '',
      width: '',
      height: '',
      viewHeight: 100
	}
	this.goBack=this.goBack.bind(this);
	this.validMetadata=this.validMetadata.bind(this);
	this.onValueChangeBords=this.onValueChangeBords.bind(this);
	this.onValueChangeCouleur=this.onValueChangeCouleur.bind(this);
	this.onValueChangeAsymetrie=this.onValueChangeAsymetrie.bind(this);
	this.onValueChangeDiametre=this.onValueChangeDiametre.bind(this);
	this.onValueChangeEpaisseur=this.onValueChangeEpaisseur.bind(this);
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
	});
	AsyncStorage.getItem('Sed_Value').then((phototypeSED) => {
	  this.setState({
		sed: phototypeSED
	  });
	});
	AsyncStorage.getItem('Phototype_value').then((phototypee) => {
	  this.setState({
		phototype: phototypee
	  });
	});
  }
  onValueChangeBords (value: string) {
	this.setState({
	  selected1 : value
	});
  }
  onValueChangeCouleur (value: string) {
	this.setState({
	  selected2 : value
	});
  }
  onValueChangeAsymetrie (value: string) {
	this.setState({
	  selected3 : value
	});
  }	
  onValueChangeDiametre (value: string) {
	this.setState({
	  selected4 : value
	});
  }	
  onValueChangeEpaisseur (value: string) {
	this.setState({
	  selected5 : value
	});
  }	
  validMetadata(){
	AsyncStorage.removeItem('med_pat_file_location_image_data');
	AsyncStorage.setItem('med_pat_file_location_image_data', JSON.stringify({
	"id_medecin":this.state.medecin_id,
	"id_patient":this.state.patient_id,
	"id_dossier":this.state.dossier_id,
	"motif":this.state.med_pat_file.motif,
	"id_motif":this.state.med_pat_file.id_motif,
	"nombre_images_dossier":this.state.med_pat_file.nombre_images_dossier,
	"nombre_images_motif":this.state.med_pat_file.nombre_images_motif,
	"imageURL":this.state.path,
	'bords':this.state.selected1,
	'couleur':this.state.selected2,
	'asymetrie':this.state.selected3,
	'phototype':this.state.phototype,
	'sed':this.state.sed,
	'diametre':this.state.diametre,
	'epaisseur':this.state.epaisseur,
	'suspicion':this.state.mel
	}));  
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
  goBack() {
	this.props.navigator.pop();
	return true;
  }
  render() {
    return ( 
	<View>
	  <HeaderSearch text="Upload Photo" onpress={this.goBack}/>
	  <ScrollView>
		<ListItem style={{marginRight:10,marginLeft:15, borderColor:'#29235c'}}>
		  <Image style={styles.pic_cam} source={{uri:this.state.path}}/>
		</ListItem>
		<Grid>
		  <Row>
			<Col>  
			  <Text style={styles.bords}>Bords</Text>
			</Col>
			<Col style={{ marginLeft:80}}>	
			  <Picker 
				style={{width:130, color:"#29235c" }}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChangeBords.bind(this)}>  
				  <Item label="Régulier" value="Régulier" />
				  <Item label="Irrégulier" value="Irrégulier" />
			  </Picker>
		    </Col>
		  </Row>
		  <Row>
			<Col>
			  <Text style={styles.couleur}>Couleur</Text>
			</Col>
			<Col style={{ marginLeft:50}}>	
			  <Picker
				style={{width:145, color:"#29235c" }}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChangeCouleur.bind(this)}>  
				  <Item label="Brun foncé" value="Brun foncé" />
				  <Item label="Brun clair" value="Brun clair" />
			  </Picker>
			</Col>
		  </Row>	
		  <Row>
			<Col style={{width:140}}>
			  <Text style={styles.asymetrie}>Asymétrie</Text>
			</Col>
			<Col style={{ marginLeft:110}}>
			  <Picker 
				style={{width:100, color:"#29235c" }}
                iosHeader="Select one"
                mode="dropdown"
                selectedValue={this.state.selected3}
                onValueChange={this.onValueChangeAsymetrie.bind(this)}>  
				  <Item label="Oui" value="Oui" />
				  <Item label="Non" value="Non" />
			  </Picker>
			</Col>	
		  </Row>
		  <Row style={{marginBottom:5}}>
			<Col style={{width:140}}>
			  <Text style={styles.phototypee}>Phototype</Text>
			</Col>
			<Col style={{width:190}}>
			  <Button
			    onPress={this.phototypeb.bind(this)}
				style={{borderColor: "#53507c",width:150,height:35,marginLeft:50,marginTop:9}}
				textStyle={{fontSize: 15, color:'#53507c'}}
				bordered> phototype <Text> {this.state.phototype}</Text></Button>
			</Col>
          </Row>
		  <Row>
			<Col style={{width:140}}>
			  <Text style={styles.diametre}>Diamètre</Text>
			</Col>
			<Col style={{ marginLeft:160,marginTop:0, color:"#29235c"}}>
			  <TextInput
				ref="diametre"
				style={{width:45, textAlign :"center",marginTop:0, color:"#29235c"}}
				onChangeText={(text) => this.setState({diametre: text})}
				value={this.state.diametre}
				keyboardType='phone-pad'
				maxLength = {5}
				underlineColorAndroid="#29235c"
			  />
			</Col>	
		  </Row>
		  <Row>
			<Col style={{width:140}}>
			  <Text style={styles.asymetrie}>Epaisseur</Text>
			</Col>
			<Col style={{marginLeft:160}}>
			  <TextInput
				ref="epaisseur"
				style={{width:45, color:"#29235c", textAlign :"center"}}
				onChangeText={(text) => this.setState({epaisseur: text})}
				value={this.state.epaisseur}
				placeholder={""}
				keyboardType = 'phone-pad'
				maxLength = {5}
				placeholderTextColor="#fff"
				underlineColorAndroid="#29235c"
			  />
			</Col>	
		  </Row> 
	      <Row>
			<Col>
			  <Text style={styles.suspicion}>Suspicion</Text>
			</Col>
			<Col>
			  <Text style={styles.melanome}> Mélanome:{this.state.mel}% </Text>
			</Col>
		  </Row>
		  <Row>	
			<Slider
				ref="mel"
				value={this.state.mel}
				style={styles.slidee}
				minimumValue={0}
				maximumValue={100}
				step={1}
				onValueChange={(value) => this.setState({mel:value})} >
			</Slider>
		  </Row>			
	    </Grid>
	    <ListItem>
		  <Button
		    onPress={this.validMetadata.bind(this)}
			style={styles.go_to_valid_meta_button}
			textStyle={styles.go_to_valid_meta_text}
			>Valider</Button>
	    </ListItem>
	  </ScrollView> 
	</View>
    );
  }
}

AppRegistry.registerComponent('uploadForm', () => uploadForm);