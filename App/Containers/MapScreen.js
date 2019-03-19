import React, { Component } from 'react'
import MapView from 'react-native-maps'
import { ScrollView, Text, KeyboardAvoidingView, View, Alert, Image, Dimensions, Timers, TouchableOpacity, platform } from 'react-native'
import { connect } from 'react-redux'

import TimerMixin from 'react-timer-mixin';

import firebase from 'firebase'

import MapViewDirections from 'react-native-maps-directions'

import geolib from 'geolib'
import { Images } from '../Themes'

import RoundedButton from '../../App/Components/RoundedButton'
//'
//import { navigator } from 'react-native-navigator'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MapScreenStyle'

import { Icon, Left, Body, Title, Right, Header, Content, Container, Button } from 'native-base'


//AIzaSyDg0dYEzKnxlmjy9BTiQHxVGjyC_dOA3G4
const GOOLE_MAPS_APIKEY = 'AIzaSyCO9yLD2jMDrNvuU2XzeW-WVmS6DS9fSZY';

var count = 0;

const DBData = [];

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LatDel =0.10922 ;
const LongDel = 0.10421;

const index =0;

const sendUpdate=true;

const once = 1;
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
         latitude: 32.2276745735839,
         longitude: 35.215799398720264

       },
       from:{
         latitude: 32.22111,
         longitude: 35.25444
       },
       DriverName:'',
       markers: [],
       storr:[],
       listingData:[],
       AllList: [],
       Driving: false,
       Radius: 3000,
       Radius2:200
         };




   }

componentWillMount(){

     const { currentUser } = firebase.auth();
    var that = this;

    let q = firebase.database().ref('users/Parents');
    var finished = [];
    var finished2 = [];
    console.tron.log(currentUser.uid)
    q.once('value', snapshot => {
      snapshot.forEach(function(data) {
        let result = data.val();
      //  console.tron.log(result.Driver);
        if(result.CommingFlag && result.Driver === currentUser.uid)
        {
        result["key"] = data.key;
        result["distance"]=0;
        result["firstNotification"]=false;
        result["secondNotification"]=false;
        finished.push(result);
        DBData.push(result);
      }

      if( result.Driver === currentUser.uid)
      {
      result["key"] = data.key;
      result["distance"]=0;
      result["firstNotification"]=false;
      result["secondNotification"]=false;
      finished2.push(result);

    }

      })
    }).then(function(){
      that.setState({
        listingData: finished,
        AllList: finished2
      })

    })



    navigator.geolocation.getCurrentPosition(
      position => {

        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.100922,
            longitudeDelta: 0.100421
          }
        });


      },
    (error) => console.log(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
    );



}

componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      position => {


        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.10922,
            longitudeDelta: 0.100421
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
            latitudeDelta: 0.100922,
            longitudeDelta: 0.100421
          }
        });
      }
    );
  }
  componentWillUnmount() {

    navigator.geolocation.clearWatch(this.watchID);
  }





handleChange = ()=>{



  if(this.state.Driving)
  {



var distance;
  navigator.geolocation.getCurrentPosition(
    position => {

       distance= geolib.getDistance(position.coords, {
          latitude: this.state.listingData[index].Locat.latitude,
          longitude: this.state.listingData[index].Locat.longitude
      });



 if(distance < this.state.Radius && this.state.listingData[index].secondNotification===false && this.state.listingData[index].firstNotification===false)

        {

      //  alert("get ready you mother fucker i am "+distance+" away"+count);
        var KEY = this.state.listingData[index].key;
        //alert("key = "+KEY + "index ="+index)
        fetch('http://bakabackend.000webhostapp.com/farNotif.php?key='+KEY+'&MSG=be ready the Bus will be there in 8 mins', {
          method: 'POST',
          headers: {
             'Accept' : 'application/json',
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: 'test',
          })
        })
         count ++;

         this.state.listingData[index].firstNotification=true;
         //this.state.listingData.shift();
      //   alert("distance ="+distance)

      if(this.state.listingData.length >= 1)
         index++;
         else {
           index = 0;
         }
       }



      //count =0;

      var distance2;
      distance2= geolib.getDistance(position.coords, {
        latitude: this.state.to.latitude,
        longitude: this.state.to.longitude
      });
       if(distance2< this.state.Radius2 && this.state.listingData[0].firstNotification)
       {

         var KEY2 = this.state.listingData[0].key;
         fetch('http://bakabackend.000webhostapp.com/farNotif.php?key='+KEY2+'&MSG= the Bus is waiting  '+this.state.listingData[0].Child, {
           method: 'POST',
           headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             key: 'test',
           })
         })
        // alert("we are ready to go"+ distance)
         this.state.listingData[0].secondNotification=true;
         this.state.listingData.shift();

       this.state.to = this.state.listingData[0].Locat;
       index = 0;
      //index--;

       }
/*
var i = 0;
while(i<this.state.listingData.length)
{
       var distancei;
       distancei= geolib.getDistance(position.coords, {
         latitude: this.state.listingData[i].Locat.latitude,
         longitude: this.state.listingData[i].Locat.longitude
       });

       if(distancei< this.state.Radius && this.state.listingData[i].firstNotification == false)
       { var KEY3 = this.state.listingData[i].key;
         fetch('http://bakabackend.000webhostapp.com/farNotif.php?key='+KEY3+'&MSG=this is from the far farNotif :'+distance, {
           method: 'POST',
           headers: {
              'Accept' : 'application/json',
              'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             key: 'test',
           })
         })
         this.state.listingData[i].firstNotification=true;
       }
       i--;

}
*/

if(index+1 >this.state.listingData.length)
{
  index = 0;
}

      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.LatDel,
          longitudeDelta: this.LongDel
        }
      });
    },
  (error) => console.log(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
  );

}

