import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  AsyncStorage,
  View
} from 'react-native';

import ButtonS from '../components/button';
import Header from '../components/header';

import Login from './login';

import styles from '../styles/common-styles.js';
import {InputGroup, Input, Button} from 'native-base';
import firebase from 'firebase';
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
		  alert(error.message);
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
				onPress={this.signup.bind(this)}
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