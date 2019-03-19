import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, ListView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Images } from '../Themes'

import firebase from 'firebase';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/TeachersStyle'

import { Icon, Left, Body, Title, Right, Header, Content, Container, Button } from 'native-base'


import TeacherProfileScreen from './TeacherProfileScreen.js'
import TeacherinfoScreen from './TeacherinfoScreen.js'

const req=[];
class Teachers extends React.PureComponent {
  constructor(){
    super()

    this.state = {
       imm: '../Images/teachers/3qgTcdgaA1Q3UyHfLy9GIHAnoeM2.png',
      TeachersData: [],
      dataSource: new ListView.DataSource({ rowHasChanged: (r1,r2) => r1 !==r2  }),
    }
  }


componentWillMount(){
    var that = this;
    items = [];

    let q = firebase.database().ref('users/Teachers');
    var finished = [];
    q.on('value', snapshot => {
      snapshot.forEach( (data)=>{
        items.push(
          {
            key: data.key,
            data: data.val(),
            xx: require('../Images/teachers/wgPcj2DqPidCXSE6IRDdgxBO5i93.png')
          });
      });

      this.setState({dataSource: this.state.dataSource.cloneWithRows(items)});
    });


  }




  renderRow(data){

 var im = `../Images/teachers/`+`wgPcj2DqPidCXSE6IRDdgxBO5i93`+`.png`;
 var x = require('../Images/teachers/wgPcj2DqPidCXSE6IRDdgxBO5i93.png');
 https://firebasestorage.googleapis.com/v0/b/finalmap-1520780119975.appspot.com/o/teachers%2F3qgTcdgaA1Q3UyHfLy9GIHAnoeM2.png?alt=media&token=a321cf85-f834-44ba-bf6a-fb05c671b753
 var imData = 'https://bakabackend.000webhostapp.com/teachers/'+data.key+'.png'
 console.tron.log(x);
    return(
      <TouchableOpacity onPress={() => this.props.navigation.navigate('TeacherinfoScreen', { key: data.key })}>
      <View style={mystyles.container}>

      <Image
      style={mystyles.photo}
         source={{uri: imData}} />


        <Text style={mystyles.text}> {data.data.Name} </Text>

      </View>
      </TouchableOpacity >
    )
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
               <Title>Teachers</Title>
             </Body>

             <Right>
               <Button transparent>
                 <Icon name='more' onPress={()=>this.props.navigation.goBack(null)}/>
               </Button>
             </Right>

            </Header>
            <Content>

      <View style={styles.container}>

        <ListView

           dataSource={this.state.dataSource}
           renderRow={this.renderRow.bind(this)}

        />
      </View>

      </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
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
export default connect(mapStateToProps, mapDispatchToProps)(Teachers)
