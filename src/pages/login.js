const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken 
} = FBSDK;
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import styles from '../styles/common-styles.js';
import Hr from 'react-native-hr';
import {Button} from 'native-base';
import firebase from 'firebase';
import dismissKeyboard from 'react-native-dismiss-keyboard';
import Signup from './signup';
import GestionPatient from './gestionPatient';
import Categories from './categories';
const window = Dimensions.get('window');
export default class login extends Component {
  constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
    this.state = {
      email_medecin: '',
      password: '',
	  secureTextEntry: true
    }
	this.login=this.login.bind(this);
	this.goToSignup=this.goToSignup.bind(this);
  }
  render(){
    return (
      <View style={styles.container}>
	  <Image style={styles.image_splash} source={{uri: 'splash'}}>
		<Image style={{marginBottom:0,marginTop:40,marginLeft: ((window.width)/9)-15,marginRight: ((window.width)/9)-15,height:((window.width)/6)+30,width:(window.width/2)+122}} source={{uri: 'logo_katomi'}}></Image>
        <View style={styles.body_login}>
          <TextInput
            style={styles.textinput_email}
            onChangeText={(text) => this.setState({email_medecin: text})}
            value={this.state.email_medecin}
            placeholder={"E-mail"}
			placeholderTextColor="#fff"
			underlineColorAndroid="white"
          />
		  <View style={{flexDirection:'row', flexWrap:'wrap'}}>
			  <TextInput
				ref="password"
				style={styles.textinput_mdp}
				onChangeText={(text) => this.setState({password: text})}
				value={this.state.password}
				secureTextEntry={this.state.secureTextEntry}
				placeholder={"Mot de passe"}
				placeholderTextColor="#fff"
				underlineColorAndroid="white"
				inlineImagePadding={0}
			  />
			<TouchableOpacity onPress={(password) =>{
					if(this.state.count==0){
						this.setState({secureTextEntry: false,count:1});
					}else{
						this.setState({secureTextEntry: true,count:0});
					}
					}}  style={{width: 27,margin:0 ,padding:0,marginBottom:0,height:15,marginTop:30}}>
				<Image style={{width:27,height:15,margin:0,padding:0}} source={{uri: 'eye'}}></Image>
			</TouchableOpacity>
		  </View>
		  <Text style={{marginBottom:15}}></Text>
		  <View style={{flexDirection:'row', flexWrap:'wrap',marginBottom:15}}>
			  <Button
				onPress={this.goToSignup}
				style={{borderColor: "#fff"}}
				textStyle={{fontSize: 16, color:'#fff'}} transparent>S'INSCRIRE</Button>
			  <Button
				onPress={this.login}
				style={{borderColor: "#fff",marginLeft:15}}
				textStyle={{fontSize: 16, color:'#fff'}}
				bordered>CONNEXION</Button>
		  </View>
			<Hr lineColor='#ffffff' text='OU' textColor='#ffffff' line={{width:10}}/>
		  <Text style={{marginBottom:45,color:'#fff'}}>connectez vous avec votre compte facebook</Text>
		  <LoginButton
		  style={{height:30,width:180}}
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Connexion echouée: " + result.error);
              } else if (result.isCancelled) {
                alert("Connexion interrompue");
              } else {
				  AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
                alert("Connecté avec les permissions: " + result.grantedPermissions);
				this.props.navigator.push({
				  component: GestionPatient
				});
              }
            }
          }
          onLogoutFinished={() => alert("Utilisateur deconnecté")}
		  />
        </View>
		</Image>
      </View>
    );
  }
  login(){
	const auth=firebase.auth();
    auth.signInWithEmailAndPassword(this.state.email_medecin,this.state.password).then((user_data) =>{
		this.itemsRef.child('medecins').orderByChild('email_medecin').equalTo(this.state.email_medecin).on("child_added", (snapshot)=> {
			AsyncStorage.setItem('medecin_username', snapshot.key);
			var name, email, photoUrl, uid, emailVerified;

		  if (user_data != null) {
			name = user_data.displayName;
			email = user_data.email;
			photoUrl = user_data.photoURL;
			emailVerified = user_data.emailVerified;
			uid = user_data.uid;
		  }	
		  if(emailVerified){
			this.itemsRef.child('categories').child(snapshot.key).once("value", (snap)=> {
				if(Object.keys(snap.val()).length==1){
					this.props.navigator.push({ 
					  component: GestionPatient
					});
				}else{
					this.props.navigator.push({
					  component: Categories
					});
				}
			});
			}else{
				alert("Email n'est pas verifié.");
			}
			})
		  }).catch(function(error) {
			  localStorage.setItem('error_login', true);
			  that.setState({error_login: true});
			  //switch cases of authentication errors
				switch (error.code) {
				case "auth/invalid-email":
					//alert("Erreur d'authentification: e-mail invalide");
					alert("Erreur d'authentification: e-mail invalide");
					break;
				case "auth/user-disabled":
					//alert("Erreur d'authentification: utilisateur désactivé");
					alert("Erreur d'authentification: utilisateur désactivé");
					break;
				case "auth/user-not-found":
					//alert("Erreur d'authentification: utilisateur introuvable");
					alert("Erreur d'authentification: utilisateur introuvable");
					break;
				case "auth/wrong-password":
					//alert("Erreur d'authentification: mot de passe incorrect");
					alert("Erreur d'authentification: mot de passe incorrect");
					break;
				default:
					//alert("Erreur d'authentification");
					alert("Erreur d'authentification");
				}
		});
  }
  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }
}

AppRegistry.registerComponent('login', () => login);