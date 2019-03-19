import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TextInput, alert, Alert } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'
import RoundedButton from '../../App/Components/RoundedButton'
import firebase from 'firebase'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ProfileScreenStyle'
import HomeScreen from './HomeScreen.js';

const  finished = [];

const xname = "";
const xphone = "";
const xssn = "";
const xAddress = "";

class ProfileScreen extends Component {
  constructor()
  {
    super();
    this.state = {

  Name: 'baka',
  PhoneNumber: '',
  SocailSecurityNumber: '',
  Address: '',
  SaveOrUpdate: "save"

};
}

onSavePress= ()=>{
  const {Name, PhoneNumber, SocailSecurityNumber, Address } = this.state;
  const { currentUser } = firebase.auth();
  if(this.state.SaveOrUpdate==="save")
  {
    firebase.database().ref(`users/Drivers/${currentUser.uid}`).set(
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
}//if save
if(this.state.SaveOrUpdate==="update")
{
  firebase.database().ref(`users/Drivers/${currentUser.uid}`).update(
    {
    Name: Name,
    Phone: PhoneNumber,
    SSN: SocailSecurityNumber,
    address: Address
  }
).then(()=>{
  Alert.alert("data has been update")
   this.props.navigation.goBack(null);
}).catch((error)=>{
  Alert.alert(""+error+"error");
});
}


}

componentWillMount(){


  const {state} = this.props.navigation;
  var TAG = state.params ? state.params.Tag : "<undefined>";

if(TAG==="driver")
{ this.state.SaveOrUpdate = "update"
   const {Name, PhoneNumber, SocailSecurityNumber, Address } = this.state;
   const { currentUser } = firebase.auth();
   let q =  firebase.database().ref(`/users/Drivers/${currentUser.uid}`);

   q.once('value', snapshot => {
     snapshot.forEach(function(data) {
       let result = data.val();
       finished.push(result);
     })

     this.state.Name= finished[0];
     this.state.PhoneNumber = finished[1];
     this.state.SocailSecurityNumber = finished[2]
     this.state.Address = finished[3];
   }).then(function(){
     /*this.setState({
       Name: finished[1],
       PhoneNumber: finished[2],
       SocailSecurityNumber: finished[3],
       Address: finished[4]

     })*/
     xname= finished[0];
     xphone = finished[1];
     xssn = finished[2]
     xAddress = finished[3];
     Alert.alert("address="+xname+",وstate name =")


   }).catch((error)=>{
     Alert.alert("err!!"+error);
   });

Alert.alert("address="+xAddress+",وstate name ="+this.state.Name)
}





}

componentDidMount() {
  this.state.Name= xname;
  this.state.PhoneNumber = xphone;
  this.state.SocailSecurityNumber = xssn;
  this.state.Address = xAddress;
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
        source={require('../Images/busDriver.png')} />
        </View>
</View>
        <View>
<View style={styles.rowStyle}>
<Text style={styles.textStyle}>Name</Text>
<TextInput placeholder="Name" style={styles.inputStyle}
value={this.state.Name}
onChangeText={ (Name) => this.setState({ Name }) }
/>
</View>

<View style={styles.rowStyle}>
<Text style={styles.textStyle}>Phone Number</Text>
<TextInput placeholder="Phone Number" style={styles.inputStyle}
value={this.state.PhoneNumber}
onChangeText={ (PhoneNumber) => this.setState({ PhoneNumber }) }
/>
</View>

<View style={styles.rowStyle}>
<Text style={styles.textStyle}>SSN</Text>
<TextInput placeholder="Socail Security Number" style={styles.inputStyle}
value={this.state.SocailSecurityNumber}
onChangeText={ (SocailSecurityNumber) => this.setState({ SocailSecurityNumber }) } />
</View>

<View style={styles.rowStyle}>
<Text style={styles.textStyle}>Address</Text>
<TextInput placeholder="Address" style={styles.inputStyle}
value={this.state.Address}
onChangeText={ (Address) => this.setState({ Address }) } />
</View>
</View>

<RoundedButton styles={{borderRadius: 20}} onPress={this.onSavePress} >
 {this.state.SaveOrUpdate}
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
