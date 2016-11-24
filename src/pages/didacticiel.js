import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  AppRegistry,
  BackAndroid,
  Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '../components/button';
import Account from './account';
import AddPatient from './addPatient';
const { width, height } = Dimensions.get('window');
var styles = {
  wrapper: {
  },
  slide1: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  slide2: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  slide3: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  slide: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  image: {
    width,
    height,
    flex: 1
  },
  transparent_button_right: {
    marginTop: 200,
    padding: 15,
	alignItems: 'flex-start',
  },
  transparent_button_left: {
    marginTop: 200,
    padding: 15,
	alignItems: 'flex-end',
  },
  transparent_button_text_left: {
    color: '#0485A9',
    fontSize: 16
  },
  transparent_button_text_right: {
    color: '#0485A9',
    fontSize: 16
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  backgroundImage: {
    resizeMode: 'cover', // or 'stretch'
  },
}
export default class didacticiel extends Component {
	constructor(props){
		super(props);
		this.state = {
		  loaded: true
		}
	}
	next(){
		alert('Passer au didacticiel');
	}
	skip(){
		this.props.navigator.push({
          component: AddPatient
        });
	}
	componentDidMount() {
        //the '.bind(this)' makes sure 'this' refers to 'ViewComponent'
        BackAndroid.addEventListener('hardwareBackPress', function() {
            this.props.navigator.pop();
            return true;
        }.bind(this));
    }
	render() {
		return (
			<View>
			  <Swiper style={styles.wrapper}
				dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
				activeDot={<View style={{backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7}} />}
				paginationStyle={{
				  bottom: 70
				}}
				loop={false} showsButtons>
				<View style={styles.slide1}>
				  <Image style={styles.image} source={{uri:'http://localhost:8081/img/didacticiel.png'}}>
						<Button
							text="Démarrer"
							onpress={this.next.bind(this)}
							button_styles={styles.transparent_button_left}
							button_text_styles={styles.transparent_button_text_left} />
						<Button
							text="Sortir"
							onpress={this.skip.bind(this)}
							button_styles={styles.transparent_button_right}
							button_text_styles={styles.transparent_button_text_right} />
				  </Image>
				</View>
				<View style={styles.slide2}>
				  <Image style={styles.image} source={{uri:'http://localhost:8081/img/did2.png'}} />
				</View>
				<View style={styles.slide3}>
				  <Image style={styles.image} source={{uri:'http://localhost:8081/img/did3.png'}} />
				</View>
			  </Swiper>
		  </View>
		);
	}
}
AppRegistry.registerComponent('didacticiel', () => didacticiel);