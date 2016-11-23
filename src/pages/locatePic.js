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
  TouchableHighlight,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import ButtonS from '../components/button';
import {InputGroup, Input, Button, Card, CardItem, Header, Icon} from 'native-base';

import UploadForm from './uploadForm';
import NewPatient from './newPatient';
export default class locatePic extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	validate_location(){
		alert("next is cam page");
		/* this.props.navigator.push({
          component: UploadForm
        }); */ 
	}
	localiser_tete(){
		alert("Tête");
	}
	localiser_cou(){
		alert("Cou");
	}
	localiser_epaule_gauche(){
		alert("Epaule Gauche");
	}
	localiser_epaule_droite(){
		alert("Epaule Droite");
	}
	localiser_tronc(){
		alert("Tronc");
	}
	localiser_main_gauche(){
		alert("Main Gauche");
	}
	localiser_main_droite(){
		alert("Main Droite");
	}
	localiser_jambe_gauche(){
		alert("Jambe Gauche");
	}
	localiser_jambe_droite(){
		alert("Jambe Droite");
	}
	vue_arriere(){
		alert("C'est la vue de face");
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
		<View style={{flexDirection: 'row',backgroundColor: '#fff'}}>
			<Button style={{backgroundColor:'#fff',marginLeft: 20,marginTop:10,width:80,alignItems: 'flex-start',borderColor:'#8684a3'}} textStyle={{color:'#8684a3'}} rounded bordered>Arriére</Button>
			<Button style={{backgroundColor:'#8684a3',marginLeft: 20,marginTop:10,width:80,marginLeft:150,alignItems: 'flex-start',borderColor:'#8684a3'}} textStyle={{color:'#fff'}} rounded bordered>Face</Button>
		</View>
		<Image style={styles.image} source={{uri:'http://localhost:8081/img/vue_face_locate.png'}}>
			<ButtonS
				text="Tête"
				onpress={this.localiser_tete.bind(this)}
				button_styles={{top:10}}
				button_text_styles={{textAlign:'center',color:'#53507c'}}/>
			<ButtonS
				text="Cou"
				onpress={this.localiser_cou.bind(this)}
				button_styles={{top:25}}
				button_text_styles={{textAlign:'center',color:'#53507c'}}/>
			<ButtonS
				text="Epaule Gauche"
				onpress={this.localiser_epaule_gauche.bind(this)}
				button_styles={{top:50}}
				button_text_styles={{textAlign:'right',color:'#53507c',right:5}}/>
			<ButtonS
				text="Epaule Droite"
				onpress={this.localiser_epaule_droite.bind(this)}
				button_styles={{top:30}}
				button_text_styles={{textAlign:'left',color:'#53507c',left:5}}/>
			<ButtonS
				text="Tronc"
				onpress={this.localiser_tronc.bind(this)}
				button_styles={{top:80}}
				button_text_styles={{textAlign:'center',color:'#53507c',left:5}}/>
			<ButtonS
				text="Main Gauche"
				onpress={this.localiser_main_gauche.bind(this)}
				button_styles={{top:150}}
				button_text_styles={{textAlign:'right',color:'#53507c',right:5}}/>
			<ButtonS
				text="Main Droite"
				onpress={this.localiser_main_droite.bind(this)}
				button_styles={{top:130}}
				button_text_styles={{textAlign:'left',color:'#53507c',left:5}}/>
			<ButtonS
				text="Jambe Gauche"
				onpress={this.localiser_jambe_gauche.bind(this)}
				button_styles={{top:180}}
				button_text_styles={{textAlign:'right',color:'#53507c',right:38}}/>
			<ButtonS
				text="Jambe Droite"
				onpress={this.localiser_jambe_droite.bind(this)}
				button_styles={{top:160}}
				button_text_styles={{textAlign:'left',color:'#53507c',left:38}}/>
		</Image>
	</ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
