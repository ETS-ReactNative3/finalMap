import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'
import firebase from 'firebase';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TeacherinfoScreenStyle'
import HomeScreen from './HomeScreen.js'
import ChatScreen from './ChatScreen.js'
import Chat2Screen from './Chat2Screen.js'

import TestingChatScreen from './TestingChatScreen.js'
const  finished = [];
class TeacherinfoScreen extends Component {
  constructor()
  {
    super();
    this.state = {

  Name: 'baka',
  PhoneNumber: '1234',
  SocailSecurityNumber: '454532425',
  Address: 'baka',
  key: ''

};
}


componentWillMount(){


  const {state} = this.props.navigation;
  var key = state.params ? state.params.key : "<undefined>";

    this.state.key = key;
   const {Name, PhoneNumber, SocailSecurityNumber, Address } = this.state;
   const { currentUser } = firebase.auth();
   let q =  firebase.database().ref(`/users/Teachers/${key}`);

   q.once('value', snapshot => {
     snapshot.forEach(function(data) {
       let result = data.val();
       finished.push(result);
     })
   }).then(function(){
     that.setState({
       Name: finished[0],
       PhoneNumber: finished[1],
       SocailSecurityNumber: finished[2],
       Address: finished[3],

     })
   }).catch((error)=>{
     Alert.alert("something went weong !!"+error);
   });

this.state.Name= finished[0];
this.state.PhoneNumber = finished[1];
this.state.SocailSecurityNumber = finished[2]
this.state.Address = finished[3];
//alert("key="+finished[3]+",state name ="+this.state.Name)
}




  render () {


    let { Name, PhoneNumber, SocailSecurityNumber, Address} = this.state;
     var imData = 'https://bakabackend.000webhostapp.com/teachers/'+this.state.key+'.png'
    return (
<View style={styles.containerStyle}>
<TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
  <Image source={Images.backButton} />
</TouchableOpacity>
<View style={{justifyContent: 'center',alignItems: 'center'}}>
        <View style={styles.imageContainerStyle}>
        <Image
        style={styles.imageStyle}
        source={{uri: imData}} />
        </View>
</View>
        <View>
        <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Name:</Text>
        <Text style={styles.inputStyle}> {this.state.Name}</Text>
        </View>

        <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>Phone number:</Text>
        <Text style={styles.inputStyle}> {this.state.PhoneNumber}</Text>
        </View>

        <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>SSN:</Text>
        <Text style={styles.inputStyle}> {this.state.SocailSecurityNumber}</Text>
        </View>

        <View style={styles.rowStyle}>
        <Text style={styles.textStyle}>address:</Text>
        <Text style={styles.inputStyle}> {this.state.Address}</Text>
        </View>
</View>
<RoundedButton styles={{borderRadius: 20}} onPress={() => this.props.navigation.navigate('ChatScreen' ,
{ name: this.state.Name, key: this.state.key  })}>
   Chat
</RoundedButton>

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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherinfoScreen)
