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
import TakePic from './takePic';
export default class gestionNaevusDynamique extends Component {
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
			med_pat_filee: [],
			patient_id: '',
			medecin_id: '',
			nom_pat: '',
			prenom_pat: '',
		};
	}
	componentWillMount(){
		//date_compte_rendu_consultation
		AsyncStorage.getItem('med_pat_file').then((patient_medecin_arrayy_loc) => {
			const arr=JSON.parse(patient_medecin_arrayy_loc);
			alert(arr.emplacement);
			alert(arr.id_medecin);
			this.setState({
				med_pat_filee:arr,
				id_doc:arr
			});
			//get images data
			this.itemsRef.child('medecins').child(arr.id_medecin).child('patients').child(arr.id_patient).child('dossiers_medicaux').child(arr.id_dossier).child("images").on('child_added', (snap) => {
				//let items=[];
				// get children as an array
				this.setState({
				  dataSource: this.state.dataSource.cloneWithRows(snap.val()),
				});
			});
		});
	}
	goBack() { 
		this.props.navigator.pop();
		return true;
	} 
	old_fichier(){
		
	}
	nouveau_fichier(){
		AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.med_pat_filee.id_medecin,"id_patient":this.state.med_pat_filee.id_patient,"id_dossier":this.state.med_pat_filee.id_dossier,"nombre_images_dossier":this.state.med_pat_filee.nombre_images_dossier,"categorie":this.state.med_pat_filee.categorie,"emplacement":this.state.med_pat_filee.emplacement}));
		this.props.navigator.push({
          component: TakePic
        }); 
	}
  render() {
    return ( 
	<View style={{backgroundColor: 'white'}}>
		<HeaderUp text="Gestion des fichiers " loaded={true} onpress={this.goBack.bind(this)}/>
		<ScrollView style={{backgroundColor: '#fff'}}>
			<View style={{flex:1}}>
				<ListItem style={{borderColor:'#29235c', width:340}}>
				   <Grid>
						<Col style={{width:70}}>
						<Image style={{width:65,height:60, marginTop:10}} source={{uri:'http://localhost:8081/img/Icdossier.png'}}/>
						</Col>
						<Col>
						<Text style={{color: "#29235c",margin:10,fontSize:18,fontFamily: 'Roboto',fontWeight:"bold"}}> Dossier {this.state.med_pat_filee.emplacement}</Text>
						<Text style={{color: "#a8a8a8",marginLeft:10,fontSize:11,fontFamily: 'Roboto',fontWeight:"bold"}}>Nombre d'image: <Text style={styles.listViewText2}>{this.state.med_pat_filee.nombre_images_dossier}</Text></Text>							
						<Text style={{color: "#a8a8a8",marginLeft:10,fontSize:11,fontFamily: 'Roboto',fontWeight:"bold"}}>Catégorie: <Text style={styles.listViewText2}>{this.state.med_pat_filee.categorie}</Text></Text>							
						<Text style={{color: "#a8a8a8",marginLeft:10,fontSize:11,fontFamily: 'Roboto',fontWeight:"bold"}}>Date de création: <Text style={styles.listViewText2}>{this.state.med_pat_filee.date_creation_dossier}</Text></Text>
						<Text style={{color: "#a8a8a8",marginLeft:10,fontSize:11,fontFamily: 'Roboto',fontWeight:"bold"}}>Date de derniére image: <Text style={styles.listViewText2}>{this.state.med_pat_filee.date_MAJ}</Text></Text>
						</Col>
					</Grid>
				</ListItem>	
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

AppRegistry.registerComponent('gestionNaevusDynamique', () => gestionNaevusDynamique);