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
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import Header from '../components/header';

import Signup from './signup';
import GestionPatient from './gestionPatient';
import Categories from './categories';

import styles from '../styles/common-styles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hr from 'react-native-hr';
import {InputGroup, Input, Button} from 'native-base';
import firebase from 'firebase';
export default class login extends Component {

  constructor(props){
    super(props);
	this.itemsRef = firebase.database().ref();
    this.state = {
      email_medecin: '',
      password: '',
      loaded: true,
	  secureTextEntry: true,
	  count: 0,
	  medecin_id:"",
	  id: [],
	  all_arrays:[],
	  all_array:[]
    }
	this.login=this.login.bind(this);
	
  }

  render(){
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
				<Image style={{width:27,height:15,margin:0,padding:0}} source={{uri:'http://localhost:8081/img/eye.png'}}></Image>
			</TouchableOpacity>
		  </View>
		  <Text style={{marginBottom:15}}></Text>
		  <View style={{flexDirection:'row', flexWrap:'wrap',marginBottom:15}}>
			  <Button
				onPress={this.goToSignup.bind(this)}
				style={{borderColor: "#fff"}}
				textStyle={{fontSize: 16, color:'#fff'}} transparent>S'INSCRIRE</Button>
			  <Button
				onPress={this.login.bind(this)}
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
				  component: GestionPatient
				});
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}
		  />
        </View>
		</Image>
      </View>
    );
  }
  login(){
	const auth=firebase.auth();
    auth.signInWithEmailAndPassword(this.state.email_medecin,this.state.password).then((user_data) =>{
		this.itemsRef.child('medecins').orderByChild('email_medecin').equalTo(this.state.email_medecin).on("value", (snapshot)=> {
			let id=[];
			let all_arrays=[];
			id=Object.keys(snapshot.val());
			all_arrays=Object.values(snapshot.val());
			AsyncStorage.setItem('medecin_username', id[0]);
			if(Object.values(all_arrays[0].categories)==null || (Object.values(all_arrays[0].categories)).length==1){
				this.props.navigator.push({ 
				  component: GestionPatient
				});
			}else{
				this.itemsRef.child('medecins').child(id[0]).child('categories').on('value', (snap) => {
				//mapping
				let array_cat=[];		
				let items=[];
				items=snap.val();
				for (var k in items){
					if (items.hasOwnProperty(k)) {
						 array_cat.push({"key":k,"value":items[k].nom_categorie});	
					}
				}
				AsyncStorage.setItem("categories",JSON.stringify(array_cat));
				});
				
				this.props.navigator.push({
				  component: Categories
				});
			}
		});
    }).catch((error)=>{
		 alert(error.message);
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