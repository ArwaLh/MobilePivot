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
import ValidMeta from './validMeta';
import Phototype from './phototype';
export default class uploadFormDynamique extends Component {
	constructor (props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
		  medecin_id:"",
		  dataSource: ds.cloneWithRows(['row 1', 'row 2']),
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
		}
		this.validMetadata = this.validMetadata.bind(this);
		this.phototypeb = this.phototypeb.bind(this);
		this.goBack = this.goBack.bind(this);
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
		
	validMetadata(){
		
		alert(this.state.med_pat_file.nombre_images_dossier);
		AsyncStorage.removeItem('med_pat_file_location_image_data');
		AsyncStorage.setItem('med_pat_file_location_image_data', JSON.stringify({
			"id_medecin":this.state.medecin_id,
			"id_patient":this.state.patient_id,
			"id_dossier":this.state.dossier_id,
			"categorie":this.state.categorie,
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
	<HeaderUp text=" 3/4 Upload Photo" loaded={this.state.loaded} onpress={this.goBack}/>
	<ScrollView>
		    <ListView dataSource={this.state.dataSource}
		enableEmptySections={true}
        renderRow={(rowData) => 
					<List>
					  <ListItem style={{height:60, borderColor:'#29235c', width:340, paddingTop:0}}>
							<TextInput
								ref="diametre"
								style={{width:45, textAlign :"center"}}
								underlineColorAndroid="#29235c"
							  /> 
					  </ListItem>
					</List>
					} style={{backgroundColor: 'white'}}/>		
         </ScrollView> 
	</View>
    );
  }
}

AppRegistry.registerComponent('uploadFormDynamique', () => uploadFormDynamique);