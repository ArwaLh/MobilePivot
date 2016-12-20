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
import UploadForm from './uploadForm';

export default class validMeta extends Component {
	constructor (props) {
    super(props);
		this.state = {
			bords: '',
			couleur: '',
			loaded: true,
			textColor2: '#29235c',
			dossier_id: '',
			medecin_id: '',
			patient_id: ''
		}
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


	componentWillMount(){
		AsyncStorage.getItem('update_data').then((update_dataa) => {
		  const arr =JSON.parse(update_dataa);
		  this.setState({
			bords: arr.Bords_value,
			couleur: arr.Couleur_value,
			asymetrie: arr.Asymetrie_value,
			phototype: arr.Phototype_value,
			sed: arr.Sed_Value,
			diametre: arr.Diametre_value,
			epaisseur: arr.Epaisseur_value,
			suspicion: arr.Suspicion_value
			
		  });
		});	
	}
  render() {
    return ( 
	<View>
	<HeaderUp text="4/4 Données patient" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
		<ScrollView>	
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Bords</Text>
							  </Col>
							  <Col>
								 <Text  style={styles.metaDataForm2} >{this.state.bords}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem>	
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Couleur</Text>
							  </Col>
							  <Col>
									 <Text  style={styles.metaDataForm2} >{this.state.couleur}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem> 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Asymétrie</Text>
							  </Col>
							  <Col>
									<Text style={styles.metaDataForm3}>{this.state.asymetrie}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem>
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Phototype </Text>
							  </Col>
							  <Col>
									 <Text style={styles.phototypeF}> Phototype {this.state.phototype}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem> 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>SED </Text>
							  </Col>
							  <Col>
									 <Text style={styles.metaDataForm3} > {this.state.sed}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem> 	  
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Diamètre</Text> 
							  </Col>
							  <Col>
									<Text style={styles.metaDataForm3}>{this.state.diametre}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem> 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Epaisseur</Text> 
							  </Col>
							  <Col>
								<Text style={styles.metaDataForm3}> {this.state.epaisseur}</Text>
							 </Col> 
						   </Grid>			 
			</ListItem>	 
			<ListItem style={styles.list_MetaData}>   
						  <Grid>
							  <Col>
									<Text style={styles.metaDataForm}>Suspicion</Text> 
							  </Col>
							  <Col>
									<Text style={styles.mélanomeF}> Mélanome: {this.state.suspicion}%</Text>
							 </Col> 
						   </Grid>			 
			</ListItem>	 
					
					  <Grid>
							  <Col style={{width:200}}>
								 <Button onPress={this.uploadP.bind(this)} textStyle={{fontFamily: 'Roboto',fontSize:13,color: this.state.textColor2, marginTop:10}} transparent>
								   
										 MODIFIER LES INORMATIONS
								 </Button> 
							  </Col>
							 <Col>	
								<Button
									style={{flex:9,backgroundColor: "#29235c",width:130,height:37,marginTop:8,alignItems:'center'}}
									textStyle={{fontSize: 15, color:'#fff'}}>Envoyer</Button>
							</Col>	
					 </Grid>			
		</ScrollView>   
	</View>
    );
  }
}
AppRegistry.registerComponent('validMeta', () => validMeta);