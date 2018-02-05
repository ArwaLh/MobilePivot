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
import TakePic from './takePic';
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
		<Image style={{marginBottom:0,marginTop:70,marginLeft: ((window.width)/9)-15,marginRight: ((window.width)/9)-15,height:((window.width)/6)+30,width:(window.width/2)+122}} source={{uri: 'logo_katomi'}}></Image>
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
			 	this.props.navigator.push({
				component: TakePic
				});
			}else{
				alert("Vérifier votre boîte de réception et confirmer votre e-mail")
			}
			})
		  }).catch(function(error) {
			  //switch cases of authentication errors
				switch (error.code) {
				case "auth/invalid-email":
					alert("Erreur d'authentification: e-mail invalide");
					break;
				case "auth/user-disabled":
					alert("Erreur d'authentification: utilisateur désactivé");
					break;
				case "auth/user-not-found":
					alert("Erreur d'authentification: utilisateur introuvable");
					break;
				case "auth/wrong-password":
					alert("Erreur d'authentification: mot de passe incorrect");
					break;
				default:
					alert("Erreur d'authentification! Vérifiez votre connexion");
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