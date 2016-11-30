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
  Image,
  TextInput,
  BackAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import ButtonS from '../components/button';
import {InputGroup, Input, Button, Card, CardItem, Header, Icon} from 'native-base';

import UploadForm from './uploadForm';
import NewPatient from './newPatient';
import TakePicture from './takePic';
export default class locatePic extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true,
		  uri_img:'http://localhost:8081/img/vue_face_locate.png'
		}
	}
	validate_location(){
		alert("next is cam page");
	}
	localiser_tete(){
		alert("Tête");
/* 		this.props.navigator.push({
          component: TakePicture
        }) */; 
	}
	localiser_cou(){
		alert("Cou");
/* 		this.props.navigator.push({
          component: TakePicture
        });  */
	}
	localiser_epaule_gauche(){
		alert("Epaule Gauche");
/* 		this.props.navigator.push({
          component: TakePicture
        });  */
	}
	localiser_epaule_droite(){
		alert("Epaule Droite");
/* 		this.props.navigator.push({
          component: TakePicture
        });  */
	}
	localiser_thorax(){
		alert("Thorax");
/* 		this.props.navigator.push({
          component: TakePicture
        });  */
	}
	localiser_abdomen(){
		alert("Abdomen");
/* 		this.props.navigator.push({
          component: TakePicture
        });  */
	}
	localiser_main_gauche(){
		alert("Main Gauche");
/* 		this.props.navigator.push({
          component: TakePicture
        });  */
	}
	localiser_main_droite(){
		alert("Main Droite");
/* 		this.props.navigator.push({
          component: TakePicture
        }); */ 
	}
	localiser_jambe_gauche(){
		alert("Jambe Gauche");
/* 		this.props.navigator.push({
          component: TakePicture
        }); */ 
	}
	localiser_jambe_droite(){
		alert("Jambe Droite");
/* 		this.props.navigator.push({
          component: TakePicture
        });  */
	}
	vue_arriere(){
		alert("C'est la vue de face");
		this.props.navigator.push({
          component: TakePicture
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Séléction zone" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<Image style={styles.image} ref="img" source={{uri:this.state.uri_img}}>
			<View style={{flexDirection: 'row', flexWrap:'wrap',backgroundColor: 'transparent'}}>
				<Button onPress={(img) =>{
						this.setState({uri_img: 'http://localhost:8081/img/vue_face_locate.png'});
					}} style={{backgroundColor:'transparent',marginLeft: 0,marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Avant</Text>
				</Button>
				<Button onPress={(img) =>{
						this.setState({uri_img: 'http://localhost:8081/img/vue_arriere_locate.png'});
					}} style={{backgroundColor:'transparent',marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'transparent'}} bordered>
				<Text style={{color:'transparent',textAlign: "center",padding:10,fontSize:20}}>Arriére</Text>
				</Button>
			</View>
			<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
			<TouchableOpacity
				onPress={this.localiser_tete.bind(this)}
				style={{width:100,height:20,marginLeft:55,marginTop:28,marginBottom:32,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Tête</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_cou.bind(this)}
				style={{width:100,height:18,marginLeft:220,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Cou</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent'}}>
			<TouchableOpacity
				onPress={this.localiser_epaule_droite.bind(this)}
				style={{width:100,height:20,marginLeft:0,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Epaule droite</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_epaule_gauche.bind(this)}
				style={{width:100,height:18,marginLeft:160,backgroundColor: "transparent",marginTop:6}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Epaule gauche</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={this.localiser_thorax.bind(this)}
				style={{width:100,height:20,marginLeft:20,marginBottom:22,marginTop:33,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Thorax</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_abdomen.bind(this)}
				style={{width:100,height:20,marginLeft:240,marginBottom:0,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Abdomen</Text>
				</TouchableOpacity>
			<View style={{flexDirection: 'row',backgroundColor: 'transparent'}}>
			<TouchableOpacity
				onPress={this.localiser_main_droite.bind(this)}
				style={{width:100,height:22,marginLeft:0,marginBottom:2,marginTop:0,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Main droite</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_main_gauche.bind(this)}
				style={{width:100,height:22,marginLeft:170,marginBottom:0,marginTop:10,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Main gauche</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={this.localiser_jambe_gauche.bind(this)}
				style={{width:100,height:20,marginLeft:238,marginTop:46,marginBottom:20,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Jambe gauche</Text>
				</TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_jambe_droite.bind(this)}
				style={{width:100,height:20,marginLeft:20,marginBottom:10,backgroundColor: "transparent"}}>
				<Text style={{color:'transparent',textAlign: "center"}}>Jambe droite</Text>
				</TouchableOpacity>
			</View>
		</Image>
	</ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
