import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Teachers from './Teachers'
import Buses from './Buses'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
import ButtonBox from '../../ignite/DevScreens//ButtonBox'
import { StackNavigator } from 'react-navigation'

import MapScreen from './MapScreen'

import ProfileScreen from './ProfileScreen.js';

// Styles
//import styles from './Styles/DriverScreenStyle'
import styles from './Styles/HomeScreenStyle'

import ChildrenListScreen from './ChildrenListScreen.js'

class DriverScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
      <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
        <Image source={Images.backButton} />
      </TouchableOpacity>
        <ScrollView style={styles.container}>

          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('ProfileScreen', { Tag: "driver" })} style={styles.componentButton} image={Images.components} text='Profile' />
            <ButtonBox onPress={() => this.props.navigation.navigate('MapScreen')} style={styles.usageButton} image={Images.usageExamples} text='MAP' />
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('ChildrenListScreen')} style={styles.apiButton} image={Images.api}image={Images.faq} text='Communication center' />
            <ButtonBox onPress={() => this.props.navigation.navigate('RegisterScreen')} image={Images.theme} text='buses' />
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.deviceButton} image={Images.deviceInfo} text='school Info' />
            <ButtonBox onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.usageButton} image={Images.api} text='FAQ' />
          </View>
        </ScrollView>
        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Made with ❤️ by Evil Empire</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverScreen)
