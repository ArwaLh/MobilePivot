import React, {
  StyleSheet,
  Dimensions
} from 'react-native';
const window = Dimensions.get('window');
let height_im= window.height-150;
module.exports = StyleSheet.create({
  container: {
    flex: 1,
	backgroundColor: '#fff'
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
	marginLeft:10,
	marginRight:10,
  },
  textinput: {
    height: 40,
	width: 250,
	marginTop: 0,
	margin: 10,
	color: "#000"
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#53507c',
    fontSize: 16
  },
  primary_button: {
	width: 250,
	height: 40,
    margin: 10,
	marginTop: 15,
	marginLeft: 55,
    padding: 15,
    backgroundColor: '#29235c',
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
	width: window.width,
	height: height_im,
	resizeMode: 'stretch',
	flex: 1
  }
});