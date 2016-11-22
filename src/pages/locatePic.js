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
	locatePic(){
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}	
  render() {
    return (
	<View>
	<HeaderUp text="Localiser Photo" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView  style={styles.body2}>  
		<Image style={styles.image} source={{uri:'http://localhost:8081/img/locate.png'}}>
			<Button
				onPress={this.locatePic.bind(this)}
				style={styles.primary_button_non}
				textStyle={styles.primary_button_text}>Localiser Photo</Button>
		</Image>
    </ScrollView>
     </View>
    );
  }
}

AppRegistry.registerComponent('locatePic', () => locatePic);
