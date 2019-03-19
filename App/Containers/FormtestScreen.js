import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'

import {
  ActionsContainer,
  Button,
  FieldsContainer,
  Fieldset,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Switch
} from 'react-native-clean-form'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FormtestScreenStyle'

import { TextField } from 'react-native-material-textfield';

const countryOptions = [
  {label: 'Denmark', value: 'DK'},
  {label: 'Germany', value: 'DE'},
  {label: 'United State', value: 'US'}
]

class FormtestScreen extends Component {
  render () {
    return (
      <Form >
   <TextField
        label='Phone number'        
      />
	  <TextField
        label='Phone number'        
      />
	  <TextField
        label='Phone number'        
      />
	  <TextField
        label='Phone number'        
      />
	  <TextField
        label='Phone number'        
      />
    <ActionsContainer>
      <Button icon="md-checkmark" iconPlacement="right">Save</Button>
    </ActionsContainer>
  </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormtestScreen)
