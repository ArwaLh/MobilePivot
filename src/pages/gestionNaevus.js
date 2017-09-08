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
  ListView,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { List, ListItem, Button, Grid, Col, Row} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';import Hr from 'react-native-hr';
const window = Dimensions.get('window');
import firebase from 'firebase';
import LocatePic from './locatePic';
import GestionFichier from './gestionFichier';
import GestionFichierDynamique from './gestionFichierDynamique';

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
		patient_name:'',
		patient_tel:'',
		patient_lastname:''
	};
	this.gestionF=this.gestionF.bind(this);
	this.nouveau_dossier=this.nouveau_dossier.bind(this);
  }
  componentDidMount(){
	let that=this;
	AsyncStorage.getItem('medecin_patient').then((patient_medecin_arrayy) => {
	  const arr=JSON.parse(patient_medecin_arrayy);
	  that.itemsRef.child('medecins').child(arr.id_medecin).child('patients').child(arr.id_patient).child('dossiers_medicaux').on('value', (snap) => {
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
			categorie_id: child.val().categorie_id,
			_key: child.key
		});
	  });
	  that.setState({
		dataSource: that.state.dataSource.cloneWithRows(items),
		patient_id: arr.id_patient,
		medecin_id: arr.id_medecin,
		category_id: arr.categorie,
	  });
	  const dossiers_medicaux = items; 
	  that.setState({ dossiers_medicaux });
	  });
	  let patient_a=null;
	  that.itemsRef.child('medecins').child(arr.id_medecin).child('patients').orderByKey().equalTo(arr.id_patient).once("child_added", function(snapshot) {
		patient_a = snapshot.val(); 
	  });
	  that.setState({
		patient:patient_a,
		patient_name:patient_a.nom_pat,
		patient_tel:patient_a.telephone_patient,
		patient_lastname:patient_a.prenom_pat
	  });
	});
		    AsyncStorage.getItem('id').then((idd)=>{
		  that.itemsRef.child('medecins').child(id_medecin).child('patients').child(id_patient).child('dossiers_medicaux').child(id_dossier).child('images').child(image_id).set(array_all);		  
		  alert("Upload Terminé",downloadURL);
		}); 
  }
  goBack() { 
	this.props.navigator.pop();
	return true;
  }
  gestionF(id,nbre,emplacement,date_creation_dossier,date_MAJ,categorie){
	let that = this;
	AsyncStorage.removeItem("med_pat_file");
	AsyncStorage.setItem("med_pat_file",JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":id,"categorie":categorie,"nombre_images_dossier":nbre,"emplacement":emplacement,"date_creation_dossier":date_creation_dossier,"date_MAJ":date_MAJ,"nom_pat":this.state.patient_lastname,"prenom_pat":this.state.patient_name})); 
	if(categorie=="naevus"){
	  that.props.navigator.push({
		  component: GestionFichier
	  });
	}else{
	  that.props.navigator.push({
		  component: GestionFichierDynamique
	  });
	}
  }
  nouveau_dossier(){
	let that = this;
	AsyncStorage.removeItem("med_pat_file");
	AsyncStorage.setItem("med_pat_file",JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"categorie":this.state.category_id,"nombre_images_dossier":0,"emplacement":"","nom_pat":this.state.patient_lastname,"prenom_pat":this.state.patient_name})); 
	that.props.navigator.push({
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
					<Row><Text style={{color: "#29235c",marginLeft:5,fontSize:20,fontFamily: 'Roboto',fontWeight:"bold"}}>{this.state.patient_name} {this.state.patient_lastname}</Text></Row>
					<Row><Text style={{color: "#9491AD",marginLeft:5,marginBottom:0,fontSize:15,fontFamily: 'Roboto'}}>Téléphone : {this.state.patient_tel}</Text></Row>
				</Grid>
			</ListItem>	
			<Text style={{color:'#29235c',margin:10,marginLeft:22,fontSize:18,fontFamily:'Roboto'}}>Les dossiers médicaux </Text>
			<ListView dataSource={this.state.dataSource}
			  enableEmptySections={true}             
			  renderRow={(rowData) => 
				<List style={{backgroundColor:'white',height:160, borderColor:'#29235c'}}>
				  <ListItem style={{height:160, borderColor:'#29235c', width:340, paddingTop:0}}>
				    <Button style={{height:160}} onPress={this.gestionF.bind(this,rowData._key,rowData.nombre_images_dossier,rowData.emplacement,rowData.date_creation_dossier.substring(0,24),rowData.date_MAJ_dossier.substring(0,24),rowData.categorie_id)} transparent>							
					  <Grid>
						<Col style={{width:70}}>
						  <Image style={{width:65,height:60, marginTop:10}} source={{uri: 'icdossier'}}/>
						</Col>
						<Col style={{width:250,marginLeft:8, margin:10}}>
						  <Text style={styles.listViewTitle}> Dossier {rowData.emplacement}</Text> 
						  <Text style={styles.listViewText1}>Nombre d'image: <Text style={styles.listViewText2}>{rowData.nombre_images_dossier}</Text></Text>							
						  <Text style={styles.listViewText1}>Catégorie: <Text style={styles.listViewText2}>{rowData.categorie_id}</Text></Text>							
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