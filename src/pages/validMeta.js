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
  Picker,
  AsyncStorage,
  ScrollView,
  TextInput,
  View
} from 'react-native';

import HeaderUp from '../components/headerUp';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Button, List, ListItem, Header, InputGroup, Input, Card, CardItem} from 'native-base';
import Slider from 'react-native-slider';
import { Col, Row, Grid } from "react-native-easy-grid";
const Item = Picker.Item;
import UploadForm from './uploadForm';

export default class validMeta extends Component {
	constructor (props) {
    super(props);
    this.state = {
	loaded:true,
	mode: Picker.MODE_DIALOG,
    }
	}
  
  goBack() {
		this.props.navigator.pop();
		return true; // do not exit app
	}
	componentWillMount(){
		AsyncStorage.getItem('Bords_value').then((bordss) => {
		  this.setState({
			bords: bordss,
			loaded:true
		  });
		});
  }
  render() {
    return ( 
	<View>
	<HeaderUp text="Meta Data" loaded={this.state.loaded} onpress={this.goBack.bind(this)}/>
<ScrollView>	
    <CardItem style={styles.body2}>
	 <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>Bords</Text>
			  </Col>
              <Col>
				 <Text>{this.state.bords}</Text>
			 </Col> 
           </Grid>			 
	  </ListItem>	
	  <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>Couleur</Text>
			  </Col>
              <Col>
					<Text style={styles.metaDataForm}>Bords</Text>
			 </Col> 
           </Grid>			 
	  </ListItem> 
	  <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>Asymétrie</Text>
			  </Col>
              <Col>
					<Text style={styles.metaDataForm}>Bords</Text> 
			 </Col> 
           </Grid>			 
	  </ListItem>
 <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>Phototype </Text>
			  </Col>
              <Col>
					 <Text style={styles.metaDataForm}>Bords</Text>
			 </Col> 
           </Grid>			 
	  </ListItem> 
	   <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>SED </Text>
			  </Col>
              <Col>
					<Text style={styles.metaDataForm}>Bords</Text>
			 </Col> 
           </Grid>			 
	  </ListItem> 	  
	 <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>Diamètre</Text>
			  </Col>
              <Col>
					 <Text style={styles.metaDataForm}>Bords</Text> 
			 </Col> 
           </Grid>			 
	  </ListItem> 
	  	  <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>Epaisseur</Text>
			  </Col>
              <Col>
					<Text style={styles.metaDataForm}>Bords</Text>
			 </Col> 
           </Grid>			 
	  </ListItem>	 
	  <ListItem style={styles.list_MetaData}>   
	      <Grid>
              <Col>
					<Text style={styles.metaDataForm}>Suspicion</Text>
			  </Col>
              <Col>
					<Text style={styles.metaDataForm}>Bords</Text>
			 </Col> 
           </Grid>			 
	  </ListItem>	 
	
	  <Grid>
              <Col>
			     <Button transparent>
                         Modifier les informations
                 </Button> 
			  </Col>
			 <Col>	
				<Button
					style={{flex:9,backgroundColor: "#29235c",width:150,height:40,marginTop:10,alignItems:'center'}}
					textStyle={{fontSize: 17, color:'#fff',fontWeight:"bold"}}>Envoyer</Button>
			</Col>	
	 </Grid>			
     </CardItem>
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
  radioStyle: {
	/* borderRightWidth: 1,
    borderColor: '#2196f3',
    marginLeft: 50, */
  },
  radioButtonWrap: {
    marginRight: 30,
  },
 list_MetaData:{
	borderColor:'#29235c',
	height:65,
	marginBottom:0,
	marginTop:0
  },
  metaDataForm: {
   fontFamily: 'Roboto',
	fontSize:15,
	color:'#29235c',  
	margin:10
  },
  title_upload:{
	  color:"#fff",
	  fontSize:18,
	  paddingTop:10,
	  height:40,
      fontWeight:'bold'}
  });

AppRegistry.registerComponent('validMeta', () => validMeta);