const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken 
} = FBSDK;
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';

import Signup from './signup';
import Account from './account';
import Didacticiel from './didacticiel';
import * as firebase from 'firebase';

import styles from '../styles/common-styles.js';
import Button from '../components/button';
import Header from '../components/header';
import { Container, Content, Title, Image, Card, CardItem, Thumbnail, Text, Icon } from 'native-base';
export default class loginNative extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }
  render(){
    return (
	 <Container>
		<Header text="Authentification" loaded={this.state.loaded} />
        <Content  style={{margin:50}}>
            <Card style={{ flex: 0}}>
                <CardItem>
                    <Text>Login with e-mail and password</Text>
                </CardItem>

                <CardItem>                        
                    <TextInput
					style={styles.textinput}
					onChangeText={(text) => this.setState({email: text})}
					value={this.state.email}
					placeholder={"Adresse e-mail"}
				  />
				  <TextInput
					style={styles.textinput}
					onChangeText={(text) => this.setState({password: text})}
					value={this.state.password}
					secureTextEntry={true}
					placeholder={"Mot de passe"}
				  />

				  <Button
					text="Connexion"
					onpress={this.login.bind(this)}
					button_styles={styles.primary_button}
					button_text_styles={styles.primary_button_text} />
					
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
				  onLogoutFinished={() => alert("User logged out")}/>
				  <Text style={{marginBottom:5}}></Text>
				  <Button
					text="Créer un compte"
					onpress={this.goToSignup.bind(this)}
					button_styles={styles.transparent_button}
					button_text_styles={styles.transparent_button_text} />
                </CardItem>
            </Card>
        </Content>
    </Container>
    );
  }

  login(){

    this.setState({
      loaded: false
    });
    firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then((user_data) =>{

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

AppRegistry.registerComponent('loginNative', () => loginNative);