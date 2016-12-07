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
import UploadForm from './uploadForm';
import NewPatient from './newPatient';
import TakePicture from './takePic';
export default class locatePic extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true,
		  uri_img:'http://localhost:8081/img/vue_face_locate.png',
		  cou: this.localiser_cou.bind(this),
		  epaule_gauche: this.localiser_epaule_gauche.bind(this),
		  epaule_droite: this.localiser_epaule_droite.bind(this),
		  thorax: this.localiser_thorax.bind(this),
		  abdomen: this.localiser_abdomen.bind(this),
		  main_droite: this.localiser_main_droite.bind(this),
		  main_gauche: this.localiser_main_gauche.bind(this),
		  jambe_droite: this.localiser_jambe_droite.bind(this),
		  jambe_gauche: this.localiser_jambe_gauche.bind(this),
		}
	}
	validate_location(){
		alert("next is cam page");
	}
	localiser_tete(){
		Alert.alert(
		  'Vous avez sélectionné',
		  'Tête',
		  [
			{text: 'Valider pour étape suivante', onPress: () =>{
			AsyncStorage.setItem('location', 'Tête');
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
			AsyncStorage.setItem('location', 'Cou'),
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
			AsyncStorage.setItem('location', 'Nuque');
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
			AsyncStorage.setItem('location', 'Épaule gauche');
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
			AsyncStorage.setItem('location', 'Épaule droite');
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
			AsyncStorage.setItem('location', 'Thorax');
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
			AsyncStorage.setItem('location', 'Abdomen');
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
			AsyncStorage.setItem('location', 'Dos');
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
			AsyncStorage.setItem('location', 'Main gauche');
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
			AsyncStorage.setItem('location', 'Main droite');
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
			AsyncStorage.setItem('location', 'Jambe gauche');
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
			AsyncStorage.setItem('location', 'Jambe droite');
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
							uri_img: 'http://localhost:8081/img/vue_face_locate.png',
							cou: this.localiser_cou.bind(this),
							epaule_gauche: this.localiser_epaule_gauche.bind(this),
							epaule_droite: this.localiser_epaule_droite.bind(this),
							thorax: this.localiser_thorax.bind(this),
							abdomen: this.localiser_abdomen.bind(this),
							main_droite: this.localiser_main_droite.bind(this),
							main_gauche: this.localiser_main_gauche.bind(this),
							jambe_droite: this.localiser_jambe_droite.bind(this),
							jambe_gauche: this.localiser_jambe_gauche.bind(this)
							});
					}} style={{backgroundColor:'transparent',marginLeft: 0,marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Avant</Text>
				</Button>
				<Button onPress={(img) =>{
						this.setState({
							uri_img: 'http://localhost:8081/img/vue_arriere_locate.png',
							cou: this.localiser_nuque.bind(this),
							epaule_gauche: this.localiser_epaule_droite.bind(this),
							epaule_droite: this.localiser_epaule_gauche.bind(this),
							thorax: null,
							abdomen: this.localiser_dos.bind(this),
							main_droite: this.localiser_main_gauche.bind(this),
							main_gauche: this.localiser_main_droite.bind(this),
							jambe_droite: this.localiser_jambe_gauche.bind(this),
							jambe_gauche: this.localiser_jambe_droite.bind(this)
						});
					}} style={{backgroundColor:'transparent',marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Arriére</Text>
				</Button>
			</View>
			<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
			<TouchableOpacity
				onPress={this.localiser_tete.bind(this)}
				style={{width:100,height:22,marginLeft:55,marginTop:25,marginBottom:30,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Tête</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.cou}
				style={{width:100,height:22,marginLeft:216,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Cou</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent',marginTop:0}}>
			<TouchableOpacity
				onPress={this.state.epaule_droite}
				style={{width:100,height:22,marginLeft:0,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Epaule droite</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.epaule_gauche}
				style={{width:100,height:22,marginLeft:147,backgroundColor: "transparent",marginTop:6}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Epaule gauche</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={this.state.thorax}
				style={{width:100,height:27,marginLeft:20,marginBottom:11,marginTop:20,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Thorax</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.abdomen}
				style={{width:100,height:28,marginLeft:230,marginBottom:0,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Abdomen</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent',marginTop:0}}>
			<TouchableOpacity
				onPress={this.state.main_droite}
				style={{width:100,height:24,marginLeft:0,marginBottom:0,marginTop:0,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Main droite</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.main_gauche}
				style={{width:100,height:22,marginLeft:162,marginBottom:0,marginTop:10,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Main gauche</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={this.state.jambe_gauche}
				style={{width:100,height:24,marginLeft:230,marginTop:46,marginBottom:20,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Jambe gauche</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.state.jambe_droite}
				style={{width:100,height:24,marginLeft:20,marginBottom:10,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Jambe droite</Text>
				</TouchableOpacity>
			</View>
		</Image>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
