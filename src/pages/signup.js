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
	this.itemsRef = firebase.database().ref();

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
	let items_med = [];
	this.itemsRef.child('medecins').on('value', (snap) => {
		  // get children as an array
		  snap.forEach((child) => {
			items_med.push({
			  email: child.val().email,
			  _key: child.key,
			  adresse_cabinet: child.val().adresse_cabinet,
			  _key: child.key,
			});
		  });
		});
	let medecins=items_med;
	let medecin_id=this.state.medecin.email.substring(0, 1)+this.state.medecin.password.substring(0, 1)+medecins.length;
    firebase.auth().createUserWithEmailAndPassword(this.state.medecin.email,this.medecin.state.password).then((userData) =>{
	//ajouter medecin à firebase database
	itemsRef.child("medecins/"+medecin_id).set({
		email: this.state.medecin.nom, 
		adresse_cabinet: this.state.medecin.adresse_cabinet, 
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
                value={this.state.medecin.email}
				placeholder={"Adresse e-mail"}
				underlineColorAndroid="#53507c"
            />
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({password: text})}
				value={this.state.medecin.password}
				secureTextEntry={true}
				placeholder={"Mot de passe"}
				underlineColorAndroid="#53507c"
			/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({confirm_password: text})}
				value={this.state.medecin.confirm_password}
				secureTextEntry={true}
				placeholder={"Confirm password"}
				underlineColorAndroid="#53507c"
			/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({adresse_cabinet: text})}
				value={this.state.medecin.adresse_cabinet}
				secureTextEntry={true}
				placeholder={"Adresse du cabinet"}
				underlineColorAndroid="#53507c"
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