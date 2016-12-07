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
  ScrollView,
  TextInput,
  Image,
  TouchableHighlight,
  AsyncStorage,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import {Button, List, ListItem, Thumbnail, Header, InputGroup, Input, Card, CardItem} from 'native-base';
import Slider from 'react-native-slider';
import UploadForm from './uploadForm';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class phototype extends Component {
	constructor (props) {
    super(props);
    this.state = {
	loaded:true, 
	back_color: 'transparent',
	back_color1: 'transparent',
	back_color2: 'transparent',
	back_color3: 'transparent',
	back_color4: 'transparent',
	back_color5: 'transparent',
	textColor: '#29235c',
	textColor1: '#29235c',
	textColor2: '#29235c',
	textColor3: '#29235c',
	textColor4: '#29235c',
	textColor5: '#29235c',
	text2: '#696969',
	text3: '#696969',
	text4: '#696969',
	text5: '#696969',
	text6: '#696969',
	text7: '#696969',
    }
  }
  phototype_1(){
	    AsyncStorage.setItem('Phototype_value','I');
	    AsyncStorage.setItem('Sed_Value','2.5');
		this.setState({back_color: '#322a7d', textColor: 'white',text2: 'white'});
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	phototype_2(){
		AsyncStorage.setItem('Phototype_value','II');
		AsyncStorage.setItem('Sed_Value','3.0');
		this.setState({back_color1: '#322a7d', textColor1: 'white',text3: 'white'});
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	phototype_3(){
		AsyncStorage.setItem('Phototype_value','III');
		AsyncStorage.setItem('Sed_Value','4.5');
		this.setState({back_color2: '#322a7d', textColor2: 'white',text4: 'white'});
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	phototype_4(){
		AsyncStorage.setItem('Phototype_value','IV');
		AsyncStorage.setItem('Sed_Value','6.0');
		this.setState({back_color3: '#322a7d', textColor3: 'white',text5: 'white'});
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	phototype_5(){
		AsyncStorage.setItem('Phototype_value','V');
		AsyncStorage.setItem('Sed_Value','7.5');
		this.setState({back_color4: '#322a7d', textColor4: 'white',text6: 'white'});
		this.props.navigator.push({
          component: UploadForm
        }); 
	}
	phototype_6(){
		AsyncStorage.setItem('Phototype_value','VI');
		AsyncStorage.setItem('Sed_Value','12.0');
		this.setState({back_color5: '#322a7d', textColor5: 'white',text7: 'white'});
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
	  <HeaderUp text="Phototype" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
		<ScrollView>	
		  <List style={{height:500}}>
	        <ListItem  style={styles.list_Phototype}>
			   <Grid> 
				    <Button onPress={this.phototype_1.bind(this)} style={{backgroundColor: this.state.back_color,height:90, width:400}} textStyle={{color: this.state.textColor}} transparent>
						 <Row>
								<Col style={{width:65}}>
									<Image style={styles.image_Phototype} source={{uri:'http://localhost:8081/img/img1.png'}}/>
								</Col>
								<Col style={{width:250, marginLeft:25}}>
									<Text style={{fontSize: 15,fontWeight:"bold",color: this.state.textColor}}>Phototypes I{"\n"}</Text> 
									<Text style={{fontSize: 13,color: this.state.text2}}>Peau trés blanche, yeux clairs,cheveux roux/blonds, taches de rousseur ++</Text>
								</Col>
						 </Row>	
			         </Button>			 
               </Grid>				 
			</ListItem>
		   <ListItem style={styles.list_Phototype}>
			  <Grid> 
				 <Button onPress={this.phototype_2.bind(this)} style={{backgroundColor: this.state.back_color1,height:90, width:400}} textStyle={{color: this.state.textColor1, marginTop:40}} transparent>
						<Row>
							<Col style={{width:65}}>
								<Image style={styles.image_Phototype} source={{uri:'http://localhost:8081/img/img2.png'}}/>
							</Col>
							<Col style={{width:250, marginLeft:25}}>
								<Text style={{fontSize: 15,fontWeight:"bold",color: this.state.textColor1}}>Phototypes II{"\n"}</Text> 
								<Text style={{fontSize: 13,color: this.state.text3}}>Peau claire, yeux clairs ,cheveux blonds/chatains, taches de rousseur +</Text>
							</Col>
						 </Row>	
			     </Button>			 
               </Grid>				 
			 </ListItem>
			 <ListItem  style={styles.list_Phototype}>
			   <Grid> 
				 <Button onPress={this.phototype_3.bind(this)} style={{backgroundColor: this.state.back_color2,height:70, width:400}} textStyle={{color: this.state.textColor2}} transparent>
						<Row>
							<Col style={{width:65}}>
								<Image style={styles.image_Phototype} source={{uri:'http://localhost:8081/img/img3.png'}}/>
							</Col>
							<Col style={{width:200, marginLeft:25}}>
								<Text style={{fontSize: 15,fontWeight:"bold",color: this.state.textColor2}}>Phototypes III{"\n"}</Text> 
								<Text style={{fontSize: 13,color: this.state.text4}}>Peau intermédiaire, yeux bruns,cheveux chatains</Text>
							</Col>
						 </Row>	
			     </Button>			 
               </Grid>				 
			</ListItem>
			<ListItem  style={styles.list_Phototype}>
			   <Grid> 
				 <Button onPress={this.phototype_4.bind(this)} style={{backgroundColor: this.state.back_color3,height:70, width:400}} textStyle={{color: this.state.textColor3}} transparent>
						<Row>
							<Col style={{width:65}}>
								<Image style={styles.image_Phototype} source={{uri:'http://localhost:8081/img/img4.png'}}/>
							</Col>
							<Col style={{width:200, marginLeft:25}}>
								<Text style={{fontSize: 15,fontWeight:"bold",color: this.state.textColor3}}>Phototypes IV{"\n"}</Text> 
								<Text style={{fontSize: 13,color: this.state.text5}}>Peau mate, yeux bruns/noirs,cheveux bruns/noirs</Text>
							</Col>
						 </Row>	
			     </Button>			 
               </Grid>				 
			</ListItem>
			<ListItem  style={styles.list_Phototype}>
			   <Grid> 
				 <Button onPress={this.phototype_5.bind(this)} style={{backgroundColor: this.state.back_color4,height:70, width:400}} textStyle={{color: this.state.textColor4}} transparent>
						<Row>
							<Col style={{width:65}}>
								<Image style={styles.image_Phototype} source={{uri:'http://localhost:8081/img/img5.png'}}/>
							</Col>
							<Col style={{width:200, marginLeft:25}}>
								<Text style={{fontSize: 15,fontWeight:"bold",color: this.state.textColor4}}>Phototypes V{"\n"}</Text> 
								<Text style={{fontSize: 13,color: this.state.text6}}>Peau brune foncée, yeux noirs,cheveux noirs</Text>
							</Col>
						 </Row>	
			     </Button>			 
               </Grid>				 
			</ListItem>
			<ListItem  style={styles.list_Phototype}>
			   <Grid> 
				 <Button onPress={this.phototype_6.bind(this)} style={{backgroundColor: this.state.back_color5,height:70, width:400}} textStyle={{color: this.state.textColor5}} transparent>
						<Row>
							<Col style={{width:65}}>
								<Image style={styles.image_Phototype} source={{uri:'http://localhost:8081/img/img6.png'}}/>
							</Col>
							<Col style={{width:200, marginLeft:25}}>
								<Text style={{fontSize: 15,fontWeight:"bold",color: this.state.textColor5}}>Phototypes VI{"\n"}</Text> 
								<Text style={{fontSize: 13,color: this.state.text7}}>Peau noire, yeux noirs,cheveux noirs.</Text>
							</Col>
						 </Row>	
			     </Button>			 
               </Grid>				 
			</ListItem>

						 
		  </List>
		  
		</ScrollView>   
	</View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  component: {
   marginBottom: 15,
   marginLeft: 20,
  },
  list_Phototype:{
	borderColor:'#29235c',
	marginRight:35, 
	height:83
  },
  image_Phototype: {
    width:70,
    height: 60,
	borderRadius: 80,
	marginBottom:50
  },
  titre_Phototype: {
	fontSize: 15,
	fontWeight:"bold",
    marginBottom:30	
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('phototype', () => phototype);