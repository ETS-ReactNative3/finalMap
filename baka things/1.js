import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, Image, CameraRoll } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'



// Styles
import styles from './Styles/Chat2ScreenStyle'

import ImageUpload from '../Components/ImageUpload.js'

import CameraRollPicker from 'react-native-camera-roll-picker'
import AllMessagesScreen from './AllMessagesScreen.js'

import { Icon, Left, Body, Title, Right, Header, Content, Container, Button } from 'native-base'




class Chat2Screen extends Component {


  constructor(props){
    super(props);

    this.state={
       key: "baka",
       name: "baka",
       photos: [],


    }
  }
  componentWillMount(){


    const {state} = this.props.navigation;
    var xkey = state.params ? state.params.key : "baka";
    var xname = state.params ? state.params.name : "baka";

    this.setState({
      key: xkey,
      name: xname
    })
}


  getSelectedImages(image) {
      if(image[0])
         alert(image[0].uri)
       console.tron.log(image)
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => this.setState({ photos: r.edges }))
  }


  _handleButtonPress = () => {
   CameraRoll.getPhotos({
       first: 1,
       assetType: 'Photos',

     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };

  render () {
    //<Image source={'content://media/external/images/media/195'} />
    //<AllMessagesScreen key={ this.state.key} />
    console.tron.log(this.state)
    return (

      <Container>
            <Header style={{justifyContent:'center',alignItems:'center'}}>
             <Left>
               <Button transparent>
                  <Icon name='menu' onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
                </Button>
             </Left>


             <Body>
               <Title>Register</Title>
             </Body>

             <Right>
               <Button transparent>
                 <Icon name='more' onPress={()=>this.props.navigation.goBack(null)}/>
               </Button>
             </Right>

            </Header>
            <Content>

        <View>
        <Button
          title='View Photos'
          onPress={() => {  this.getPhotos() }}
        />

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
        </Content>
        </Container>


    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat2Screen)
