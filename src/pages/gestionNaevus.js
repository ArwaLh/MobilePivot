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
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';
import HeaderUp from '../components/headerUp';
import { Card, CardItem, Button, Grid, Col} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const window = Dimensions.get('window');
import Swiper from 'react-native-swiper';
export default class gestionNaevus extends Component {
	constructor (props) {
		super(props);
		this.state = {
			loaded:true
		}
	}
/* 	componentWillMount(){
		AsyncStorage.getItem('medecin_username').then((medecin_username) => {
		  this.setState({
			username_med: medecin_username,
			loaded: true
		  });
		});
	} */
	goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	
	
  render() {
    return ( 
	<View>
	<HeaderUp text="Gestion Naevus" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
	<ScrollView>
		<Card style={{backgroundColor: 'white'}}>		
			<CardItem>
				<Grid>
					<Col>
						<Image source={{uri: 'http://www.ospedalebambinogesu.it/documents/10179/0/nei_BambinoGes%C3%B9.jpg/9724bd91-cbc8-4706-8a58-169ac634ac26?t=1393260133105'}} style={{height:270,borderColor: 'black'}}>
						<Icon name="folder-open" size={55} style={{color: '#29235c ', fontSize: 50, width:55,marginLeft: (window.width/2)-120,marginTop:120}}/>
						</Image>
					</Col>
					<Col style={{borderColor: 'black'}}>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Patient : 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>XXX</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Nombre de photos: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>5 </Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Date de création: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>12/12/2016</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Derniére mise à jour: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>16/12/2016</Text>
					</Col>
				</Grid>
            </CardItem>
		</Card>
		<Card  style={{backgroundColor: 'white'}}>
			<CardItem>
				<Grid>
					<Col>
						<Image source={{uri: 'http://www.ospedalebambinogesu.it/documents/10179/0/nei_BambinoGes%C3%B9.jpg/9724bd91-cbc8-4706-8a58-169ac634ac26?t=1393260133105'}} style={{height:270,borderColor: 'black'}}>
						<Icon name="folder-open" size={55} style={{color: '#29235c ', fontSize: 50, width:55,marginLeft: (window.width/2)-120,marginTop:120}}/>
						</Image>
					</Col>
					<Col style={{borderColor: 'black'}}>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Patient : 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>XXX</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Nombre de photos: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>5 </Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Date de création: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>12/12/2016</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Derniére mise à jour: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>16/12/2016</Text>
					</Col>
				</Grid>
            </CardItem>
		</Card>
		<Card style={{backgroundColor: 'white'}}>
			<CardItem>
				<Grid>
					<Col>
						<Image source={{uri: 'http://www.ospedalebambinogesu.it/documents/10179/0/nei_BambinoGes%C3%B9.jpg/9724bd91-cbc8-4706-8a58-169ac634ac26?t=1393260133105'}} style={{height:270,borderColor: 'black',borderWidth: 0.5}}>
						<Icon name="folder-open" size={55} style={{color: '#29235c ', fontSize: 50, width:55,marginLeft: (window.width/2)-120,marginTop:120}}/>
						</Image>
					</Col>
					<Col style={{borderColor: 'black',borderWidth: 0.5}}>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Patient : 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>XXX</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Nombre de photos: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>5 </Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Date de création: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>12/12/2016</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Derniére mise à jour: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>16/12/2016</Text>
					</Col>
				</Grid>
            </CardItem>
		</Card>
		<Card style={{backgroundColor: 'white'}}>
			<CardItem>
				<Grid>
					<Col>
						<Image source={{uri: 'http://www.ospedalebambinogesu.it/documents/10179/0/nei_BambinoGes%C3%B9.jpg/9724bd91-cbc8-4706-8a58-169ac634ac26?t=1393260133105'}} style={{height:270,borderColor: 'black'}}>
						<Icon name="folder-open" size={55} style={{color: '#29235c ', fontSize: 50, width:55,marginLeft: (window.width/2)-120,marginTop:120}}/>
						</Image>
					</Col>
					<Col style={{borderColor: 'black'}}>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Patient : 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>XXX</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Nombre de photos: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>5 </Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Date de création: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>12/12/2016</Text>
						<Text style={{color: '#29235c',fontFamily:'Roboto',fontWeight: 'bold', fontSize:14,margin:10}}>
						Derniére mise à jour: 
						</Text>
						<Text style={{margin:5,marginLeft:10}}>16/12/2016</Text>
					</Col>
				</Grid>
			</CardItem>
		</Card>
		<Card style={{backgroundColor: 'white'}}>
			<CardItem>
				<Button
					style={{borderColor: "#53507c",width:200,height:60,marginLeft:30}}
					textStyle={{fontSize: 18, color:'#53507c',fontWeight:"bold"}}
					bordered>Nouveau Dossier</Button>
            </CardItem>
        </Card>
	</ScrollView>   
	</View>
    );
  }
}

AppRegistry.registerComponent('gestionNaevus', () => gestionNaevus);