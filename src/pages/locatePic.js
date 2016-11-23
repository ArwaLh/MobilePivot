/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ScrollView,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TextInput,
  BackAndroid,
  TouchableHighlight,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import styles from '../styles/common-styles.js';
import {InputGroup, Input, Button, Card, CardItem, Header, Icon} from 'native-base';

import UploadForm from './uploadForm';
import NewPatient from './newPatient';
export default class locatePic extends Component {
	constructor(props){
    super(props);
		this.state = {
		  loaded: true
		}
	}
	validate_location(){
		alert("next is cam page");
		/* this.props.navigator.push({
          component: UploadForm
        }); */ 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Localiser Photo" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>  
		<Image style={styles.image} source={{uri:'http://localhost:8081/img/locate.png'}}>
			<Button
				onPress={this.validate_location.bind(this)}
				style={styles.primary_button_non}
				textStyle={{color: '#53507c'}} transparent>Valider</Button>
		</Image>
    </ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
