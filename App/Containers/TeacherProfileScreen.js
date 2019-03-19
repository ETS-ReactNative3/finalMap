import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'
import firebase from 'firebase';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TeacherProfileScreenStyle'
import HomeScreen from './HomeScreen.js'

class TeacherProfileScreen extends Component {
  constructor()
  {
    super();
    this.state = {

  Name: '',
  PhoneNumber: '',
  SocailSecurityNumber: '',
  Address: '',

};
}

onSavePress= ()=>{
  const {Name, PhoneNumber, SocailSecurityNumber, Address } = this.state;
  const { currentUser } = firebase.auth();
    firebase.database().ref(`users/Teachers/${currentUser.uid}`).set(
      {
      Name: Name,
      Phone: PhoneNumber,
      SSN: SocailSecurityNumber,
      address: Address
    }
  ).then(()=>{
    this.props.navigation.navigate('HomeScreen');
  }).catch((error)=>{
    Alert.alert("something went weong !!"+error);
  });


}

  render () {

    let { Name, PhoneNumber, SocailSecurityNumber, Address} = this.state;
    return (
      <ScrollView>
<View style={styles.containerStyle}>
<View style={{justifyContent: 'center',alignItems: 'center'}}>
        <View style={styles.imageContainerStyle}>
        <Image
        style={styles.imageStyle}
        source={require('../Images/teacher.png')} />
        </View>
</View>
        <View>
<View style={styles.rowStyle}>
<Text style={styles.textStyle}>Name</Text>
<TextInput placeholder="Name" style={styles.inputStyle}
value={this.props.Name}
onChangeText={ (Name) => this.setState({ Name }) }
/>
</View>

<View style={styles.rowStyle}>
<Text style={styles.textStyle}>Phone Number</Text>
<TextInput placeholder="Phone Number" style={styles.inputStyle}
value={this.props.PhoneNumber}
onChangeText={ (PhoneNumber) => this.setState({ PhoneNumber }) }
/>
</View>

<View style={styles.rowStyle}>
<Text style={styles.textStyle}>SSN</Text>
<TextInput placeholder="Socail Security Number" style={styles.inputStyle}
value={this.props.SocailSecurityNumber}
onChangeText={ (SocailSecurityNumber) => this.setState({ SocailSecurityNumber }) } />
</View>

<View style={styles.rowStyle}>
<Text style={styles.textStyle}>Address</Text>
<TextInput placeholder="Address" style={styles.inputStyle}
value={this.props.Address}
onChangeText={ (Address) => this.setState({ Address }) } />
</View>
</View>

<RoundedButton styles={{borderRadius: 20}} onPress={this.onSavePress} >
 save
</RoundedButton>
</View>

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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfileScreen)
