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
import { List, ListItem, Button, Grid, Col} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
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
			dossiers_medicaux: [],
			patient_medecin_array: {},
			patient_id: '',
			medecin_id: '',
			nom_pat: '',
			prenom_pat: '',
		};
	}
	componentDidMount(){
		AsyncStorage.getItem('medecin_patient').then((patient_medecin_arrayy) => {
			alert(patient_medecin_arrayy);
			const arr=JSON.parse(patient_medecin_arrayy);
			this.setState({
				patient_medecin_array:patient_medecin_arrayy
			});
			this.itemsRef.child('medecins/'+arr.medecin_id+'/patients/'+arr.patient_id+'/dossiers_medicaux/').on('value', (snap) => {
			let items=[];
			// get children as an array
			snap.forEach((child) => {
				items.push({
					nom_patient_dossier: child.val().nom_patient_dossier,
					prenom_patient_dossier: child.val().prenom_patient_dossier,
					nombre_images_dossier: child.val().nombre_images_dossier,
					_key: child.key
				});
			});
			this.setState({
			dataSource: this.state.dataSource.cloneWithRows(items),
			patient_id: arr.patient_id,
			medecin_id: arr.medecin_id,
			});
			//const patients_array = items;
			const dossiers_medicaux = items; 
			this.setState({ dossiers_medicaux });
			});
			let patient=null;
			this.itemsRef.child('medecins/'+arr.medecin_id+'/patients').orderByKey().equalTo(arr.patient_id).once("child_added", function(snapshot) {
				patient = snapshot.val(); 
				alert(JSON.stringify(snapshot.val().nom_pat));
			});
			this.setState({patient:patient});
			alert(JSON.stringify(this.state.patient));
		});
	}
	goBack() { 
		this.props.navigator.pop();
		return true;
	}
	localiser_photo(){
		this.props.navigator.push({
          component: LocatePic
        }); 
	}
	nouveau_dossier(){
		alert("nouveau dossier médical");
		//ajout d'un dossier médical
		//search for patient by id
		/* this.itemsRef.child('medecins/'+this.state.username_med+'/patients').equalTo(this.state.patient_id).once("child_added", function(snapshot) {
			alert(JSON.stringify(snapshot));
			this.setState({patient: snapshot});
		}); */
		//order by key
		//
		let my_date=new Date();
		let dossier_id=this.state.medecin_id+'_'+this.state.patient_id+'_'+this.state.dossiers_medicaux.length;
		this.itemsRef.child('medecins/'+this.state.medecin_id+'/patients/'+this.state.patient_id).child('dossiers_medicaux/'+dossier_id).set({ 
			date_creation_dossier: my_date.toString(),
			date_MAJ_dossier: my_date.toString(),
			nom_patient_dossier: this.state.patient.nom_pat,
			prenom_patient_dossier: this.state.patient.prenom_pat,
			telephone_patient_dossier: this.state.patient.telephone_patient,
			nombre_images_dossier: 0
		})
	}
  render() {
    return ( 
	<View style={{backgroundColor: 'white'}}>
	<HeaderUp text="Gestion Naevus" loaded={true} onpress={this.goBack.bind(this)}/>
	<ScrollView style={{backgroundColor: 'black'}}>
	<View style={{flex:1}}>
		<ListView dataSource={this.state.dataSource}
		enableEmptySections={true}
        renderRow={(rowData) => 
					<List style={{backgroundColor:'white'}}>
					  <ListItem>
					  <Button style={{height:190}} onPress={this.localiser_photo.bind(this)} transparent>
						<Grid>
						<Col>
						<Icon name="folder-open" size={45} style={{color: '#29235c', fontSize: 50, width:55,marginLeft: (window.width/2)-130,marginTop:35}}/>
						</Col>
						<Col>
							<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>ID dossier</Text>
							<Text style={{color: '#a8a8a8',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>{rowData._key}</Text>
							<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>nom patient</Text>
							<Text style={{color: '#a8a8a8',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>{rowData.nom_patient_dossier}</Text>
							<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>prenom patient</Text>
							<Text style={{color: '#a8a8a8',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>{rowData.prenom_patient_dossier}</Text>
							<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>Nombre d'image dans le dossier</Text>
							<Text style={{color: '#a8a8a8',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>{rowData.nombre_images_dossier}</Text>
						</Col>
						</Grid>
					  </Button>
					  </ListItem>
					</List>
					} style={{backgroundColor: 'white',flex:2}}/>		
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