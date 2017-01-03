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
  TextInput,
  Image,
  Dimensions,
  ListView,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { List, ListItem, Button, Grid, Col, Row} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';import Hr from 'react-native-hr';
const window = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import firebase from 'firebase';
import LocatePic from './locatePic';
export default class gestionNaevus extends Component {
	constructor (props) {
		super(props);
		this.itemsRef = firebase.database().ref();
		this.state = {
			dataSource: new ListView.DataSource({
			  rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			patient: null,
			id_doc:"",
			dossiers_medicaux: [],
			patient_id: '',
			medecin_id: '',
			nom_pat: '',
			prenom_pat: '',
		};
	}
	componentDidMount(){
		AsyncStorage.getItem('med_pat_file').then((patient_medecin_arrayy_loc) => {
			const arr=JSON.parse(patient_medecin_arrayy_loc);
			alert(patient_medecin_arrayy_loc.id_dossier);
			this.setState({
				id_doc:arr
			});
		});
	}
	goBack() { 
		this.props.navigator.pop();
		return true;
	}    
	          
	localiser_photo(id){
		alert(id);
		AsyncStorage.removeItem("med_pat_file_loc");
		AsyncStorage.setItem("med_pat_file_loc",JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":id}));
		this.props.navigator.push({
          component: LocatePic
        }); 
	}
	nouveau_fichier(){
		let my_date=new Date();
		let dossier_id=this.state.medecin_id+'_'+this.state.patient_id+'_'+this.state.dossiers_medicaux.length;
		this.itemsRef.child('medecins/'+this.state.medecin_id+'/patients/'+this.state.patient_id).child('dossiers_medicaux/'+dossier_id).set({ 
			date_creation_dossier: my_date.toString(),
			date_MAJ_dossier: my_date.toString(),
			nom_patient_dossier: this.state.patient.nom_pat,
			prenom_patient_dossier: this.state.patient.prenom_pat,
			telephone_patient_dossier: this.state.patient.telephone_patient,
			nombre_images_dossier: 0,
			categorie: "grain de beauté"
		})
	}
  render() {
    return ( 
	<View style={{backgroundColor: 'white'}}>
	<HeaderUp text="Gestion des fichiers" loaded={true} onpress={this.goBack.bind(this)}/>
	<ScrollView style={{backgroundColor: '#fff'}}>
	<View style={{flex:1}}>
	<ListItem style={{borderColor:'#29235c', width:340}}>
	   <Grid>
			<Row><Text style={{color: "#29235c",marginLeft:10,fontSize:23,fontFamily: 'Roboto',fontWeight:"bold"}}> Naevus:{this.state.id_doc.id_dossier}</Text></Row>
		</Grid>
	</ListItem>	
		<ListView dataSource={this.state.dataSource}
		enableEmptySections={true}
        renderRow={(rowData) => 
					<List style={{backgroundColor:'white',height:180, borderColor:'#29235c'}}>
					  <ListItem style={{height:180, borderColor:'#29235c', width:340, paddingTop:0}}>
					  <Button style={{height:180}} onPress={this.localiser_photo.bind(this,rowData._key)} transparent>
						<Grid>
						<Col style={{width:70, height:120}}>
						<Image style={{width:75,height:95, marginTop:10}} source={{uri:'http://localhost:8081/img/Icfichier.png'}}/>
						</Col>
						<Col style={{width:230, margin:20}}>				
							<Text style={styles.listViewText1}>Date de consultation</Text>
							<Text style={styles.listViewText2}>{rowData.date_creation_dossier.substring(0,24)}</Text>
						</Col>
						</Grid>
					  </Button>
					  </ListItem>
					</List>
					} style={{backgroundColor: 'white'}}/>		
		<List style={{backgroundColor: 'white',height:100}}>
			<ListItem>
				<Button style={{height:120}} onPress={this.nouveau_fichier.bind(this)}transparent>
				  <Icon name="plus-square-o" style={{color: '#29235c', fontSize: 60, width:70,marginLeft: (window.width/2)-50}}/> 	
				</Button>
            </ListItem>
        </List>
	</View>
	</ScrollView>   
	</View>
    );
  }
}

AppRegistry.registerComponent('gestionNaevus', () => gestionNaevus);