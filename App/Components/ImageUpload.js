import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  alert
} from 'react-native';
import firebase from 'firebase'
//import RNFetchBlob from 'react-native-fetch-blob'
//import ImagePicker from 'react-native-image-picker'

import RoundedButton from '../../App/Components/RoundedButton'

//import Camera from 'react-native-camera';


//import PhotoUpload from 'react-native-photo-upload'




const options = {
  title: 'Select photo',
  takePhotoButtonTitle: 'take Photo',
  chooseFromLibraryButtonTitle: 'chooseFromLibraryButtonTitle',
  quality: 1
};

export default class ImageUpload extends Component {
  constructor(props) {
   super(props)
   this.state = {
     loading: false,
     dp: null,
     imageSource: null
    }
  }



  render() {

    return (
      <View style={styles.container}>

<Text> fuck the world </Text>
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
