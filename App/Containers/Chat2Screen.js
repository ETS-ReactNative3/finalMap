
import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
View,
CameraRoll,
TouchableOpacity,
ScrollView,
Button,
Image
} from 'react-native';
import firebase from 'firebase'

export default class Chat2Screen extends Component {

  constructor(props)
  {
    super(props)
    this.state={
      photos: []
    }
  }

getSelectedImages = (selectedImages, currentImage) => {

  const image = currentImage.uri

  const Blob = RNFetchBlob.polyfill.Blob
  const fs = RNFetchBlob.fs
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob


  let uploadBlob = null
  const imageRef = firebase.storage().ref('posts').child("test.jpg")
  let mime = 'image/jpg'
  fs.readFile(image, 'base64')
    .then((data) => {
      return Blob.build(data, { type: `${mime};BASE64` })
  })
  .then((blob) => {
      uploadBlob = blob
      return imageRef.put(blob, { contentType: mime })
    })
    .then(() => {
      uploadBlob.close()
      return imageRef.getDownloadURL()
    })
    .then((url) => {
      // URL of the image uploaded on Firebase storage
      console.log(url);

    })
    .catch((error) => {
      console.log(error);

    })

}
_handleButtonPress = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });


     })
     .catch((err) => {
        //Error Loading Images
     });

        CameraRoll.saveToCameraRoll("file:///sdcard/img.png");
   };
render() {

console.tron.log(this.state)
  return (
    <View style={styles.gallery}>

    <Button title="Load Images" onPress={this._handleButtonPress} />
    <ScrollView>
      {this.state.photos.map((p, i) => {
      return (
        <Image
          key={i}
          style={{
            width: 300,
            height: 100,
          }}
          source={{ uri: p.node.image.uri }}
        />
      );
    })}
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
gallery: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
}
});
