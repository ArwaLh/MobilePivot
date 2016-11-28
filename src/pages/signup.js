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
      email_medecin: '',
      confirm_password: '',
      password: '',
      adresse_cabinet: ''
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
			  email_medecin: child.val().email_medecin,
			  _key: child.key,
			  adresse_cabinet: child.val().adresse_cabinet,
			  _key: child.key,
			});
		  });
		});
	let medecins=items_med;
	let medecin_id=this.state.email_medecin.substring(0, 1)+this.state.email_medecin.substring(0, 1)+medecins.length;
    firebase.auth().createUserWithEmailAndPassword(this.state.email_medecin,this.state.password).then((userData) =>{
	//ajouter medecin à firebase database
	this.itemsRef.child("medecins/"+medecin_id).set({
		email_medecin: this.state.email_medecin, 
		adresse_cabinet: this.state.adresse_cabinet, 
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
                onChangeText={(text) => this.setState({email_medecin: text})}
                value={this.state.email_medecin}
				placeholder={"Adresse e-mail"}
				underlineColorAndroid="#fff"
				placeholderTextColor="#fff"
            />
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({password: text})}
				value={this.state.password}
				secureTextEntry={true}
				placeholder={"Mot de passe"}
				underlineColorAndroid="#fff"
				placeholderTextColor="#fff"
			/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({confirm_password: text})}
				value={this.state.confirm_password}
				secureTextEntry={true}
				placeholder={"Confirm password"}
				underlineColorAndroid="#fff"
				placeholderTextColor="#fff"
			/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({adresse_cabinet: text})}
				value={this.state.adresse_cabinet}
				placeholder={"Adresse du cabinet"}
				underlineColorAndroid="#fff"
				placeholderTextColor="#fff"
			/>
			<Button
				onPress={this.signup.bind(this)}
				style={styles.primary_button}
				textStyle={styles.primary_button_text} b>S'inscrire</Button>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);