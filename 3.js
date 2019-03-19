import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, ListView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'

import { Images } from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/ChatScreenStyle'

import Header from './header.js';
import firebase from 'firebase';

const xname="";
const xkey="";
const xcount = 12;

class ChatScreen extends Component {

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
     otherSideInline: []
   };
}

componentWillMount(){


  const {state} = this.props.navigation;
  var key = state.params ? state.params.key : "baka";
  var name = state.params ? state.params.name : "baka";
  this.state.Name = name;
  this.state.Key = key;

  xname=name;
  xkey=key;

//Alert.alert("something went weong !!");
//alert(this.state.Name+"xname="+xkey);
const { currentUser } = firebase.auth();
let q3 =  firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${this.state.Key}/messageCount`);

var count = 0
q3.on('value', snapshot => {
//  console.tron.log(snapshot);
  snapshot.forEach(function(data) {
    count = data.val();

    //alert("count="+data.val())
  //  alert("const xcount="+xcount);
//this.state.DbMSGCount= xcount;

})

    this.state.DbMSGCount= count;
    //alert("state count is = "+this.state.DbMSGCount)
    let query =  firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${this.state.Key}/${this.state.DbMSGCount}`);

    var inline = ""
    var finished1 = [];
    query.on('value', snapshot => {
    //  console.tron.log(snapshot);
      inline = snapshot
    this.state.inlineMessages.push(inline)
  //  console.tron.log(this.state.inlineMessages);
  snapshot.forEach(function(data) {
    let result = data.val();
    result["key"] = data.key;
    result["theOtherSide"]=false;
    result["me"]=true;
    finished1.push(result);
  })
  this.state.AllMessages.push(finished1);

    })



    let otherq3 =  firebase.database().ref(`/users/Messages/${this.state.Key}/to/${currentUser.uid}/messageCount`);

    var othercount = 0
    otherq3.on('value', snapshot => {
    //  console.tron.log(snapshot);
      snapshot.forEach(function(data) {
        othercount = data.val();

    })
  })
    this.state.otherSideCount = othercount;


    let otherquery =  firebase.database().ref(`/users/Messages/${this.state.Key}/to/${currentUser.uid}/${this.state.otherSideCount}`);

    var inline = ""
    var finis
    otherquery.on('value', snapshot => {
    //  console.tron.log(snapshot);
      inline = snapshot
      snapshot.forEach(function(data) {
        let result = data.val();
        result["key"] = data.key;
        result["theOtherSide"]=false;
        result["me"]=true;
        finis.push(result);
      })
    this.state.AllMessages.push(finis)

  //  console.tron.log(this.state.inlineMessages);


    })





})





let qq =  firebase.database().ref(`/users/Messages/${this.state.Key}/to/${currentUser.uid}`);
var finished1 = [];
qq.once('value', snapshot => {
  snapshot.forEach(function(data) {
    let result = data.val();
    result["key"] = data.key;
    result["theOtherSide"]=false;
    result["me"]=true;
    finished1.push(result);
  })
  this.state.AllMessages.push(finished1);
  this.setState({
    fromDBMessages: finished1
  })
})

let q2 =  firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${this.state.Key}`);
var finished = [];
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




//alert("the 1st message is ="+this.state.myDBMessages[0].key)
this.forceUpdate();



  //this.state.AllMessages.push(this.state.myDBMessages);
  this.forceUpdate();

}


componentDidMount() {

  this.state.Flag = true;
  var testcount = this.state.DbMSGCount;



}

onSendPress= ()=>{
  const {ChildName, PhoneNumber, SocailSecurityNumber, Address, Job, region } = this.state;
  const { currentUser } = firebase.auth();
  var d = new Date();
  var n = d.getTime();
  //alert("date is "+d);

  newCount = this.state.DbMSGCount + 1;
    firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${this.state.Key}/${newCount}`).set(
      {
      time: n,
      Messagesdata: this.state.text
    }
  ).then(()=>{
  }).catch((error)=>{
    Alert.alert("something went weong !!");
  });


  firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${this.state.Key}/messageCount`).set(
    {
      count: this.state.DbMSGCount+1
  }
).then(()=>{
}).catch((error)=>{
  Alert.alert("something went weong !!");
});
this.state.localMSG = this.state.text;

this.state.inlineMessages.push(this.state.text);
this.setState({
  text: ""
})


}

renderMessages= ()=>{
  if(this.state.Flag){
  //alert("inside render messages")
  this.state.AllMessages.map(function(item)  {
  //   console.tron.log(item)
   //  if(item.me){
       return(

 <View>
           <Text style={{textAlign: 'left', fontSize: 18}}>will you show thi ?</Text>
           <TextInput
             style={{height: 40, borderColor: 'gray', borderWidth: 15}}
             onChangeText={(text) => this.setState({text})}

           />
           </View>


       )

   //  }
   /*  else{
       return (
         <View style={{flex: 1}}>
           <Text style={{textAlign: 'left'}}>{item.Messagesdata}</Text>
         </View>
       )
     }*/

   })

 }//if Flag
}

renderRow(data){
  return(
    <View >
    <Text style={{textAlign: 'right'}} >Key: {data.key} </Text>

    </View>

  )
}
render () {
  console.tron.log(this.state);
  return (

    <ScrollView style={styles.container}>
      <KeyboardAvoidingView behavior='position'>
      <View>
      <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
        <Image source={Images.backButton} />
      </TouchableOpacity>
          <Header headerText={this.state.Name} />
      </View>
      <View style={{height: 300}}>
      <ScrollView>

      {this.state.AllMessages.map(function(x) {
        if(!x.me){
              return(

                  <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'#0000CD', width: 150, padding: 5}}>
                  <Text style={{textAlign: 'right', fontSize: 18, Color: 'white'}}>{x.Messagesdata}</Text>

                  </View>
      )
      }
      else if(!x.theOtherSide)
      {
      return(

          <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'#F5F5DC', width: 150, padding: 15}}>
          <Text style={{textAlign: 'left', fontSize: 18}}>{x.Messagesdata}</Text>

          </View>
      )
      }

      }
      )
      }

      </ScrollView>
      </View>

      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 15}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <RoundedButton onPress={this.onSendPress}>
         Save
        </RoundedButton>
        </View>


        {this.state.inlineMessages.map(function(item) {
          console.tron.log(item);
          return(
            <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'#F5F5DC', width: 150, padding: 15}}>
              <Text style={{textAlign: 'right'}}> {item} </Text>
              </View>
            )
        })
      }

      {this.state.otherSideInline.map(function(item) {
        console.tron.log(item);
        return(
          <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'red', width: 150, padding: 15}}>
            <Text style={{textAlign: 'right'}}> {item.val()} </Text>
            </View>
          )
      })
    }

        </KeyboardAvoidingView>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