/*function myFunction() {
    setTimeout(function(){ alert("i will go to update") }, 6000);
  }
*/
  //()=> this.updateDriverLocationDB()
  setTimeout( ()=>this.updateDriverLocationDB(), 6000);
}


updateDriverLocationDB = ()=>{
//  alert("inside update")
  const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/Drivers/${currentUser.uid}`).update(
      {
        Location: this.state.region

    }
  ).then(()=>{
  }).catch((error)=>{
    Alert.alert("something went weong !!");
  });
}
handleDrivingButton = ()=>{
  this.state.to = this.state.listingData[0].Locat;

  navigator.geolocation.getCurrentPosition(
    position => {


      this.state.listingData.forEach(function(item,index,array) {

        var distance= geolib.getDistance(position.coords, {
          latitude: item.Locat.latitude,
          longitude: item.Locat.longitude
        });
        item.distance = distance;

      })


      this.state.listingData.sort(function (a, b) {
        return a.distance - b.distance;
      });
      this.state.to = this.state.listingData[0].Locat;
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.100922,
          longitudeDelta: 0.100421
        }
      });

    },
  (error) => console.log(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },

  );





  const isDriving = this.state.Driving;
  this.setState({Driving:!isDriving});
  if(isDriving){
//setTimeout( ()=>this.updateDriverLocationDB(), 6000);
  this.LatDel = 0.1055;
  this.LongDel = 0.1055;
}
else {
  this.LatDel = 0.01055;
  this.LongDel = 0.01055;
}

  navigator.geolocation.getCurrentPosition(
    position => {
  /*  alert('You are ' + geolib.getDistance(position.coords, {
          latitude: this.state.to.latitude,
          longitude: this.state.to.longitude
      }) + ' meters away from 51.525, 7.4575');
*/
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: this.LatDel,
          longitudeDelta: this.LongDel
        }
      });
    },
  (error) => console.log(error.message),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000 },
  );


}


renderDriveOrNavigate= ()=>{



    if(this.state.Driving)
    return(
      <RoundedButton styles={{borderRadius: 60,  justifyContent: 'center'}}  onPress= {()=> this.handleDrivingButton()}>
              Navigate
           </RoundedButton>
    )

    return(
      <RoundedButton styles={{borderRadius: 60,  justifyContent: 'center'}}  onPress= {()=> this.handleDrivingButton()}>
              drivr
           </RoundedButton>
    )


}
  render () {
  console.tron.log(this.state)

    return (



      <Container>
            <Header style={{justifyContent:'center',alignItems:'center'}}>
             <Left>
               <Button transparent>
                  <Icon name='menu' onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
                </Button>
             </Left>


             <Body>
               <Title>Register</Title>
             </Body>

             <Right>
               <Button transparent>
                 <Icon name='more' onPress={()=>this.props.navigation.goBack(null)}/>
               </Button>
             </Right>

            </Header>
            <Content>

<View style={{
     height: height,
     width: width
  }

}>



  <MapView
  style=  {{position: 'absolute',	top: 0,	left: 0,	bottom: 0,  right: 0 }}
  provider = {"google"}
  showsUserLocation ={true}
  followsUserLocation={true}

 region={this.state.region}
 scrollEnabled={true}
onUserLocationChange={ this.handleChange() }
		  >

      {this.state.listingData.map(function(x) {
        return(


          <MapView.Marker
          title={x.Child}
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
      image={require('../Images/ss.png')}

      />

<MapView.Marker
title={"to"+this.state.to.latitude+","+this.state.to.longitude}
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




<View style={{position: 'absolute', margin: 100, paddingLeft: 30, bottom: 0, flex: 1}}>
{this.renderDriveOrNavigate()}

</View>

</View>



</Content>
</Container>



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
