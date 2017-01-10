import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  AsyncStorage,
  Image,
  TouchableOpacity,
  View
} from 'react-native';
import ButtonS from '../components/button';
import Header from '../components/header';

import Login from './login';
import styles from '../styles/common-styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InputGroup, Input, Button} from 'native-base';
import * as firebase from 'firebase';

export default class signup extends Component {
  constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref('medecins');
    this.state = {
      loaded: true,
      email_medecin: '',
      confirm_password: '',
      password: '',
	  secureTextEntry: true,
	  secureText: true,
	  count_pass: 0,
	  count_conf_pass: 0,
	  items_med :[]
    };
	this.signup=this.signup.bind(this);
  }
  componentDidMount(){
	this.itemsRef.on("value", (snap) => {
		let items=[];
		items=Object.keys(snap.val());
		alert(items.length);
		AsyncStorage.removeItem("medecins");
		AsyncStorage.setItem("medecins",items.length.toString());
	});
   }
  signup(){
	AsyncStorage.getItem("medecins").then((medecinss) => {
	let medecin_id=this.state.email_medecin.slice(0,this.state.email_medecin.indexOf('@')).slice(0,this.state.email_medecin.indexOf('.'))+medecinss;
	if(this.state.password==this.state.confirm_password){
		firebase.auth().createUserWithEmailAndPassword(this.state.email_medecin,this.state.password).then((userData) =>{
		//ajouter medecin à firebase database
		this.itemsRef.child(medecin_id).set({
			email_medecin: this.state.email_medecin,
			nom_medecin:"",
			prenom_medecin:"",
			date_naissance_medecin:"",
			specialite_medecin:"",
			telephone_medecin:"",
			address_cabinet_medecin:"",
			photoURL_medecin:"",
			categories:[]
			})
		//succes d'ajout dans auth et database
			alert('Your account was created!');
			this.props.navigator.push({
			  component: Login
			});
		}).catch((error)=>{
			  alert(error.message);
			});
		  this.setState({
			loaded: true
		  });
	}else{
	  alert("les champs mot de passe et confirmer mot de passe doivent être identiques")
	}
	});	
	  //Communications.email(['arwa.louihig@esprit.tn', 'arwa@osereso.fr'],null,null,'Compléter inscription',"Veuillez suivre le lien ci-dessous pour compléter votre inscription "+"http://localhost:3000/inscription".link("http://localhost:3000/inscription"));
  }
  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }
  render() {
    return (
    <View style={styles.container}>
	 <Image style={styles.image_splash} source={{uri:'http://localhost:8081/img/2.png'}}>
        <View style={styles.body_login}>
            <TextInput
                style={styles.textinput_email}
                onChangeText={(text) => this.setState({email_medecin: text})}
                value={this.state.email_medecin}
				placeholder={"E-mail"}
				placeholderTextColor="#fff"
				underlineColorAndroid="#fff"/>
			<View style={{flexDirection:'row', flexWrap:'wrap'}}>
				<TextInput
					ref="password"
					style={styles.textinput_mdp}
					onChangeText={(text) => this.setState({password: text})}
					value={this.state.password}
					secureTextEntry={this.state.secureTextEntry}
					placeholder={"Mot de passe"}
					placeholderTextColor="#fff"
					underlineColorAndroid="#fff"/>
				<TouchableOpacity onPress={(password) =>{
					if(this.state.count_pass==0){
						this.setState({secureTextEntry: false,count_pass:1});
					}else{
						this.setState({secureTextEntry: true,count_pass:0});
					}
					}} 
					style={{width: 35,margin:0,padding:0,marginBottom:0,height:20,marginTop:30}}>
					<Image style={{width:27,height:15,margin:0,padding:0}} source={{uri:'http://localhost:8081/img/eye.png'}}></Image>
				</TouchableOpacity >
			</View>
			<View style={{flexDirection:'row', flexWrap:'wrap'}}>
				<TextInput
					ref="confirm_password"
					style={styles.textinput_mdp}
					onChangeText={(text) => this.setState({confirm_password: text})}
					value={this.state.confirm_password}
					secureTextEntry={this.state.secureText}
					placeholder={"Confirmez le mot de passe"}
					placeholderTextColor="#fff"
					underlineColorAndroid="#fff"/>
				<TouchableOpacity onPress={(confirm_password) =>{
					if(this.state.count_conf_pass==0){
						this.setState({secureText: false,count_conf_pass:1});
					}else{
						this.setState({secureText: true,count_conf_pass:0});
					}
					}} 
					style={{width: 35,margin:0,padding:0,marginBottom:0,height:20,marginTop:30}}>
					<Image style={{width:27,height:15,margin:0,padding:0}} source={{uri:'http://localhost:8081/img/eye.png'}}></Image>
				</TouchableOpacity>
			</View>
			<Button
				onPress={this.signup}
				style={styles.primary_button_signup}
				textStyle={{fontSize: 16, color:'#fff'}}
				bordered>CRÉER UN COMPTE</Button>
			<Text style={styles.text_signup_terms}>En cliquant sur "créer un compte" ,vous acceptez nos condition d'utilisation et notre Politique de confidentialité.</Text>
        </View>
		</Image>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);