import React from 'react'
import { View, Modal, Image, KeyboardAvoidingView, Keyboard, Dimensions  } from 'react-native'
import DebugConfig from '../../App/Config/DebugConfig'
import RoundedButton from '../../App/Components/RoundedButton'

import PresentationScreen from '../../ignite/DevScreens//PresentationScreen'

import TimerMixin from 'react-timer-mixin';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class DevscreensButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false

    }
  }

  toggleModal = () => {

    this.setState({ showModal: !this.state.showModal })
  }



    componentDidMount() {

      Keyboard.dismiss()
      setTimeout(() => this.toggleModal(), 3000)
      //  { this.toggleModal() }
    }

  render () {
    if (DebugConfig.showDevScreens) {
      return (

        <View >
        <Image
        style={{alignSelf: 'stretch', width: screenWidth, height: screenHeight   }}
        source={require('../Images/home.png')}
        resizeMode="contain"
        />

          <Modal
            visible={this.state.showModal}
            onRequestClose={this.toggleModal}>
            <PresentationScreen screenProps={{ toggle: this.toggleModal }} />
          </Modal>
        </View >

      )
    } else {
      return <View />
    }
  }
}
