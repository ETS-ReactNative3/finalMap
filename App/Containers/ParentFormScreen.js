import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Alert } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'
import API from '../Services/Api'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ParentFormScreenStyle'

import { TextField } from 'react-native-material-textfield';

class ParentFormScreen extends Component {
	constructor(props){
		super(props)
	}
	 state = {
		 	FirstName: '',
	 		LastNAme: '',
      SocialSecuretyNumber: '',
			PhoneNumber: '',
			Adress:'',
      ChildName: '',
			Age: ''
	};


   onSubmitPress = () => {
		 const api = API.create();
		 const dummyData = api.getTest();
	   console.log('pressed on submit', dummyData);

	 }

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <TextField
           label='First Name'
          />

		  <TextField
           label='Last Name'
          />

		  <TextField
           label='SSN'
          />

		  <TextField
           label='Phone number'
          />

		  <TextField
           label='Adress'
          />
		  <TextField
           label='child Name'
          />

		  <TextField
           label='Age'
          />

		 <RoundedButton styles={{borderRadius: 60, flex: 1}} onPress= {()=> this.onSubmitPress()}>
             Submit
          </RoundedButton>
        </KeyboardAvoidingView>
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentFormScreen)
