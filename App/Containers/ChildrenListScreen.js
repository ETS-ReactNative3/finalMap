import React, { Component } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ListView, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'

import firebase from 'firebase';

// Styles
import styles from './Styles/ChildrenListScreenStyle'

import { Icon, Left, Body, Title, Right, Header, Content, Container, Button } from 'native-base'


class ChildrenListScreen extends Component {

  constructor(){
    super()

    this.state = {

      TeachersData: [],
      dataSource: new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !==r2  }),
    }
  }


  componentWillMount(){
      var that = this;
      items = [];
const { currentUser } = firebase.auth();

      let q = firebase.database().ref('users/Parents');
      var finished = [];
      q.on('value', snapshot => {
        snapshot.forEach( (data)=>{
          let result = data.val();

        if( result.Driver === currentUser.uid)
        {
        result["key"] = data.key;
        result["distance"]=0;
        result["firstNotification"]=false;
        result["secondNotification"]=false;
        finished.push(result);

      }

        this.setState({dataSource: this.state.dataSource.cloneWithRows(finished)});
      });

    });
  }




    renderRow(data){
      console.tron.log(data)
      if(data.CommingFlag)
      {
        var im = 'https://bakabackend.000webhostapp.com/Parents/'+data.key+'.PNG'
        console.tron.log(im)
      return(
        <TouchableOpacity onPress={() => this.props.navigation.navigate('TeacherinfoScreen', { key: data.key })}>
        <View style={mystyles.container}>

        <Image
        style={mystyles.photo}
           source={{uri: im}} />


          <Text style={{color : 'black', marginLeft: 20, fontSize: 18, paddingLeft: 5}}> {data.Child} </Text>

        </View>
        </TouchableOpacity >
      )
    }
     else {
       return(
         <TouchableOpacity onPress={() => this.props.navigation.navigate('TeacherinfoScreen', { key: data.key })}>
         <View style={mystyles.container}>

         <Image
         style={mystyles.photo}
            source={require('../Images/parent.png')} />


           <Text style={{color: 'red', marginLeft: 20, fontSize: 18, paddingLeft: 5}}> {data.Child} </Text>

         </View>
         </TouchableOpacity >
       )
     }

    }


    render () {


      return (

        <Container>
              <Header style={{justifyContent:'center',alignItems:'center'}}>
               <Left>
                 <Button transparent>
                 <TouchableOpacity onPress={() => this.props.navigation.goBack(null)}>
                   <Image source={Images.backButton} />
                 </TouchableOpacity>
                  </Button>
               </Left>


               <Body>
                 <Title>Students</Title>
               </Body>

               <Right>
                 <Button transparent>
                   <Icon name='more' onPress={()=>this.props.navigation.goBack(null)}/>
                 </Button>
               </Right>

              </Header>
              <Content>

                    <ScrollView>
                    <View style={styles.container}>

                      <ListView

                         dataSource={this.state.dataSource}
                         renderRow={this.renderRow.bind(this)}

                      />
                    </View>

                    </ScrollView>


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

const mystyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 20,
    fontSize: 18,
    paddingLeft: 5
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(ChildrenListScreen)
