import React, { Component } from 'react'
import {
   ScrollView, Text,
   KeyboardAvoidingView,
    TouchableOpacity,
    Image, TextInput,
    View, Alert,
     ActivityIndicator
   }
  from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'
import TimerMixin from 'react-timer-mixin';

import firebase from 'firebase';

import OneSignal from 'react-native-onesignal';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'


//import MainAppScreen from './MainAppScreen.js'
import HomeScreen from './HomeScreen.js'
import MapScreen from './MapScreen.js'
import TeacherScreen from './TeacherScreen'
import DriverScreen from './DriverScreen'

// Styles
import styles from './Styles/LoginFormScreenStyle'



class LoginFormScreen extends Component {


  state = { email: '', password: '', error: '', loading: false, usertype: 0 };

  onLoginPress() {

      this.setState({ error: '', loading: true });
      var parentExist = false;
      var driverExist;
      var teacherExist;

      const { email, password } = this.state;
      firebase.auth().signInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ error: '', loading: false });


            const { currentUser } = firebase.auth();
            let parentref =  firebase.database().ref(`/users/Parents/${currentUser.uid}`);

            parentref.once('value', function(snapshot) {
               parentExist = (snapshot.val() !== null);
           }).then(
             ()=>{              if(parentExist){

                                          this.setState({usertype: 1})
                                  // OneSignal.sendTags({"key" : currentUser.uid, "name" : name});
                                   OneSignal.sendTags({"key" : currentUser.uid});
                            alert("welcom PArent"+currentUser.uid)
                           this.props.navigation.navigate('HomeScreen');
                         }

}
           );;


              let DriverRef =  firebase.database().ref(`/users/Drivers/${currentUser.uid}`);

              DriverRef.once('value', function(snapshot) {
                 driverExist = (snapshot.val() !== null);


            }).then(
              ()=>{              if(driverExist && this.state.usertype===0){
                               alert("welcom Driver"+currentUser.uid)
                            this.props.navigation.navigate('DriverScreen');
                          }

}
            );


            let TeacherRef =  firebase.database().ref(`/users/Teachers/${currentUser.uid}`);

            TeacherRef.once('value', function(snapshot) {
               teacherExist = (snapshot.val() !== null);

          }).then(
            ()=>{              if(teacherExist && this.state.usertype===0){
                                alert("welcom teacher")
                          this.props.navigation.navigate('TeacherScreen');
                        }

}
          );



           })
          .catch(() => {
             Alert.alert('wrong email or password')
             this.setState({ error: 'error in auth wrong email or pass ', loading: false });
          });

          if(parentExist)
          this.props.navigation.navigate('HomeScreen');
  }

  renderButtonOrSpinner() {
         if (this.state.loading) {
             return <ActivityIndicator size="large" color="#0000ff" />;
         }
         return (
           <RoundedButton onPress= {()=> this.onLoginPress()}>
             login
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
              placeholder="User Nickname"
               style={styles.textInput}
               value={this.state.email}
                onChangeText={email => this.setState({ email })}
            />
        </View>

        <View style={styles.rowStyle}>
            <TextInput
             placeholder="Password"
              style={styles.textInput}
              autoCorrect={false}
              secureTextEntry
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              />
        </View>

        <Text style={styles.textStyle}>Forgot your Password?</Text>

    </View>

          <View style={styles.buttonsContainer}>

            {this.renderButtonOrSpinner()}

         </View>
         <Text style={{bottom:107}}>Dont have an account yet?</Text>
         <Text style={{bottom:97, color: 'black'}}>Sign up!</Text>

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginFormScreen)
