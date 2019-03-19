import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { ScrollView, Text, KeyboardAvoidingView, View, Alert, Image } from 'react-native'
import { connect } from 'react-redux'

import firebase from 'firebase'

import MapViewDirections from 'react-native-maps-directions'

//'
//import { navigator } from 'react-native-navigator'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MapScreenStyle'


const GOOLE_MAPS_APIKEY = 'AIzaSyAym456UI_gYulyUfmVMDrBhCo57Ng68_E';


//const DBData[];
class MapScreen extends Component {


   constructor(props) {
    super(props);
    this.state = {
       region: {
         latitude: 32.22111,
         longitude: 35.25444,
         latitudeDelta: 0.0922,
         longitudeDelta: 0.0421

       },
       to:{
         latitude: 32.13595,
         longitude: 35.25444
       },
       from:{
         latitude: 32.22111,
         longitude: 35.25444
       },
       markers: [],
       storr:[],
       listingData:[]
         };

   }

componentWillMount(){

    var that = this;

    let q = firebase.database().ref('users');
    var finished = [];
    q.once('value', snapshot => {
      snapshot.forEach(function(data) {
        let result = data.val();
        result["key"] = data.key;
        finished.push(result);
        DBData.push(result);
      })
    }).then(function(){
      that.setState({
        listingData: finished
      })
    })

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
  style=  {{position: 'absolute',	top: 0,	left: 0,	bottom: 0,  right: 0 }}
  provider = {"google"}
  showsUserLocation ={true}
  followsUserLocation={true}

  showsMyLocationButton = {true}
 region={this.state.region}

		  >

      {this.state.listingData.map(function(x) {
        return(
          <MapView.Marker
          title={'fuck'}
          key={x.key}
          coordinate={{
            latitude: x.Locat.latitude,
            longitude: x.Locat.longitude
          }} />
        )
      })}


      <MapView.Marker
      title={"from"}
      coordinate= {this.state.region}
       image = {require('../Images/busMark.png')}
      />

<MapView.Marker
title={"to"}
coordinate= {this.state.to}


/>
      <MapViewDirections
        origin={this.state.region}
        destination={this.state.to}
        apikey={GOOLE_MAPS_APIKEY}
        strokeWidth={3}
        strokeColor="blue"
        resetOnChange={true}
      />


      <MapView.Circle

 center={this.state.region}
 radius={3000}
 fillColor='rgba(255, 0, 0, 0.2)'
 strokeColor='rgba(0, 0, 0, 0.2)'
 />



</MapView>

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

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen)
