import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TouchableOpacity, Image, alert, Dimensions } from 'react-native'
import { Icon, Left, Body, Title, Right, Header, Content, Container, Button } from 'native-base'

import { connect } from 'react-redux'
import { TextField } from 'react-native-material-textfield'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'

import MapView from 'react-native-maps';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as Animatable from 'react-native-animatable'

import HomeScreen from './HomeScreen.js';

import firebase from 'firebase'
// Styles
import styles from './Styles/ParentScreenStyle'

import FakeScreen from './FakeScreen.js'


let { width, height } = Dimensions.get('window');




class ParentScreen extends Component  {

  constructor()
  {
    super();
    this.state = {
  region: {
    latitude: 32.22111,
    longitude: 35.25444,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  marker:{
    latitude: 32.22111,
    longitude: 35.25444,
  },
  flag: false,
  ChildName: '',
  PhoneNumber: '',
  SocailSecurityNumber: '',
  Address: '',
  Job: ''
};
}


componentDidMount() {
   navigator.geolocation.getCurrentPosition(
     position => {
       this.setState({
         region: {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421
         }
       });
     },
   (error) => console.log(error.message),
   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
   );
   this.watchID = navigator.geolocation.watchPosition(
     position => {
       this.setState({
         region: {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }
       });
     }
   );
 }
 componentWillUnmount() {
   navigator.geolocation.clearWatch(this.watchID);
 }



    onSavePress= ()=>{
      const {ChildName, PhoneNumber, SocailSecurityNumber, Address, Job, region } = this.state;
      const { currentUser } = firebase.auth();
        firebase.database().ref(`/users/Parents/${currentUser.uid}`).set(
          {
          Child: ChildName,
          Phone: PhoneNumber,
          SSN: SocailSecurityNumber,
          address: Address,
          Job: Job,
          Locat: region

        }
      ).then(()=>{
        this.props.navigation.navigate('FakeScreen');
      }).catch((error)=>{
        Alert.alert("something went weong !!");
      });


    }

    renderMap= ()=>{

      if(this.state.flag)
      return(
        <View style ={{height: 400,
      width: 290,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: 30,
      marginHorizontal: 10,
      marginVertical: 10,
      justifyContent: "center",
      alignItems: "stretch"
    }}>
        <MapView

          style={{    height: '100%', width: '100%'}}

            showsUserLocation={ true }
            region={ this.state.region }
            onRegionChange={ region => this.setState({region}) }
            onRegionChangeComplete={ region => this.setState({region}) }
          >
            <MapView.Marker
            draggable
              coordinate={ this.state.region }
            />
            <MapView.Circle

      center={this.state.region}
      radius={300}
      fillColor='rgba(255, 0, 0, 0.2)'
      strokeColor='rgba(0, 0, 0, 0.2)'
      />
</MapView>

</View>

      );

    }
    render() {
      let { ChildName, PhoneNumber, SocailSecurityNumber, Address, Job } = this.state;
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
        <ScrollView>

        <View style={styles.container}>

        <View style={styles.inputsContainer}>

        <TextField
          label='ChildName'
          value={this.props.ChildName}
          onChangeText={ (ChildName) => this.setState({ ChildName }) }
        />

        <TextField
          label='PhoneNumber'
          value={ this.props.PhoneNumber }
          onChangeText={ (PhoneNumber) => this.setState({ PhoneNumber }) }
        />

        <TextField
          label='SocailSecurityNumber'
          value={ this.props.SocailSecurityNumber }
          onChangeText={ (SocailSecurityNumber) => this.setState({ SocailSecurityNumber }) }
        />

        <TextField
          label='Address'
          value={this.props.Address}
          onChangeText={ (Address) => this.setState({ Address }) }
        />

        <TextField
          label='Job'
          value={this.props.Job}
          onChangeText={ (Job) => this.setState({ Job }) }
        />





{this.renderMap()}


</View>
        <RoundedButton onPress={this.onSavePress}>
         Save
        </RoundedButton>
        </View>
        </ScrollView>


        </Content>
        </Container>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentScreen)
