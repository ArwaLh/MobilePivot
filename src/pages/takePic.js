import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
  ScrollView,
  AsyncStorage,
  Platform
} from 'react-native';
import UploadForm from './uploadForm';

import Camera from 'react-native-camera';
import RNFetchBlob from 'react-native-fetch-blob';
import * as firebase from 'firebase';
const fs = RNFetchBlob.fs
const Blob = RNFetchBlob.polyfill.Blob

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const dirs = RNFetchBlob.fs.dirs
const prefix = ((Platform.OS === 'android') ? 'file:' : '')
const testImageName = `patient-pic-${Platform.OS}-${new Date()}.jpg`
const testFile = null;

const EMAIL = 'arwa.louihig@esprit.tn'
const PASSWORD = 'arwa24961322'

export default class takePic extends Component {
	 constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.CameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.auto,
        flashMode: Camera.constants.FlashMode.auto,
		torchMode: 'off',
		cameraType: 'back',
      },
      isRecording: false
    };

    this.takePicture = this.takePicture.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
  }
/*   takePicture() {
  this.camera.capture()
    .then(({path}) => {
		// prepare upload image
		firebase.auth()
          .signInWithEmailAndPassword(EMAIL, PASSWORD)
          .catch((err) => {
            console.log('firebase sigin failed', err)
          })

		firebase.auth().onAuthStateChanged((user) => {
			<Text>{JSON.stringify(user)}</Text>
		})
		let rnfbURI = RNFetchBlob.wrap(path)
		// create Blob from file path
		Blob
			.build(rnfbURI, { type : 'image/jpg;'})
			.then((blob) => {
			  // upload image using Firebase SDK
			  var uploadTask= firebase.storage()
				.ref('images')
				.child(testImageName)
				.put(blob, { contentType : 'image/jpg' });
				uploadTask.on('state_changed', function(snapshot){
				  // Observe state change events such as progress, pause, and resume
				  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					let progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					alert("progress");
					alert(progress);
				}, function(error) {
				  alert("error iuploading");
				}, function() {
				  // Handle successful uploads on complete
				  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
				  var downloadURL = uploadTask.snapshot.downloadURL;
				  alert("done uploading here is the download URL",downloadURL);
				  blob.close()
				});
			}) 
    })
  } */
   takePicture() {
  this.camera.capture()
    .then(({path}) => {
		// create Blob from file path
		AsyncStorage.setItem('path', JSON.stringify(path));
		this.props.navigator.push({
		component: UploadForm
		}); 
    })
  } 
/*   takePicture(){
	  this.camera.capture()
    .then(({path}) => {
	  // prepare upload image
		firebase.auth()
          .signInWithEmailAndPassword(EMAIL, PASSWORD)
          .catch((err) => {
            console.log('firebase sigin failed', err)
          })

		firebase.auth().onAuthStateChanged((user) => {
			<Text>{JSON.stringify(user)}</Text>
		})
		let rnfbURI = RNFetchBlob.wrap(path)
		// create Blob from file path
		Blob
			.build(rnfbURI, { type : 'image/jpg;'})
			.then((blob) => {
			  // upload image using Firebase SDK
			  var uploadTask= firebase.storage()
				.ref('images')
				.child(testImageName)
				.put(blob, { contentType : 'image/jpg' });
				uploadTask.on('state_changed', function(snapshot){
				  // Observe state change events such as progress, pause, and resume
				  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
					let progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					alert("progress");
					alert(progress);
				}, function(error) {
				  alert("error iuploading");
				}, function() {
				  // Handle successful uploads on complete
				  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
				  var downloadURL = uploadTask.snapshot.downloadURL;
				  alert("done uploading here is the download URL",downloadURL);
				  blob.close()
				});
			}) 
	})
  } */
  startRecording() {
    if (this.camera) {
      this.camera.capture({mode: Camera.constants.CaptureMode.video})
          .then((data) => console.log(data))
          .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }

  stopRecording() {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
    }
  }

  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('./assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('./assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.flashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.flashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        flashMode: newFlashMode,
      },
    });
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.flashMode === auto) {
      icon = require('./assets/ic_flash_auto_white.png');
    } else if (this.state.camera.flashMode === on) {
      icon = require('./assets/ic_flash_on_white.png');
    } else if (this.state.camera.flashMode === off) {
      icon = require('./assets/ic_flash_off_white.png');
    }

    return icon;
  }
  barcodeReceived(e) {
    console.log('Barcode: ' + e.data);
    console.log('Type: ' + e.type);
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated
          hidden
        />
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.flashMode}
          defaultTouchToFocus
          mirrorImage={false}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.switchType}
          >
            <Image
              source={this.typeIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flashButton}
            onPress={this.switchFlash}
          >
            <Image
              source={this.flashIcon}
            />
          </TouchableOpacity>
        </View>
		 <View style={[styles.overlay, styles.middleOverlay]}>
				<Image
                  source={require('./assets/trans2.png')}
				/>
		</View>
        <View style={[styles.overlay, styles.bottomOverlay]}>

            <TouchableOpacity
                style={styles.captureButton}
                onPress={this.takePicture}
            >
				<Image
                  source={require('./assets/ic_photo_camera_36pt.png')}
				/>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  middleOverlay: {
    paddingTop: 200,
	paddingLeft: 20,
	top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});

AppRegistry.registerComponent('takePic', () => takePic);




