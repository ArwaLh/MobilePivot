import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

import ButtonS from '../components/button';
import Header from '../components/header';

import Login from './login';
import * as firebase from 'firebase';

import styles from '../styles/common-styles.js';
import {InputGroup, Input, Button} from 'native-base';
export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });

    firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((userData) =>{

        alert('Your account was created!');
		this.props.navigator.push({
          component: Login
        });
    }).catch((error)=>{
		  var errorCode=error.code;
		  var errorMessage= error.message;
        switch(errorCode){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert(errorMessage);
		
		}
	});
	
      this.setState({
        email: '',
        password: '',
        loaded: true
      });

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header text="S'inscrire" loaded={this.state.loaded} />
        <View style={styles.body}>

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
            onpress={this.signup.bind(this)}
            style={styles.primary_button}
            textStyle={styles.primary_button_text}>S'inscrire</Button>

          <ButtonS
            text="Connexion"
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);