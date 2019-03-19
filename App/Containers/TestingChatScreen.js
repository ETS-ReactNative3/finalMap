import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, TextInput, ListView, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../../App/Components/RoundedButton'

import { Images } from '../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

import Header from './header.js';
import firebase from 'firebase';
import AllMessages from './AllMessages.js'

const xname="";
const xkey="";
const xcount = 12;

import styles from './Styles/TestingChatScreenStyle'

class TestingChatScreen extends Component {
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

  snapshot.forEach(function(data) {
    count = data.val();

    //alert("count="+data.val())
  //  alert("const xcount="+xcount);
//this.state.DbMSGCount= xcount;

})

    this.state.DbMSGCount= count;
    //alert("state count is = "+this.state.DbMSGCount)




let query =  firebase.database().ref(`/users/Messages/${currentUser.uid}/to/${this.state.Key}/${this.state.DbMSGCount+1}`);

var inline = ""
var finished1 = [];
query.on('value', snapshot => {


 var msg = snapshot.child("Messagesdata");
 var t = snapshot.child("time")
  inline = snapshot
this.state.inlineMessages.push(inline)

/*snapshot.forEach(function(data) {
let result = data.val();
result["key"] = data.key;
result["theOtherSide"]=false;
result["me"]=true;
finished1.push(result);
})*/
//finished1.push(snapshot)
  finished1.push({key: 122, theOtherSide: true, me: false, Messagesdata: snapshot.child("Messagesdata"), time: snapshot.child("time")})
  //finished1 = finished1.concat(snapshot);
if(finished1.length>0)
{
//this.state.AllMessages.push(finished1);
  this.state.Allnline = this.state.Allnline.concat(finished1);

  this.state.Allnline.sort(function (a, b) {
          return a.time - b.time;
        });
}

})


let otherq3 =  firebase.database().ref(`/users/Messages/${this.state.Key}/to/${currentUser.uid}/messageCount`);

var othercount = 0
otherq3.on('value', snapshot => {

  snapshot.forEach(function(data) {
    othercount = data.val();

})
})
this.state.otherSideCount = othercount;


let otherquery =  firebase.database().ref(`/users/Messages/${this.state.Key}/to/${currentUser.uid}/${this.state.otherSideCount+1}`);

var inline = ""
var finis = []
var xx = []
otherquery.on('value', snapshot => {

//finis.push(snapshot)
  finis.push({key: 122, theOtherSide: false, me:true, Messagesdata: snapshot.child("Messagesdata"), time: snapshot.child("time")})
//  finis = finis.concat(snapshot);
 if(finis.length > 0)
 {
   //console.tron.log(finis)
//this.state.AllMessages.push(finis);
  this.state.Allnline = this.state.Allnline.concat(finis);
  //console.tron.log(finis)
}

//  console.tron.log(finis);


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
  if(finished1.length > 0)
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




  //this.state.AllMessages.push(this.state.myDBMessages);


}


componentDidMount() {

  this.state.Flag = true;
  var testcount = this.state.DbMSGCount;



}

onSendPress= ()=>{

  if(this.state.text ==="")
  return;
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
//  console.tron.log(this.state);
  return (

    <ScrollView style={styles.container} >
      <KeyboardAvoidingView behavior='position'>
      <View>
      <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
        <Image source={Images.backButton} />
      </TouchableOpacity>
          <Header headerText={this.state.Name} />
      </View>
      <View style={{height: 300}}>
      <ScrollView ref="scrollView" onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}>


         <AllMessages />


      {this.state.Allnline.map(function(x) {
        console.tron.log(x.Messagesdata);


        if(!x.me && x.Messagesdata ){
              return(

                  <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'red', padding: 5}}>
                  <Text style={{textAlign: 'right', fontSize: 18, color: 'white'}}>{x.Messagesdata.val()}</Text>

                  </View>
      )
      }
      else if(!x.theOtherSide && x.Messagesdata)
      {
      return(

          <View style={{borderRadius: 10, borderWidth: 1, padding: 15}}>
          <Text style={{textAlign: 'left', fontSize: 18}}>{x.Messagesdata.val()}</Text>

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

export default connect(mapStateToProps, mapDispatchToProps)(TestingChatScreen)
