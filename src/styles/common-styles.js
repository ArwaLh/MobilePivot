import React, {
  StyleSheet,
  Dimensions
} from 'react-native';
const window = Dimensions.get('window');
let height_im= window.height-150;
let mar_left=(window.width-170)/2;
module.exports = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: '#53507c'
  },
  body_login: {
    flex: 9,
    alignItems: 'center',
	marginTop: 220
  }, 
  body: {
    flex: 9,
    alignItems: 'center',
	marginTop: 40
  },
  body2: {
    flex: 9,
    alignItems: 'center',
	marginTop: 80,
	marginLeft:50,
	marginRight:20,
  },
  body_recherche_patient: {
    flex: 9,
    alignItems: 'center',
	marginTop: 40,
	marginLeft:30,
	marginRight:20,
  },
  textinput: {
    height: 40,
	width: 350,
	marginTop: 0,
	color: "#000",
  }, 
  textinput_email: {
    height: 50,
	width: 270,
	marginTop: 10,
	marginBottom: 10,
	color: "#fff",
	fontFamily: 'Roboto',
	fontSize: 18,
  },
  textinput_mdp: {
    height: 50,
	width: 270,
	marginTop: 10,
	marginBottom: 10,
	marginLeft: 30,
	color: "#fff",
	fontFamily: 'Roboto',
	fontSize: 18,
  },
  textinput_new_patinet: {
    height: 40,
	width: 200,
	color: "#29235c",
	fontFamily: 'Roboto',
	fontSize: 18,
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#fff',
    fontSize: 16
  },
  
  /* Signup interface */
  
  text_signup_terms: {
    height: 100,
	width: 300,
	marginTop: 30,
	marginBottom: 10,
	color: "#fff",
	fontFamily: 'Roboto',
	fontSize: 12,
	fontWeight: 'normal',
	textAlign: 'center'
  },
   primary_button_signup: {
	borderColor: "#fff",
	width:170,
	marginLeft:mar_left,
	marginTop:25,
  },
  /* end signup */
  primary_button: {
	width: 250,
	height: 40,
    margin: 10,
	marginTop: 15,
	marginLeft: 55,
    padding: 15,
    backgroundColor: '#29235c',
  },
  primary_button_naevus: {
	width: 250,
	height: 40,
    margin: 10,
	marginTop: 15,
	marginLeft: 55,
    backgroundColor: '#29235c',
  },
    primary_button_ajout_patient: {
	width: 250,
	height: 40,
    margin: 10,
	marginTop: 25,
	marginBottom: 15,
	marginLeft: 43,
    padding: 15,
    backgroundColor: '#29235c',
  },
   primary_button_text_ajout_patient: {
    color: '#ffffff',
    fontSize: 13,
	textAlign: "center",
  },
  primary_button_oui: {
	width: 80,
	height: 40,
    margin: 10,
	marginTop: 15,
    padding: 15,
    backgroundColor: '#29235c',
  },
  primary_button_non: {
	width: 80,
	height: 40,
    margin: 10,
	marginTop: 15,
	marginLeft: 55,
    padding: 15,
    backgroundColor: '#29235c',
  },
  primary_button_text: {
    color: '#ffffff',
    fontSize: 13,
	fontWeight: "bold",
	textAlign: "center",
  },
  image: {
	top:0,
	bottom:0,
	left:0,
	right:0,
	resizeMode:'stretch',
	backgroundColor: 'white',
	width: window.width,
	height: window.height-95,
  },
  image_splash: {
	top:0,
	bottom:0,
	width: window.width,
	height: window.height-20,
  },
  /*models*/
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
   modal3: {
    height: 190,
    width: 270,
	margin:10,
  },
  btn: {
    margin: 10,
	marginTop:20,
    backgroundColor: "#29235c",
    padding: 10
  },
  modal_title: {
	  color: '#29235c',
	  margin:10,
	  fontFamily: 'Roboto',
	  fontSize: 17,
	  fontWeight: 'bold'
  },
  modal_text: {
	  color: '#29235c',
	  margin:10,
	  fontFamily: 'Roboto',
	  fontSize: 25,
	  fontWeight: 'normal'
  },
  /*recherhce patient autocomplete*/
  autocomplete: {
    backgroundColor: 'transparent',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
	backgroundColor: 'transparent',
    marginLeft: 30,
    marginTop: 50,
    marginRight: 0,
	width:270
  },
  autocompleteInput: {
	borderColor: 'transparent',
	backgroundColor: 'transparent'
  },
    itemText: {
    fontSize: 15,
	color: 'black'
  },
  itemText_phone: {
    fontSize: 13,
    margin: 2,
	color: '#939393'
  },
  firstContainer: {
    backgroundColor: '#F5FCFF',
    flex: 1
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 8
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  },
  /*gestion naevus*/
  listViewText1:{
	color: '#29235c',
	fontFamily:'Roboto',
	fontWeight: 'bold',
	fontSize:14
  },
  listViewText2:{
	color: '#a8a8a8',
	fontFamily:'Roboto',
	fontWeight: 'bold',
	fontSize:14
  },
  icon_folder:{
	color: '#29235c',
	fontSize: 50,
	width:55,
	marginLeft: (window.width/2)-140,
	marginTop:145
  },
  /*valid Meta*/
  component: {
   marginBottom: 15,
   marginLeft: 20,
  },
  radioButtonWrap: {
    marginRight: 30,
  },
 list_MetaData:{
	borderColor:'#29235c',
	height:57,
	width:330,
	marginBottom:0,
	marginTop:0
  },
  metaDataForm: {
   fontFamily: 'Roboto',
	fontSize:16,
	color:'#29235c',  
	margin:10
  },
  metaDataForm2: {
   fontFamily: 'Roboto',
	fontSize:16,
	color:'#29235c',  
	margin:10
  },
  metaDataForm3: {
   fontFamily: 'Roboto',
	fontSize:16,
	color:'#29235c',  
	margin:10
  },
  mélanomeF: {
	fontFamily: 'Roboto',
	fontSize:16,
	color:'#29235c',  
	margin:10  
  },  
  phototypeF: {
	fontFamily: 'Roboto',
	fontSize:16,
	color:'#29235c',  
	margin:10  
  },
  title_upload:{
	color:"#fff",
	fontSize:18,
	paddingTop:10,
	height:40,
    fontWeight:'bold'
  },
  send_button_valid_meta:{
	flex:9,
	backgroundColor: "#29235c",
	width:130,
	height:37,
	marginTop:8,
	alignItems:'center'
  },
  back_to_upload_button_valid_meta:{
	fontFamily: 'Roboto',
	fontSize:13,
	color: this.state.textColor2,
	marginTop:10
  }
});