/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Alert,
  Image,
  AsyncStorage,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import ButtonS from '../components/button';
import {InputGroup, Input, Button, Card, CardItem, Header, Icon} from 'native-base';
import Modal from 'react-native-modalbox';
const window = Dimensions.get('window');
import TakePicture from './takePic';
export default class locatePic extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true,
		  dossier_id: '',
		  medecin_id: '',
		  patient_id: '',
		  med_pat_file:{},
		  uri_img:'http://localhost:8081/img/Katomi-face-1.png',
		  cou: this.localiser_cou.bind(this),
		  epaule_gauche: this.localiser_epaule_gauche.bind(this),
		  epaule_droite: this.localiser_epaule_droite.bind(this),
		  thorax: this.localiser_thorax.bind(this),
		  abdomen: this.localiser_abdomen.bind(this),
		  main_droite: this.localiser_main_droite.bind(this),
		  main_gauche: this.localiser_main_gauche.bind(this),
		  jambe_droite: this.localiser_jambe_droite.bind(this),
		  jambe_gauche: this.localiser_jambe_gauche.bind(this),
		  text_tete: 'Tête',
		  text_thorax: 'Thorax',
		  text_abdomen: 'Abdomen',
		  text_cou: 'Cou',
		  text_epaule_droite: 'Épaule droite',
		  text_epaule_gauche: 'Épaule gauche',
		  text_jambe_droite: 'Jambe droite',
		  text_jambe_gauche: 'Jambe gauche',
		  text_main_droite: 'Main droite',
		  text_main_gauche: 'Main gauche',
		}
	}
	validate_location(){
		alert("next is cam page");
	}
	 componentDidMount(){
		AsyncStorage.getItem('med_pat_file').then((med_pat_filee) => {
			const array=JSON.parse(med_pat_filee);
			this.setState({ 
				med_pat_file:array,
				dossier_id: array.id_dossier,
				medecin_id: array.id_medecin,
				patient_id: array.id_patient
			});
		});
	} 
	localiser_tete(){
		//alert(this.state.dossier_id);
		alert(JSON.stringify(this.state.med_pat_file));
		Alert.alert(
		  'Vous avez sélectionné',
		  'Tête',
		  [
			{text: 'Valider pour étape suivante', onPress: () =>{
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Tête'}));
			this.props.navigator.push({
				component: TakePicture
			})
			} 
			}
		  ]
		) 
	}
	localiser_cou(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Cou',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Cou'})),
			this.props.navigator.push({
				component: TakePicture
			});
			}
			}
		  ]
		)
	}
	localiser_nuque(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Nuque',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Nuque'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}
			}
		  ]
		)
	}
	localiser_epaule_gauche(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Épaule gauche',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Épaule gauche'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}
		  ]
		)
	}
	localiser_epaule_droite(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Épaule droite',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Épaule droite'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}		
		  ]
		)
	}
	localiser_thorax(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Thorax',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Thorax'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}
		  ]
		)
	}
	localiser_abdomen(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Abdomen',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Abdomen'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}
		  ]
		)
	}
	localiser_dos(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Dos',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Dos'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}
		  ]
		)
	}
	localiser_main_gauche(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Main gauche',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Main gauche'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}
		  ]
		)

	}
	localiser_main_droite(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Main droite',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Main droite'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}
		  ]
		)

	}
	localiser_jambe_gauche(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Jambe gauche',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Jambe gauche'}));
			this.props.navigator.push({
				component: TakePicture
			});
			}}
		  ]
		)

	}
	localiser_jambe_droite(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Jambe droite',
		  [
			{text: 'Valider pour étape suivante', onPress: () => {
			AsyncStorage.setItem('med_pat_file_location', JSON.stringify({"id_medecin":this.state.medecin_id,"id_patient":this.state.patient_id,"id_dossier":this.state.dossier_id,"emplacement":'Jambe droite'}));
			this.props.navigator.push({
				component: TakePicture
			});
			},style: styles.primary_button_oui}
		  ]
		)

	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Séléction zone" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
		<Image style={styles.image} ref="img" source={{uri:this.state.uri_img}}>
			<View style={{flexDirection: 'row', flexWrap:'wrap',backgroundColor: 'transparent'}}>
				<Button onPress={(img) =>{
						this.setState({
							uri_img: 'http://localhost:8081/img/Katomi-face-1.png',
							cou: this.localiser_cou.bind(this),
							epaule_gauche: this.localiser_epaule_gauche.bind(this),
							epaule_droite: this.localiser_epaule_droite.bind(this),
							thorax: this.localiser_thorax.bind(this),
							abdomen: this.localiser_abdomen.bind(this),
							main_droite: this.localiser_main_droite.bind(this),
							main_gauche: this.localiser_main_gauche.bind(this),
							jambe_droite: this.localiser_jambe_droite.bind(this),
							jambe_gauche: this.localiser_jambe_gauche.bind(this),
							text_tete: 'Tête',
							text_cou: 'Cou',
							text_thorax: 'Thorax',
							text_abdomen: 'Abdomen',
							text_epaule_droite: 'Épaule droite',
							text_epaule_gauche: 'Épaule gauche',
							text_jambe_droite: 'Jambe droite',
							text_jambe_gauche: 'Jambe gauche',
							text_main_droite: 'Main droite',
							text_main_gauche: 'Main gauche',
							});
					}} style={{backgroundColor:'transparent',marginLeft: 0,marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Avant</Text>
				</Button>
				<Button onPress={(img) =>{
						this.setState({
							uri_img: 'http://localhost:8081/img/Katomi-Face-2.png',
							cou: this.localiser_nuque.bind(this),
							epaule_gauche: this.localiser_epaule_droite.bind(this),
							epaule_droite: this.localiser_epaule_gauche.bind(this),
							thorax: null,
							abdomen: this.localiser_dos.bind(this),
							main_droite: this.localiser_main_gauche.bind(this),
							main_gauche: this.localiser_main_droite.bind(this),
							jambe_droite: this.localiser_jambe_gauche.bind(this),
							jambe_gauche: this.localiser_jambe_droite.bind(this),
							text_tete: 'Tête',
							text_cou: 'Nuque',
							text_thorax: '',
							text_abdomen: 'Dos',
							text_epaule_droite: 'Épaule gauche',
							text_epaule_gauche: 'Épaule droite',
							text_jambe_droite: 'Jambe gauche',
							text_jambe_gauche: 'Jambe droite',
							text_main_droite: 'Main gauche',
							text_main_gauche: 'Main droite',
						});
					}} style={{backgroundColor:'transparent',marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Arriére</Text>
				</Button>
			</View>
			<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
			<TouchableOpacity
				onPress={this.localiser_tete.bind(this)}
				style={{width:100,height:22,marginLeft:55,marginTop:25,marginBottom:30,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_tete}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.cou}
				style={{width:100,height:22,marginLeft:216,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_cou}</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent',marginTop:0}}>
			<TouchableOpacity
				onPress={this.state.epaule_droite}
				style={{width:100,height:22,marginLeft:0,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_epaule_droite}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.epaule_gauche}
				style={{width:100,height:22,marginLeft:147,backgroundColor: "transparent",marginTop:6}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_epaule_gauche}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				accessible={false}
				onPress={this.state.thorax}
				style={{width:100,height:27,marginLeft:20,marginBottom:11,marginTop:20,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_thorax}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.abdomen}
				style={{width:100,height:28,marginLeft:230,marginBottom:0,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_abdomen}</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent',marginTop:0}}>
			<TouchableOpacity
				onPress={this.state.main_droite}
				style={{width:100,height:24,marginLeft:0,marginBottom:0,marginTop:0,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_main_droite}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.main_gauche}
				style={{width:100,height:22,marginLeft:162,marginBottom:0,marginTop:10,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_main_gauche}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={this.state.jambe_gauche}
				style={{width:100,height:24,marginLeft:230,marginTop:46,marginBottom:20,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_jambe_gauche}</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.jambe_droite}
				style={{width:100,height:24,marginLeft:20,marginBottom:10,backgroundColor: "transparent"}}>
				<Text style={{color:'#29235c',textAlign: "center"}}>{this.state.text_jambe_droite}</Text>
				</TouchableOpacity>
			</View>
		</Image>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
