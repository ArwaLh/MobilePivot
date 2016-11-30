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
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import {Button, List, ListItem, Thumbnail, Header, InputGroup, Input, Card, CardItem} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";

export default class phototype extends Component {
	constructor (props) {
    super(props);
    this.state = {
	loaded:true, 
    }
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
		  <List>
	           <ListItem >
			   <Grid>
				  <Row>
						<Col style={{width:65}}>
						<Image style={{width:70, height: 70, borderRadius : 30}} source={{uri:'http://localhost:8081/img/img1.png'}}/>
						</Col>
						<Col style={{width:250, marginLeft:30}}>
								   <Row>
										<Text style={{fontSize: 15, color:'#29235c',fontWeight:"bold"}}>Phototypes I</Text>
								  </Row>
								  <Row>
									<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ligula non .</Text>
							      </Row>
					    </Col>			  
				 </Row>	
               </Grid>				 
			   </ListItem>
			     <ListItem>
			   <Grid>
				  <Row>
						<Col style={{width:65}}>
						<Image style={{width:70, height: 70, borderColor: '#29235c'}} source={{uri:'http://localhost:8081/img/img2.png'}}/>
						</Col>
						<Col style={{width:250, marginLeft:30}}>
								   <Row>
										<Text style={{fontSize: 15, color:'#29235c',fontWeight:"bold"}}>Phototypes  II</Text>
								  </Row>
								  <Row>
									<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ligula non .</Text>
							      </Row>
					    </Col>			  
				 </Row>	
               </Grid>				 
			   </ListItem>
			     <ListItem>
			   <Grid>
				  <Row>
						<Col style={{width:65}}>
						<Image style={{width:70, height: 70, borderColor: '#29235c'}} source={{uri:'http://localhost:8081/img/img3.png'}}/>
						</Col>
						<Col style={{width:250, marginLeft:30}}>
								   <Row>
										<Text style={{fontSize: 15, color:'#29235c',fontWeight:"bold"}}>Phototypes III </Text>
								  </Row>
								  <Row>
									<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ligula non .</Text>
							      </Row>
					    </Col>			  
				 </Row>	
               </Grid>				 
			   </ListItem>
			     <ListItem>
			   <Grid>
				  <Row>
						<Col style={{width:65}}>
						<Image style={{width:70, height: 70, borderColor: '#29235c'}} source={{uri:'http://localhost:8081/img/img4.png'}}/>
						</Col>
						<Col style={{width:250, marginLeft:30}}>
								   <Row>
										<Text style={{fontSize: 15, color:'#29235c',fontWeight:"bold"}}>Phototypes IV</Text>
								  </Row>
								  <Row>
									<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ligula non .</Text>
							      </Row>
					    </Col>			  
				 </Row>	
               </Grid>				 
			   </ListItem>
			     <ListItem>
			   <Grid>
				  <Row>
						<Col style={{width:65}}>
						<Image style={{width:70, height: 70, borderColor: '#29235c'}} source={{uri:'http://localhost:8081/img/img5.png'}}/>
						</Col>
						<Col style={{width:250, marginLeft:30}}>
								   <Row>
										<Text style={{fontSize: 15, color:'#29235c',fontWeight:"bold"}}>Phototypes V</Text>
								  </Row>
								  <Row>
									<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ligula non .</Text>
							      </Row>
					    </Col>			  
				 </Row>	
               </Grid>				 
			   </ListItem>
			     <ListItem>
			   <Grid>
				  <Row>
						<Col style={{width:65}}>
						<Image style={{width:70, height: 70, borderColor: '#29235c'}} source={{uri:'http://localhost:8081/img/img6.png'}}/>
						</Col>
						<Col style={{width:250, marginLeft:30}}>
								   <Row>
										<Text style={{fontSize: 15, color:'#29235c',fontWeight:"bold"}}>Phototypes  VI</Text>
								  </Row>
								  <Row>
									<Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis ligula non .</Text>
							      </Row>
					    </Col>			  
				 </Row>	
               </Grid>				 
			   </ListItem>
						 
		  </List>
		  
		</ScrollView>   
	</View>
    );
  }
   onValueChange = (key: string, value: string) => {
    const newState = {};
    newState[key] = value;
    this.setState(newState);
  };
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
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('phototype', () => phototype);