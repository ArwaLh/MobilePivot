import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  AsyncStorage,
  Image,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';
import Login from './login';
import styles from '../styles/common-styles.js';
import { Button} from 'native-base';
import * as firebase from 'firebase';
const window = Dimensions.get('window');
export default class signup extends Component {
  constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
    this.state = {
      loaded: true,
      email_medecin: '',
      confirm_password: '',
      password: '',
	  secureTextEntry: true,
	  secureText: true,
	  count_pass: 0,
	  count_conf_pass: 0
    };
	this.signup=this.signup.bind(this);
  }
  formatDate(date){
  var day = date.getDate();
  var monthIndex = date.getMonth()+1;
  var year = date.getFullYear();

  return day + '/' + monthIndex+ '/' + year;
  }
  signup(){
	//generate the pushed key
	let medecin_id=this.itemsRef.child("medecins").push().getKey();
	if(this.state.password==this.state.confirm_password){
		firebase.auth().createUserWithEmailAndPassword(this.state.email_medecin,this.state.password).then((userData) =>{
		//ajouter medecin à firebase database
		this.itemsRef.child("medecins").child(medecin_id).set({
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
		//add category naevus to the doctor which is the default category
		let cr_date=this.formatDate(new Date());
		this.itemsRef.child("categories").child(medecin_id).child("naevus").set({ 
			nom_categorie:"Naevus",
			date_creation:cr_date.toString()
		})
		  //succes d'ajout dans auth et database
		  alert('Compte crée!');
		  this.props.navigator.push({
			  component: Login
		  });
		}).catch((error)=>{
			 switch (error.code) {
			case 'auth/email-already-in-use':
			  alert("E-mail déja utilisé");
			  break;
			case 'auth/invalid-email':
			  alert("E-mail non valide");
			  break;
			case 'auth/operation-not-allowed':
			  alert("Opération non permise");
			  break;
			case 'auth/weak-password':
			  alert("Mot de passe faible. Le mot de passe doit dépasser 6 caractéres");
			  break;
			default:
				//alert("Erreur d'authentification");
				alert("Erreur d'inscription");
			}
			});
	}else{
	  alert("les champs mot de passe et confirmer mot de passe doivent être identiques")
	}
  }
  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }
  render() {
    return (
    <View style={styles.container}>
	 <Image style={styles.image_splash} source={{uri:'http://localhost:8081/img/Splash.png'}}>
		<Image style={{marginBottom:0,marginTop:50,marginLeft: ((window.width)/9)-15,marginRight: ((window.width)/9)-15,height:((window.width)/6)+30,width:(window.width/2)+122}} source={{uri:'http://localhost:8081/img/logo_katomi.png'}}></Image>
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
			<Text style={styles.text_signup_terms}>En cliquant sur "créer un compte" ,vous acceptez nos conditions d'utilisation et notre Politique de confidentialité.</Text>
        </View>
		</Image>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);