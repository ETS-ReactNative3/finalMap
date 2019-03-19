import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image, TextInput, View, ActivityIndicator} from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import firebase from 'firebase';
// Styles
import styles from './Styles/SignupFormScreenStyle'
import LoginFormScreen from './LoginFormScreen'

import TeacherProfileScreen from './TeacherProfileScreen.js'
import ProfileScreen from './ProfileScreen.js'
import ParentScreen from './ParentScreen.js'
class SignupFormScreen extends Component {
  state = { email: '', password: '', secret_number:'', error: '', loading: false, ConfirmPassword: '' };

  onSignUpPress() {
    this.setState({ error: '', loading: true });
      const { email, password, ConfirmPassword, secret_number } = this.state;
      if(password === ConfirmPassword){
        
      firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => {
                      firebase.auth().signInWithEmailAndPassword(email, password)
                          .then(() => {
                            this.setState({ error: '', loading: false });
                            if(secret_number==="Parent123")
                            this.props.navigation.navigate('ParentScreen');
                            if(secret_number==="Bus123")
                            this.props.navigation.navigate('ProfileScreen');
                            if(secret_number==="Teacher123")
                            this.props.navigation.navigate('TeacherProfileScreen');

                           })
                          .catch(() => {
                             Alert.alert('wrong email or password')
                             this.setState({ error: 'error in auth wrong email or pass or connection loss ', loading: false });
                          });
                      })
                    .catch(() => {

                    });
                  }
      else {

        alert('password not match');
        this.setState({ error: '', loading: false });

      }
  }

  renderButtonOrSpinner() {
         if (this.state.loading) {
             return <ActivityIndicator size="large" color="#0000ff" />;
         }
         return (
           <RoundedButton onPress= {()=> this.onSignUpPress()} >
           signup
         </RoundedButton>
       );
     }
  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={styles.backbutton}>
            <Image source={Images.backButton} />
        </TouchableOpacity>

    <View style={{justifyContent: 'center',alignItems: 'center'}}>
        <View style={styles.imageContainerStyle}>
        <Image
        style={styles.imageStyle}
        source={require('../Images/logo1.webp')} />
        </View>
    </View>


        <View style={styles.inputsContainer}>

             <View style={styles.rowStyle}>
                      <TextInput
                       placeholderTextColor="#000000"
                       placeholder="Email"
                       style={styles.textInput}
                       value={this.state.email}
                      onChangeText={email => this.setState({ email })}
                       />
            </View>

             <View style={styles.rowStyle}>
                       <TextInput
                        placeholderTextColor="#000000"
                        placeholder="secret Key"
                        style={styles.textInput}
                        value={this.state.secret_number}
                       onChangeText={secret_number => this.setState({ secret_number })}
                        />
            </View>


             <View style={styles.rowStyle}>
                      <TextInput
                      style={styles.textInput}
                         placeholder="Password"
                         autoCorrect={false}
                         secureTextEntry
                         value={this.state.password}
                         onChangeText={password => this.setState({ password })}
                          />
            </View>

             <View style={styles.rowStyle}>
                      <TextInput
                      style={styles.textInput}
                       placeholder="Confirm Password"
                        autoCorrect={false}
                        secureTextEntry
                        value={this.state.ConfirmPassword}
                        onChangeText={ConfirmPassword => this.setState({ ConfirmPassword })}
                        />

            </View>

</View>

          <View style={styles.buttonsContainer}>

          {this.renderButtonOrSpinner()}

            </View>

            <View style={{marginBottom: 10,flexDirection: 'row'}}>
    <Text>Already have account,</Text>
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginFormScreen')}>
    <Text style={{color:'#000000',fontSize:14}}>Sign in</Text>
    </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupFormScreen)
