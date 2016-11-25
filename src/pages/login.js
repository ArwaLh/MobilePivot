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
  View,
  AsyncStorage
} from 'react-native';

import ButtonFB from '../components/button_fb';
import ButtonS from '../components/button';
import Header from '../components/header';

import Signup from './signup';
import Account from './account';
import Didacticiel from './didacticiel';

import styles from '../styles/common-styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InputGroup, Input, Button} from 'native-base';
import firebase from 'firebase';
export default class login extends Component {

  constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref('medecins');
    this.state = {
      email_medecin: '',
      password: '',
      loaded: true
    }

  }

  render(){
    return (
      <View style={styles.container}>
	  <Header text="KatoMobile" loaded={this.state.loaded}/>
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email_medecin: text})}
            value={this.state.email_medecin}
            placeholder={"Adresse e-mail"}
			underlineColorAndroid="black"
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Mot de passe"}
			underlineColorAndroid="black"
          />
		  <Button
			onPress={this.login.bind(this)}
			style={styles.primary_button}
			textStyle={styles.primary_button_text}
		  >Connexion</Button>
		  <Text style={{marginBottom:15}}></Text>
		  <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
				  AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
                alert("Login was successful with permissions: " + result.grantedPermissions);
				this.props.navigator.push({
				  component: Account
				});
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}
		  s/>
		  <Text style={{marginBottom:5}}></Text>
          <ButtonS
            text="Créer un compte"
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  login(){

    this.setState({
      loaded: false
    });
    firebase.auth().signInWithEmailAndPassword(this.state.email_medecin,this.state.password).then((user_data) =>{
		this.itemsRef.orderByChild('email_medecin').equalTo(this.state.email_medecin).on("child_added", function(snapshot) {
			AsyncStorage.setItem('medecin_username', snapshot.key);
			alert(snapshot.key);
		});
		alert('Login success');
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({
          component: Didacticiel
        });
    }).catch((error)=>{
		 alert(error.message);
	});
	this.setState({
		loaded: true
	});

  }
  login_fb(){
	this.setState({
      loaded: false
    });
	var uid = "some-uid";
	admin.auth().createCustomToken(uid)
	  .then(function(customToken) {
		// Send token back to client
	  })
	  .catch(function(error) {
		console.log("Error creating custom token:", error);
	  });

	//
	let access_token="1151728471584254";
	firebase.auth().signInWithCustomToken(access_token).then(function(result,error){
		this.setState({
        loaded: true
    });
	if(error){
        alert('Login facebook Failed. Please try again');
    }else{
		alert('Login facebook success');
        AsyncStorage.setItem('user_data', JSON.stringify(result.user));
        this.props.navigator.push({
          component: Didacticiel
        });
    }
	});
  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }
}
const styles2 = StyleSheet.create({
  body: {
    flex: 9,
    alignItems: 'center',
	marginTop: 40,
	backgroundColor: '#29255c'
  },
});

AppRegistry.registerComponent('login', () => login);