import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import DevscreensButton from '../../ignite/DevScreens/DevscreensButton.js'
import RoundedButton from '../../App/Components/RoundedButton'
import { Images } from '../Themes'
import MapView from 'react-native-maps'

// Styles
import styles from './Styles/LaunchScreenStyles'

import ParentFormScreen from './ParentFormScreen.js'

import ParentScreen from './ParentScreen.js';


import StoreLocator from '../../App/Components/StoreLocator.js'
import Test from '../../App/Components/Test.js'
import MapScreen from './MapScreen'

import RegisterScreen from './RegisterScreen'

import Map2Screen from './Map2Screen.js'


import OneSignal from 'react-native-onesignal';
import HomeScreen from './HomeScreen.js';

import Chat2Screen from './Chat2Screen.js'
import firebase from 'firebase'

import ImageUpload from '../Components/ImageUpload.js'

import ChildrenListScreen from './ChildrenListScreen'

const x=9;
export default class LaunchScreen extends Component {


  constructor(props) {
   super(props);
   this.state = {
       notiFlag: 10,
      }


  }

  componentWillMount() {
    this.state.notiFlag=x;
    const { currentUser } = firebase.auth();
    console.tron.log(this.state);
      OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
      if(x==5)
      {
        //this means that the app opened from the notification

        this.props.navigation.navigate('HomeScreen')
      }
  }
  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
  }
  onOpened(openResult) {

    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
        x=5;
  }

/*  componentDidMount() {
    if(this.state.notiFlag)
    alert("open");
  }
  */

  render () {
    return (

      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <Text style={styles.sectionText}>
              This probably isnt what your app is going to look like. Unless your designer handed you this screen and, in that case, congrats! You're ready to ship. For everyone else, this is where you'll see a live preview of your fully functioning app using Ignite.
              this is the state   {this.state.notiFlag}
            </Text>
          </View>

          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('MapScreen')}>
          Go to Map
          </RoundedButton>


          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('Chat2Screen')}>
          Chat2Screen
          </RoundedButton>





      <View style ={{height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }}>

      <ImageUpload />
      </View>

      <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('RegisterScreen')}>
          Go to Register
          </RoundedButton>
          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('ParentsFormScreen')}>
          Go to ParentsFormScreen
          </RoundedButton>
          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('HomeScreen')}>
          Go to homeshit
          </RoundedButton>
          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('ProfileScreen')}>
          Go to profilefuk
          </RoundedButton>
          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('TeacherProfileScreen')}>
          Go to Teacprofilefuk
          </RoundedButton>
          <DevscreensButton />


          <View style ={{height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>

          </View>



<RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('RegisterScreen')}>
          Go to Register
          </RoundedButton>


<RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('ParentScreen')}>
          Go to SS formscreen
          </RoundedButton>
          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('ParentFormScreen')}>
                    Go to formscreen
                    </RoundedButton>

          <DevscreensButton />

          <RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('Map2Screen')}>
                    Go to map2 routing test
                    </RoundedButton>

          <DevscreensButton />

		        <View style ={{height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }}>
        <Test />
      </View>
        </ScrollView>
      </View>
    )
  }
}
