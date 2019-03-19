import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View,TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'
import LaunchScreen from './LaunchScreen'
import LoginFormScreen from './LoginFormScreen'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import firebase from 'firebase'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {
  render () {
    const { currentUser } = firebase.auth();
    console.tron.log(firebase.auth());
    return (

        <View style={styles.container}>

        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={ styles.backbutton }>

          <Image source={Images.backButton} />
        </TouchableOpacity>


        <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <View style={styles.imageContainerStyle}>
        <Image
        style={styles.imageStyle}
        source={require('../Images/logo.png')} />
        </View>
</View>


<View
style={{marginBottom: 150,
position: 'absolute',
top: 330,
left: 40,
width:280,
flex:1
}}>

        <RoundedButton  onPress={() => this.props.navigation.navigate('LoginFormScreen')}>
          Log  in
        </RoundedButton>
        <RoundedButton  onPress={() => this.props.navigation.navigate('SignupFormScreen')}>
          Sign UP
        </RoundedButton>
        </View>
       </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
