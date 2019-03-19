import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, ListView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'

import { Images } from '../Themes'

import styles from './Styles/AllMessagesScreenStyle'


import Header from './header.js';
import firebase from 'firebase';


class AllMessagesScreen extends Component {

  constructor(props) {
  super(props);
  this.state = {
     text: '',
     Name: '',
     Key:'',
     DbMSGCount: '0',
     localMSG: "",
     myDBMessages: [],
     fromDBMessages: [],
     dataSource: new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !==r2  }),
     Flag: false,
     AllMessages: [],
     inlineMessages: [],
     otherSideCount: 0,
     otherSideInline: [],
     Allnline: [],
   };
}

componentWillMount(){



var xkey = "wgPcj2DqPidCXSE6IRDdgxBO5i93";








const { currentUser } = firebase.auth();


var finished1 = [];
var finished = [];

let qq =  firebase.database().ref(`/users/Messages/${this.state.Key}/to/${currentUser.uid}`);

qq.once('value', snapshot => {
  snapshot.forEach(function(data) {
    let result = data.val();
    result["key"] = data.key;
    result["theOtherSide"]=false;
    result["me"]=true;
    finished1.push(result);
  })

  this.setState({
       fromDBMessages: finished1,
  })
})


let q2 =  firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${xkey}`);

q2.once('value', snapshot => {
  snapshot.forEach(function(data) {
    let result = data.val();
    result["key"] = data.key;
    result["theOtherSide"]=true;
    result["me"]=false;
    finished.push(result);
  })

    var fromDB = this.state.fromDBMessages;

    var All = fromDB.concat(finished1);
//  this.state.AllMessages = this.state.fromDBMessages.concat(finished);

  this.setState({
    myDBMessages: finished,

    Key: xkey,
    AllMessages: All


  })
})

this.state.AllMessages.sort(function (a, b) {
        return a.time - b.time;
      });




}



  render () {

    console.tron.log(this.state)
    return (

<View>
          {this.state.myDBMessages.map(function(x) {

            if(!x.me &&x.Messagesdata){
                  return(

                      <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'#0000CD', padding: 5}}>
                      <Text style={{textAlign: 'right', fontSize: 18, color: 'white'}}>{x.Messagesdata}</Text>

                      </View>
          )
          }
          else if(!x.theOtherSide && x.Messagesdata)
          {
          return(

              <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'#F5F5DC', padding: 15}}>
              <Text style={{textAlign: 'left', fontSize: 18}}>{x.Messagesdata}</Text>

              </View>
          )
          }

          }
          )
          }


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

export default connect(mapStateToProps, mapDispatchToProps)(AllMessagesScreen)
