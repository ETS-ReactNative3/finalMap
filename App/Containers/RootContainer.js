import React, { Component } from 'react'
import { View, StatusBar, Alert } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import firebase from 'firebase';
// Styles
import styles from './Styles/RootContainerStyles'

import PushNotification from "./PushNotification.js";

class RootContainer extends Component {
  componentDidMount () {
    this.props.startup()
  }

  componentWillMount () {


//
/*
fetch('http://bakabackend.000webhostapp.com/farNotif.php', {
  method: 'POST',
  headers: {
     'Accept' : 'application/json',
     'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key: 'test',
  })
})
*/


/*     .then((response) => response.json())
     .then((res)=>{
       Alert.alert(res.message);
       //Alert.alert("alert work");
     })
     .done();
     */
  }
  render () {
    return (
      <View style={styles.applicationView}>

        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
