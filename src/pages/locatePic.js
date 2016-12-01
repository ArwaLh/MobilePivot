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
		  isOpen: false,
		  isDisabled: false,
		}
	}
	validate_location(){
		alert("next is cam page");
	}
	toggleDisable(){
    this.setState({isDisabled: !this.state.isDisabled});
	}
	localiser_tete(){
		this.refs.modal_tete.open();
	}
	localiser_cou(){
		this.refs.modal_cou.open();
	}
	localiser_nuque(){
		this.refs.modal_nuque.open();
	}
	localiser_epaule_gauche(){
		this.refs.modal_epaule_gauche.open();
	}
	localiser_epaule_droite(){
		this.refs.modal_epaule_droite.open();
	}
	localiser_thorax(){
		this.refs.modal_thorax.open();
	}
	localiser_abdomen(){
		this.refs.modal_abdomen.open();
	}
	localiser_dos(){
		this.refs.modal_dos.open();
	}
	localiser_main_gauche(){
		this.refs.modal_main_gauche.open();

	}
	localiser_main_droite(){
		this.refs.modal_main_droite.open();
	}
	localiser_jambe_gauche(){
		this.refs.modal_jambe_gauche.open();
	}
	localiser_jambe_droite(){
		this.refs.modal_jambe_droite.open();
	}
	valid_tete(){
		AsyncStorage.setItem('location', 'Tête');
		this.props.navigator.push({
				component: TakePicture
			})
	}
	valid_cou(){
		AsyncStorage.setItem('location', 'Cou');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_nuque(){
		AsyncStorage.setItem('location', 'Nuque');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_dos(){
		AsyncStorage.setItem('location', 'Dos');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_epaule_gauche(){
		AsyncStorage.setItem('location', 'Épaule gauche');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_epaule_droite(){
		AsyncStorage.setItem('location', 'Épaule droite');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_thorax(){
		AsyncStorage.setItem('location', 'Thorax');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_abdomen(){
		AsyncStorage.setItem('location', 'Abdomen');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_main_gauche(){
		AsyncStorage.setItem('location', 'Main gauche');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_main_droite(){
		AsyncStorage.setItem('location', 'Main droite');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_jambe_gauche(){
		AsyncStorage.setItem('location', 'Jambe gauche');
		this.props.navigator.push({
				component: TakePicture
		})
	}
	valid_jambe_droite(){
		AsyncStorage.setItem('location', 'Jambe droite');
		this.props.navigator.push({
				component: TakePicture
		})
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
			
			<Modal style={styles.modal3} position={"center"} ref={"modal_tete"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Tête</Text>
			  <Button onPress={this.valid_tete.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_cou"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Cou</Text>
			  <Button onPress={this.valid_cou.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_nuque"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Nuque</Text>
			  <Button onPress={this.valid_nuque.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_epaule_gauche"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Épaule gauche</Text>
			  <Button onPress={this.valid_epaule_gauche.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_epaule_droite"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Épaule droite</Text>
			  <Button onPress={this.valid_epaule_droite.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_thorax"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Thorax</Text>
			  <Button onPress={this.valid_thorax.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_abdomen"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Abdomen</Text>
			  <Button onPress={this.valid_abdomen.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_dos"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Dos</Text>
			  <Button onPress={this.valid_dos.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_main_droite"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Main droite</Text>
			  <Button onPress={this.valid_main_droite.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_main_gauche"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Main gauche</Text>
			  <Button onPress={this.valid_main_gauche.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_jambe_droite"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Jambe droite</Text>
			  <Button onPress={this.valid_jambe_droite.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			<Modal style={styles.modal3} position={"center"} ref={"modal_jambe_gauche"} isDisabled={this.state.isDisabled}>
			  <Text style={styles.modal_title}>Vous avez sélectionné</Text>
			  <Text style={styles.modal_text}>Jambe gauche</Text>
			  <Button onPress={this.valid_jambe_gauche.bind(this)} style={styles.btn}>Valider pour passer à l'étape suivante</Button>
			</Modal>
			
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
