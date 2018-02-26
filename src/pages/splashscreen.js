import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  AppRegistry,
  Dimensions
} from 'react-native';
import Didacticiel from './didacticiel';
import Login from './login';
import TakePic from './takePic';
import styles from '../styles/common-styles.js';
import {Button} from 'native-base';
import firebase from 'firebase';

const window = Dimensions.get('window');

export default class splashscreen extends Component {
  constructor(props){
	super(props);
	this.state = {
		  loading: true,
		  authenticated: false,
		  btnText: "",
		  logout: ""
		};
  }
  demarrer(){     
	if (this.state.authenticated && this.state.btnText === "DEMARRER") {
		this.props.navigator.push({
			component: TakePic
		});
	}else if (!this.state.authenticated && this.state.btnText === "CONNEXION") {
		this.props.navigator.push({
			component: Login
		});
	}
  }
  didacticiel(){
	if (this.state.logout === "DECONNEXION") {
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  alert("DECONNEXION TERMINEE")
		}).catch(function(error) {
		  // An error happened.
		  alert("DECONNEXION ECHOUEE")
		});
	}else{
		alert("VEUILLEZ VOUS CONNECTER!")
	}
  }
  componentDidMount() {
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			this.setState({ loading: false, authenticated: true, btnText: "DEMARRER", logout: "DECONNEXION"});
		} else {
			this.setState({ loading: false, authenticated: false, btnText: "CONNEXION", logout: "" });
		}
	});
  }
  render() {
	return (
	  <View style={styles.container}>
		<Image style={styles.image_splash} source={{uri: 'splash'}}>
			<View style={{flexDirection: 'column',backgroundColor: 'transparent'}}>
			    <Image style={{height:((window.width)/6)+30,width:(window.width/2)+122,marginLeft: ((window.width)/9)-15,marginRight: ((window.width)/9)-15 , marginTop:(window.height/2)-110}} source={{uri: 'logo_katomi'}}></Image>
				<Button
					onPress={this.demarrer.bind(this)}
					style={{width:200,height:50,marginLeft:(window.width/2)-100,marginTop:190,marginBottom:1,borderColor: 'white'}}
					bordered><Text style={{color: 'white'}}>{this.state.btnText}</Text></Button>      
				<Button
					onPress={this.didacticiel.bind(this)}
					style={{width:200,height:50,marginLeft:(window.width/2)-100,marginTop:0,marginBottom:15}}
				   	transparent><Text style={{color: 'white'}}>{this.state.logout}</Text></Button>
			</View>
		</Image>
	  </View>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
	);
  }
}
AppRegistry.registerComponent('splashscreen', () => splashscreen);