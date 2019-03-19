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


// Styles
//import styles from './Styles/TeacherScreenStyle'
import styles from './Styles/HomeScreenStyle'

import ChatScreen from './ChatScreen';

class TeacherScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
      <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
        <Image source={Images.backButton} />
      </TouchableOpacity>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.igniteClear} style={styles.logo} />
          </View>
          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('Teachers')} style={styles.componentButton} image={Images.components} text='Teachers' />
            <ButtonBox onPress={() => this.props.navigation.navigate('Buses')} style={styles.usageButton} image={Images.usageExamples} text='MAP' />
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('ChatScreen', { name: "any parent", key: "eqtbq00XWjU2CiNKzNY8XzWdTyr1"})} style={styles.apiButton} image={Images.api}image={Images.faq} text='Communication center' />
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherScreen)
