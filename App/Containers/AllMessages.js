import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, ListView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'

import { Images } from '../Themes'

import styles from './Styles/AllMessagesStyle'


import Header from './header.js';
import firebase from 'firebase';

export default class AllMessages extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }


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
     Flag: false,
     AllMessages: [],
     inlineMessages: [],
     otherSideCount: 0,
     otherSideInline: [],
     Allnline: [],
   };
}

componentWillMount(){


  const {state} = props.navigation;
  var key = state.params ? state.params.key : "baka";
  var name = state.params ? state.params.name : "baka";


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
  if(finished1.length > 0)
  this.state.AllMessages.push(finished1);
  this.setState({
    fromDBMessages: finished1
  })
})


let q2 =  firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${this.state.Key}`);

q2.once('value', snapshot => {
  snapshot.forEach(function(data) {
    let result = data.val();
    result["key"] = data.key;
    result["theOtherSide"]=true;
    result["me"]=false;
    finished.push(result);
  })
  this.state.AllMessages = this.state.fromDBMessages.concat(finished);
  this.state.AllMessages.sort(function (a, b) {
          return a.time - b.time;
        });
  this.setState({dataSource: this.state.dataSource.cloneWithRows(finished)});
  this.setState({
    myDBMessages: finished,
  })
})



}
  render () {
    console.tron.log(this.state)
    return (

      <View>

        {this.state.AllMessages.map(function(x) {

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
