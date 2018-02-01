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
import HeaderSearch from '../components/headerSearch';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import { List, ListItem, Button, Grid, Col, Row} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';import Hr from 'react-native-hr';
const window = Dimensions.get('window');
import firebase from 'firebase';
import Categories from './categories';
import UploadForm from './uploadForm';
import UploadFormDynamique from './uploadFormDynamique';

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
		dossier_id: '',
		medecin_id: '',
		nombre_images_dossier: '',
		categorie_id: '',
		emplacement: '',
		patient_name:'',
		patient_tel:'',
		patient_lastname:''
	};
	this.gestionF=this.gestionF.bind(this);
	this.goBack=this.goBack.bind(this);
  }
  componentDidMount(){
	let that=this;
	AsyncStorage.getItem('med_pat_file_location').then((patient_medecin_arrayy) => {
	  const arr=JSON.parse(patient_medecin_arrayy);
	  that.itemsRef.child('medecins').child(arr.id_medecin).child('patients').child(arr.id_patient).child('dossier_medical').child(arr.id_dossier).child("motifs").once('value', (snap) => {
	  let items=[];
	  // get children as an array
	  snap.forEach((child) => {
		items.push({
			nombre_images_motif: child.val().nombre_images_motif, 
			date_creation_motif: child.val().date_creation_motif,
			date_MAJ_motif: child.val().date_MAJ_motif,
			motif: child.val().motif,
			_key: child.key
		});
	  });
	  that.setState({
		dataSource: that.state.dataSource.cloneWithRows(items),
		patient_id: arr.id_patient,
		medecin_id: arr.id_medecin,
		dossier_id: arr.id_dossier,
		category: arr.motif,
		emplacement: arr.emplacement,
		nombre_images_dossier: arr.nombre_images_dossier
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
  }
  goBack() { 
	this.props.navigator.pop();
	return true;
  }
  gestionF(id,nbre,date_creation_motif,date_MAJ,motif){         
	AsyncStorage.removeItem("med_pat_file_location");
	AsyncStorage.setItem("med_pat_file_location",JSON.stringify({"id_medecin":this.state.medecin_id,"id_dossier": this.state.dossier_id,"id_patient":this.state.patient_id,"nombre_images_dossier":this.state.nombre_images_dossier,"nombre_images_motif":nbre,"nom_pat":this.state.patient_lastname,"prenom_pat":this.state.patient_name,"id_motif": id,"motif": motif})); 
		if(motif == "naevus"){
			this.props.navigator.push({     
			component: UploadForm
			});
		}else{
		 	this.props.navigator.push({ 
			component: UploadFormDynamique 
			});	
		}
  }

  render() {
    return ( 
	<View style={{backgroundColor: 'white'}}>
	  <HeaderSearch text="Motifs de consultation" onpress={this.goBack}/>
	  <ScrollView style={{backgroundColor: '#fff'}}>
		<View style={{flex:1}}>
			<ListItem style={{borderColor:'#29235c', width:340}}>
			   <Grid>
					<Row><Text style={{color: "#29235c",marginLeft:5,fontSize:20,fontFamily: 'Roboto',fontWeight:"bold"}}>{this.state.patient_name} {this.state.patient_lastname}</Text></Row>
					<Row><Text style={{color: "#9491AD",marginLeft:5,marginBottom:0,fontSize:15,fontFamily: 'Roboto'}}>Téléphone : {this.state.patient_tel}</Text></Row>
				</Grid>
			</ListItem>	
			<Text style={{color:'#29235c',margin:10,marginLeft:22,fontSize:18,fontFamily:'Roboto'}}>Les motifs de consultation </Text>
			<ListView dataSource={this.state.dataSource}
			  enableEmptySections={true}             
			  renderRow={(rowData) => 
				<List style={{backgroundColor:'white',height:160, borderColor:'#29235c'}}>
				  <ListItem style={{height:160, borderColor:'#29235c', width:340, paddingTop:0}}>
				    <Button style={{height:160}} onPress={this.gestionF.bind(this,rowData._key,rowData.nombre_images_motif,rowData.date_creation_motif.substring(0,24),rowData.date_MAJ_motif.substring(0,24),rowData.motif)} transparent>							
					  <Grid>
						<Col style={{width:70}}>
						  <Image style={{width:65,height:60, marginTop:10}} source={{uri: 'icdossier'}}/>
						</Col>
						<Col style={{width:250,marginLeft:8, margin:10}}>
						  <Text style={styles.listViewTitle}> Motif de consultation </Text> 
						  <Text style={styles.listViewText1}>Nombre d'image: <Text style={styles.listViewText2}>{rowData.nombre_images_motif}</Text></Text>							
						  <Text style={styles.listViewText1}>Motif de consultation: <Text style={styles.listViewText2}>{rowData.motif}</Text></Text>							
						  <Text style={styles.listViewText1}>Date de création: <Text style={styles.listViewText2}>{rowData.date_creation_motif.substring(0,24)}</Text></Text>
						  <Text style={styles.listViewText1}>Date de derniére image: <Text style={styles.listViewText2}>{rowData.date_MAJ_motif.substring(0,24)}</Text></Text>
						</Col>
					  </Grid>
				    </Button>
				  </ListItem>
				</List>
			} style={{backgroundColor: 'white'}}/>		
		</View>
	  </ScrollView>   
	</View>
    );
  }
}

AppRegistry.registerComponent('gestionNaevus', () => gestionNaevus);