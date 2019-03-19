import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView,View } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps';
import firebase from 'firebase';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import RoundedButton from '../../App/Components/RoundedButton'
// Styles
import styles from './Styles/ParentmapScreenStyle'
const  finished = [];
const  items = [];


class ParentmapScreen extends Component {

  constructor()
  {
    super();
    this.state = {
  region: {
    latitude: 32.22111,
    longitude: 35.25444,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  busLocation: {
    latitude: 32.22111,
    longitude: 35.25444,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421

  },
  KEY: 1253,
  DbVal:[]

}
}

/*
componentWillMount() {

  const { currentUser } = firebase.auth();


  let q =  firebase.database().ref(`/users/Parents/${currentUser.uid}`);
  q.once('value', snapshot => {
    snapshot.forEach( (data)=>{
      let result = data.val();
      items.push(result);
      this.state.DbVal.push(result);
    });
    //alert("items"+items[1])
    this.state.KEY = items[1];
    //alert("inside="+this.state.DbVal[1])

  });

  let q =  firebase.database().ref(`/users/Drivers`);

  q.once('value', snapshot => {
    snapshot.forEach(function(data) {
      let result = data.val();
      finished.push(result);
          })
  }).then(function(){
    that.setState({
        busLocation : finished
    })
  }).catch((error)=>{
    Alert.alert("something went weong !!"+error);
  });


//alert("key="+this.state.DbVal[1])


  let DriverRef =  firebase.database().ref(`/users/Drivers/${items[0].key}`);

  DriverRef.on('value', snapshot => {
    snapshot.forEach(function(data) {
      let result = data.val();
      finished.push(result);
    })
  });

  alert("finished="+ finished[0]);

  alert("finished"+finished.length)
}

*/
componentWillMount() {
  setTimeout( ()=>this.handleButton(), 2000);
  setTimeout( ()=>this.handleButton(), 1000);
}
  componentDidMount() {
     navigator.geolocation.getCurrentPosition(
       position => {
         this.setState({
           region: {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421
           }
         });
       },
     (error) => console.log(error.message),
     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
     );
     this.watchID = navigator.geolocation.watchPosition(
       position => {
         this.setState({
           region: {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
           }
         });
       }
     );




   }
   componentWillUnmount() {
     navigator.geolocation.clearWatch(this.watchID);
   }



handleButton= ()=>{
  const { currentUser } = firebase.auth();
  let q =  firebase.database().ref(`/users/Parents/${currentUser.uid}`);
  q.once('value', snapshot => {
    snapshot.forEach( (data)=>{
      let result = data.val();
      items.push(result);
      this.state.DbVal.push(result);
    });
    //alert("items"+items[1])
    this.state.KEY = items[1];
    //alert("inside="+this.state.DbVal[1])

  }).then(()=>{
    this.state.KEY = items[1];

  });

//alert("KEY STae="+this.state.KEY)
  let DriverRef =  firebase.database().ref(`/users/Drivers/${this.state.KEY}`);
//alert("refd="+DriverRef)
  DriverRef.on('value', snapshot => {
    snapshot.forEach(function(data) {
      let result2 = data.val();
      finished.push(result2);
    })
  //  alert("ff"+finished.length)
  //alert("finished="+ finished[0]);
  });
  //alert("finished="+ finished[1]);
  if(finished.length>0)
this.state.busLocation = finished[0];
 //alert("finished="+ finished[0]);

  //alert("finished len"+finished.length)

}

  render () {
    return (
      <View style={{
         position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }

      }>
      <MapView

        style={{    height: '100%', width: '100%'}}

          showsUserLocation={ true }
          region={ this.state.region }

        >
          <MapView.Marker
            coordinate={ this.state.busLocation}
            image={require('../Images/ss.png')}
          />
          <MapView.Circle

      center={this.state.busLocation}
      radius={300}
      fillColor='rgba(255, 0, 0, 0.2)'
      strokeColor='rgba(0, 0, 0, 0.2)'
      />
      </MapView>
      <RoundedButton styles={{borderRadius: 60, flex: 1}}  onPress= {()=> this.handleButton()}>
              Navigate
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentmapScreen)
