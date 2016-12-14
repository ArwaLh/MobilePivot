/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Dimensions,
  ListView,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import { List, ListItem, Button, Grid, Col} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const window = Dimensions.get('window');
import Swiper from 'react-native-swiper';
import firebase from 'firebase';

import LocatePic from './locatePic';
export default class gestionNaevus extends Component {
	constructor (props) {
		super(props);
		this.itemsRef = firebase.database().ref();
		this.state = {
			dataSource: new ListView.DataSource({
			  rowHasChanged: (row1, row2) => row1 !== row2,
			})
		};
	}
/* 	componentWillMount(){
		AsyncStorage.getItem('medecin_username').then((medecin_username) => {
		  this.setState({
			username_med: medecin_username,
			loaded: true
		  });
		});
	} */
	listenForItems(itemsRef) {
		this.itemsRef.child('medecins/'+"cyrine1"+"/patients/").on('value', (snap) => {
		// get children as an array
		var items = [];
		snap.forEach((child) => {
			items.push({
			  nom_pat: child.val().nom_pat,
			  prenom_pat: child.val().prenom_pat,
			  _key: child.key
			});
		});
		
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(items)
		 });

		});
	}
	componentDidMount(){
		this.listenForItems(this.itemsRef);
	}
	goBack() { 
		this.props.navigator.pop();
		return true; // do not exit app
	}
	localiser_photo(){
		this.props.navigator.push({
          component: LocatePic
        }); 
	}
	
	
  render() {
    return ( 
	<View style={{backgroundColor: 'white'}}>
	<HeaderUp text="Gestion Naevus" loaded={true} onpress={this.goBack.bind(this)}/>
	<ScrollView style={{backgroundColor: 'black'}}>
	<View style={{flex:1}}>
		<ListView dataSource={this.state.dataSource}
        renderRow={(rowData) => 
					<List style={{backgroundColor:'white'}}>
					  <ListItem>
					  <Button style={{height:120}} onPress={this.localiser_photo.bind(this)} transparent>
						<Grid>
						<Col>
						<Icon name="folder-open" size={45} style={{color: '#29235c', fontSize: 50, width:55,marginLeft: (window.width/2)-130,marginTop:35}}/>
						</Col>
						<Col>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>nom patient</Text>
						<Text style={{color: '#a8a8a8',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>{rowData.nom_pat}</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>prenom patient</Text>
						<Text style={{color: '#a8a8a8',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>{rowData.prenom_pat}</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>prenom patient</Text>
						<Text style={{color: '#a8a8a8',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14}}>{rowData.prenom_pat}</Text>
						</Col>
						</Grid>
					  </Button>
					  </ListItem>
					</List>
					} style={{backgroundColor: 'white',flex:2}}/>		
		<List style={{backgroundColor: 'white',height:100}}>
			<ListItem>
				<TouchableOpacity>
				  <Icon name="plus-square-o" size={75} style={{color: '#29235c', fontSize: 70, width:100,marginLeft: (window.width/2)-50}}/> 	
				</TouchableOpacity>
            </ListItem>
        </List>
	</View>
	</ScrollView>   
	</View>
    );
  }
}

AppRegistry.registerComponent('gestionNaevus', () => gestionNaevus);