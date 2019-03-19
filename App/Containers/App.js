import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import ReduxNavigation from '../Navigation/ReduxNavigation'

import 'firebase/firestore';


import firebase from 'firebase'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid
} from 'react-native';

import PushNotification from 'react-native-push-notification';

import OneSignal from 'react-native-onesignal';
import HomeScreen from './HomeScreen.js';


//import PushNotification from "./PushNotification.js";
// create our store
const store = createStore();

/*
PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
      //alert(token.token)
    },

    onNotification: function(notification) {
      setTimeout(() => {
        if(!notification['foreground']){
          ToastAndroid.show("You've clicked!", ToastAndroid.SHORT);
        }
      }, 1);
      PushNotification.localNotificationSchedule({
        title: 'Notification with my name',
        message: notification['name'], // (required)
        date: new Date(Date.now()) // in 60 secs
      });
    },

*/
    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)

/*    senderID: "45717063257",
    permissions: {
    alert: true,
    badge: true,
    sound: true
},
*/
// Should the initial notification be popped automatically
// default: true
//popInitialNotification: true,

/**
  * (optional) default: true
  * - Specified if permissions (ios) and token (android and ios) will requested or not,
  * - if not, you must call PushNotificationsHandler.requestPermissions() later
  */
//requestPermissions: true,

//});



/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
/*
 import {
   alert,
  Platform,
  StyleSheet,
  View,
  Text
} from 'react-native'
import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm'
*/

/* FCM.on(FCMEvent.Notification, async (notif) => {
if(notif.local_notification){
    //this is a local notification
}
if(notif.opened_from_tray){
  //  console.log('opened from tryay');
}

if(Platform.os === 'ios')
{
  //
  //
  //
  switch (notif._notificationType) {
    case NotificationType.Remote:
    notif.finish(RemoteNotificationResult.NewData)
      break;
    case NotificationType.NotificationResponse:
    notif.finish();
      break;
    case NotificationType.WillPresent:
      notif.finish(WillPresentNotificationResult.All)
      break;

  }
}
});

FCM.on(FCMEvent.RefreshToken, (token)=> {
  alert(token);
});

const instructions = Platform.select({
  ios: 'press cmd +r',
  android: 'double tap R'
});
*/


class App extends Component {

  componentWillMount() {

      firebase.initializeApp({
          apiKey: 'AIzaSyD_Q58q9PaQwD4rf1JcLTn61RDuaGSQ-J4',
          authDomain: 'finalmap-1520780119975.firebaseapp.com',
          databaseURL: 'https://finalmap-1520780119975.firebaseio.com',
          projectId: 'finalmap-1520780119975',
          storageBucket: '',
          messagingSenderId: '45717063257'
      });
}
/*
      OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
      OneSignal.removeEventListener('received', this.onReceived);
      OneSignal.removeEventListener('opened', this.onOpened);
      OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
      console.log("Notification received: ", notification);
  }

  onOpened(openResult) {

    //this.props.navigation.navigate('HomeScreen');

    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);

  }

  onIds(device) {
  console.log('Device info: ', device);
  }



/*  componentDidMount() {
    //
    //
    FCM.requestPermissions().then(()=> Alert('granted')).catch(()=> alert('not Granted'));


FCM.getFCMToken().then(token => { alert(token); });

  this.notificationListener = FCM.on(FCMEvent.Notification, async(notif)=>{

  });

  FCM.getInitialNotification().then(notif=>{
    allert(notif)
  });

}
*/

  render () {
    return (
      <Provider store={store}>

        <RootContainer />
      </Provider>
    )
  }
}

//export default !firebase.apps.length
  //? firebase.initializeApp(config).firestore()
  //: firebase.app().firestore();

//
export default DebugConfig.useReactotron
? console.tron.overlay(App)
: App
