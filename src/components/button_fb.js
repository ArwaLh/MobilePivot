import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class button_fb extends Component {

  render(){
    return (
      <View>
        <Icon.Button name="facebook" backgroundColor="#3b5998" onPress={this.loginWithFacebook}>
			Login with Facebook
		 </Icon.Button>
      </View>
    );
  }
}

AppRegistry.registerComponent('button_fb', () => button_fb);