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
		  loaded: true
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
	<HeaderUp text="Localiser Photo" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<Image style={styles.image} source={{uri:'http://localhost:8081/img/vue_face_locate.png'}}>
			<View style={{flexDirection: 'row', flexWrap:'wrap',backgroundColor: 'transparent'}}>
				<Button style={{backgroundColor:'transparent',marginLeft: 0,marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'#8684a3'}} textStyle={{color:'#8684a3'}} rounded bordered>Avant</Button>
				<Button style={{backgroundColor:'transparent',marginTop:0,width:180,height:60,alignItems: 'flex-start',borderColor:'#8684a3'}} textStyle={{color:'#fff'}} rounded bordered>Arriére</Button>
			</View>
			<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
			<TouchableOpacity
				onPress={this.localiser_tete.bind(this)}
				style={{width:200,height:20,marginLeft:115,marginTop:28,marginBottom:30}}><Text>Tête</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_cou.bind(this)}
				style={{width:200,height:20,marginLeft:220}}><Text>Cou</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_epaule_gauche.bind(this)}
				style={{width:200,height:20,marginLeft:250}}><Text>Epaule Gauche</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_epaule_droite.bind(this)}
				style={{width:200,height:20,marginLeft:5,marginBottom:10}}><Text>Epaule Droite</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_thorax.bind(this)}
				style={{width:200,height:20,marginLeft:50,marginBottom:10}}><Text>Thorax</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_abdomen.bind(this)}
				style={{width:200,height:20,marginLeft:180,marginBottom:10}}><Text>Abdomen</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_main_gauche.bind(this)}
				style={{width:200,height:20,marginLeft:180,marginBottom:10}}><Text>Main Gauche</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_main_droite.bind(this)}
				style={{width:200,height:20,marginLeft:50,marginBottom:40}}><Text>Main Droite</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_jambe_gauche.bind(this)}
				style={{width:200,height:20,marginLeft:185,marginBottom:10}}><Text>Jambe Gauche</Text></TouchableOpacity>
			<TouchableOpacity
				onPress={this.localiser_jambe_droite.bind(this)}
				style={{width:200,height:20,marginLeft:50,marginBottom:10}}><Text>Jambe Droite</Text></TouchableOpacity>
			</View>
		</Image>
	</ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
