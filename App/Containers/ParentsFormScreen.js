import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import { TextField } from 'react-native-material-textfield'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import * as Animatable from 'react-native-animatable'
// Styles
import styles from './Styles/ParentsFormScreenStyle'

class ParentsFormScreen extends Component {
  state = {
      ChildName: '',
      PhoneNumber: '',
      SocailSecurityNumber: '',
      Address: '',
      Job: ''
    };
    render() {
      let { ChildName, PhoneNumber, SocailSecurityNumber, Address, Job } = this.state;
      return (
        <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={styles.backbutton}>
            <Image source={Images.backButton} />
          </TouchableOpacity>
        <View style={styles.inputsContainer}>
        <TextField
          label='ChildName'
          value={ChildName}
          onChangeText={ (ChildName) => this.setState({ ChildName }) }
        />
        <TextField
          label='PhoneNumber'
          value={ PhoneNumber }
          onChangeText={ (PhoneNumber) => this.setState({ PhoneNumber }) }
        />
        <TextField
          label='SocailSecurityNumber'
          value={ SocailSecurityNumber }
          onChangeText={ (SocailSecurityNumber) => this.setState({ SocailSecurityNumber }) }
        />
        <TextField
          label='Address'
          value={Address}
          onChangeText={ (Address) => this.setState({ Address }) }
        />
        <TextField
          label='Job'
          value={Job}
          onChangeText={ (Job) => this.setState({ Job }) }
        />

        </View>
        <RoundedButton>
         Save
        </RoundedButton>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentsFormScreen)
