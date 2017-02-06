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
import GestionFichier from './gestionFichier';
export default class gestionNaevus extends Component {
	constructor (props) {
		super(props);
		this.itemsRef = firebase.database().ref();
		this.state = {
			dataSource: new ListView.DataSource({
			  rowHasChanged: (row1, row2) => row1 !== row2,
			}),
			patient: null,
			dossiers_medicaux: [],
			patient_id: '',
			medecin_id: '',
			categorie_id: '',
			nom_pat: '',
			prenom_pat: '',
		};
	}
	componentDidMount(){
		AsyncStorage.getItem('medecin_patient').then((patient_medecin_arrayy) => {
			const arr=JSON.parse(patient_medecin_arrayy);
			this.itemsRef.child('medecins').child(arr.medecin_id).child('patients').child(arr.patient_id).child('dossiers_medicaux').on('value', (snap) => {
			let items=[];
			// get children as an array
			snap.forEach((child) => {
				items.push({
					nom_patient_dossier: child.val().nom_patient_dossier,
					prenom_patient_dossier: child.val().prenom_patient_dossier,
					nombre_images_dossier: child.val().nombre_images_dossier,
					telephone_patient_dossier: child.val().telephone_patient_dossier,
					date_creation_dossier: child.val().date_creation_dossier,
					date_MAJ_dossier: child.val().date_MAJ_dossier,
					emplacement: child.val().emplacement,
					categorie: child.val().categorie,
					_key: child.key
				});
			});
			this.setState({
			  dataSource: this.state.dataSource.cloneWithRows(items),
			  patient_id: arr.patient_id,
			  medecin_id: arr.medecin_id,
			  category_id: arr.categorie,
			});
			//const patients_array = items;
			const dossiers_medicaux = items; 
			this.setState({ dossiers_medicaux });
			});
			let patient_a=null;
			this.itemsRef.child('medecins').child(arr.medecin_id).child('patients').orderByKey().equalTo(arr.patient_id).once("child_added", function(snapshot) {
				patient_a = snapshot.val(); 
			});
			alert(patient_a);
			this.setState({
				patient:patient_a,
				patient_name:patient_a.nom_pat,
				patient_tel:patient_a.telephone_patient,
				patient_lastname:patient_a.prenom_pat
			});
		});
	}
	goBack() { 
		this.props.navigator.pop();
		return true;
	}
	gestionF(id,nbre){
		alert(id);
		AsyncStorage.removeItem("med_pat_file");
		AsyncStorage.setItem("med_pat_file",JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":id,"categorie":this.state.category_id,"nombre_images_dossier":nbre,"emplacement":this.state.dossiers_medicaux.emplacement})); 
		//if emplacement =="" redirection vers l'interface localiser photo
		//else redirection vers l'interface gestion fichier
		this.props.navigator.push({
		  component: GestionFichier
		});
	}
	nouveau_dossier(){
		let my_date=new Date();
		let dossier_id=this.state.medecin_id+'_'+this.state.patient_id+'_'+this.state.dossiers_medicaux.length;
		this.itemsRef.child('medecins').child(this.state.medecin_id).child('patients').child(this.state.patient_id).child('dossiers_medicaux').child(dossier_id).set({ 
			date_creation_dossier: my_date.toString(),
			date_MAJ_dossier: my_date.toString(),
			nom_patient_dossier: this.state.patient_name,
			emplacement: "",
			prenom_patient_dossier: this.state.patient_lastname,
			telephone_patient_dossier: this.state.patient_tel,
			nombre_images_dossier: 0,
			categorie_id:this.state.category_id
		})
		//set JSON array
		AsyncStorage.removeItem("med_pat_file");
		AsyncStorage.setItem("med_pat_file",JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":dossier_id,"categorie":this.state.category_id,"nombre_images_dossier":0,"emplacement":""})); 
		//redirect to locate picture
		this.props.navigator.push({
		  component: LocatePic
		});
	}
  render() {
    return ( 
	<View style={{backgroundColor: 'white'}}>
	<HeaderUp text="Gestion des dossiers" loaded={true} onpress={this.goBack.bind(this)}/>
	<ScrollView style={{backgroundColor: '#fff'}}>
	<View style={{flex:1}}>
		<ListItem style={{borderColor:'#29235c', width:340}}>
		   <Grid>
				<Row><Text style={{color: "#29235c",marginLeft:10,fontSize:20,fontFamily: 'Roboto',fontWeight:"bold"}}>{this.state.patient_name} {this.state.patient_lastname}</Text></Row>
				<Row><Text style={{color: "#29235c",marginLeft:13,marginBottom:0,fontSize:15,fontFamily: 'Roboto'}}>Téléphone : {this.state.patient_tel}</Text></Row>
			</Grid>
		</ListItem>	
		<Text style={{color:'#29235c',margin:10,marginLeft:22,fontSize:18,fontFamily:'Roboto'}}>Les dossiers médicaux </Text>
		<ListView dataSource={this.state.dataSource}
		enableEmptySections={true}             
        renderRow={(rowData) => 
					<List style={{backgroundColor:'white',height:140, borderColor:'#29235c'}}>
					  <ListItem style={{height:140, borderColor:'#29235c', width:340, paddingTop:0}}>
					  <Button style={{height:140}} onPress={this.gestionF.bind(this,rowData._key,rowData.nombre_images_dossier)} transparent>							
						<Grid>
						<Col style={{width:70}}>
						<Image style={{width:65,height:60, marginTop:10}} source={{uri:'http://localhost:8081/img/Icdossier.png'}}/>
						</Col>
						<Col style={{width:250, margin:10}}>
							<Text style={styles.listViewTitle}> Dossier  {rowData.emplacement}</Text> 
							<Text style={styles.listViewText1}>Nombre d'image: <Text style={styles.listViewText2}>{rowData.nombre_images_dossier}</Text></Text>							
							<Text style={styles.listViewText1}>Date de création: <Text style={styles.listViewText2}>{rowData.date_creation_dossier.substring(0,24)}</Text></Text>
							<Text style={styles.listViewText1}>Date de derniére image: <Text style={styles.listViewText2}>{rowData.date_MAJ_dossier.substring(0,24)}</Text></Text>
						</Col>
						</Grid>
					  </Button>
					  </ListItem>
					</List>
					} style={{backgroundColor: 'white'}}/>		
		<List style={{backgroundColor: 'white',height:100}}>
			<ListItem>
				<Button style={{height:120}} onPress={this.nouveau_dossier.bind(this)}transparent>
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