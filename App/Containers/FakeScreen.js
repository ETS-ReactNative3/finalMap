import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/FakeScreenStyle'

class FakeScreen extends Component {
  render () {
    return (
      <Image
      style={{flex: 1}}
      source={require('../Images/Picture1.png')} />
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

export default connect(mapStateToProps, mapDispatchToProps)(FakeScreen)
