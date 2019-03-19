import React from 'react'
import { StackNavigator, DrawerNavigator, DrawerItems } from 'react-navigation'
import FakeScreen from '../Containers/FakeScreen'
import TestingChatScreen from '../Containers/TestingChatScreen'
import AllMessagesScreen from '../Containers/AllMessagesScreen'
import ChildrenListScreen from '../Containers/ChildrenListScreen'
import ParentToDriverNotificationScreen from '../Containers/ParentToDriverNotificationScreen'
import Chat2Screen from '../Containers/Chat2Screen'
import ChatScreen from '../Containers/ChatScreen'
import ParentmapScreen from '../Containers/ParentmapScreen'
import TeacherinfoScreen from '../Containers/TeacherinfoScreen'
import TeacherScreen from '../Containers/TeacherScreen'
import DriverScreen from '../Containers/DriverScreen'

import Buses from '../Containers/Buses'
import Teachers from '../Containers/Teachers'
import TeacherProfileScreen from '../Containers/TeacherProfileScreen'
import ProfileScreen from '../Containers/ProfileScreen'
import HomeScreen from '../Containers/HomeScreen'
import Map2Screen from '../Containers/Map2Screen'
import TeachersScreen from '../Containers/TeachersScreen'
import MainAppScreen from '../Containers/MainAppScreen'
import ParentScreen from '../Containers/ParentScreen'
import ParentFormScreen from '../Containers/ParentFormScreen'
import FormtestScreen from '../Containers/FormtestScreen'
import SignupFormScreen from '../Containers/SignupFormScreen'
import LoginFormScreen from '../Containers/LoginFormScreen'
import RegisterScreen from '../Containers/RegisterScreen'
import MapScreen from '../Containers/MapScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import { Image,Text, View, TouchableOpacity } from 'react-native'
import { Icon, Left, Right, Header, Body, Content, Container, Button } from 'native-base'


import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const CustomDrawer = (props) => {
  return (
    <Container style={{backgroundColor:'#3b5998'}}>
    <Image
      style={{
      backgroundColor: '#ccc',
      flex: 1,
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    }}
source={require('../Images/blue.jpg')}/>
    <Header style={{ backgroundColor:'#3b5998',height:200}}>

      <Body style={{justifyContent:'center',alignItems:'center'}}>
        <Image
          style={{width:120, height:120, borderRadius:175,resizeMode: 'stretch'}}
          source={require('../Images/userb.png')} />
      </Body>
    </Header>
    <Content>
    <View>



    <TouchableOpacity onPress={()=>props.navigation.navigate('HomeScreen')}>
      <View style={{ marginTop:20,height: 50,flexDirection: 'row'}}>
      <Image
        style={{width:40, height:40,resizeMode:'stretch',marginLeft: 40,marginTop: 8 }}
        source={require('../Images/settt.png')}
        />
        <Text style={{color:'#ffffff',fontSize:20,paddingLeft: 40,paddingTop: 13}}>SETTINGS</Text>
        </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>props.navigation.navigate('HomeScreen')}>
      <View style={{marginTop:5, height: 50,flexDirection: 'row'}}>
      <Image
        style={{width:40, height:40,resizeMode:'stretch',marginLeft: 40,marginTop: 8 }}
        source={require('../Images/prof1.png')}
        />
        <Text style={{color:'#ffffff',fontSize:20,paddingLeft: 40,paddingTop: 13}}>PROFILE</Text>
        </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>props.navigation.navigate('HomeScreen')}>
      <View style={{ marginTop:5,height: 50,flexDirection: 'row'}}>
      <Image
        style={{width:40, height:40,resizeMode:'stretch',marginLeft: 40,marginTop: 8}}
        source={require('../Images/cal.png')}
        />
        <Text style={{color:'#ffffff',fontSize:20,paddingLeft: 40,paddingTop: 13}}>CALENDAR</Text>
        </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>props.navigation.navigate('HomeScreen')}>
      <View style={{ marginTop:5,height: 50,flexDirection: 'row'}}>
      <Image
        style={{width:40, height:40,resizeMode:'stretch',marginLeft: 40,marginTop: 8 }}
        source={require('../Images/inf.png')}
        />
        <Text style={{color:'#ffffff',fontSize:20,paddingLeft: 40,paddingTop: 13}}>ABOUT US</Text>
        </View>
    </TouchableOpacity>

    <TouchableOpacity onPress={()=>props.navigation.navigate('HomeScreen')}>
      <View style={{ marginTop:5,height: 50,flexDirection: 'row'}}>
      <Image
        style={{width:40, height:40,resizeMode:'stretch',marginLeft: 40,marginTop: 8 }}
        source={require('../Images/logout.png')}
        />
        <Text style={{color:'#ffffff',fontSize:20,paddingLeft: 40,paddingTop: 13}}>LOGOUT</Text>
        </View>
    </TouchableOpacity>



    </View>
    </Content>
  </Container>

       );
}


// Manifest of possible screens
const PrimaryNav = StackNavigator({
  FakeScreen: { screen: FakeScreen },
  TestingChatScreen: { screen: TestingChatScreen },
  AllMessagesScreen: { screen: AllMessagesScreen },
  ChildrenListScreen: { screen: ChildrenListScreen },
  ParentToDriverNotificationScreen: { screen: ParentToDriverNotificationScreen },
  Chat2Screen: { screen: Chat2Screen },
  ChatScreen: { screen: ChatScreen },
  ParentmapScreen: { screen: ParentmapScreen },
  TeacherinfoScreen: { screen: TeacherinfoScreen },
  TeacherScreen: { screen: TeacherScreen },
  DriverScreen: { screen: DriverScreen },


  Buses: { screen: Buses },
  Teachers: { screen: Teachers },
  TeacherProfileScreen: { screen: TeacherProfileScreen },
  ProfileScreen: { screen: ProfileScreen },
  HomeScreen: { screen: HomeScreen },
  Map2Screen: { screen: Map2Screen },
  TeachersScreen: { screen: TeachersScreen },
  MainAppScreen: { screen: MainAppScreen },
  ParentScreen: { screen: ParentScreen },
  ParentFormScreen: { screen: ParentFormScreen },
  FormtestScreen: { screen: FormtestScreen },
  SignupFormScreen: { screen: SignupFormScreen },
  LoginFormScreen: { screen: LoginFormScreen },
  RegisterScreen: { screen: RegisterScreen },
  MapScreen: { screen: MapScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

//export default PrimaryNav

const Drawer = DrawerNavigator({
  HomeScreen: { screen: PrimaryNav },
  LaunchScreen: { screen: LaunchScreen },

},{
  initialRouteName: 'LaunchScreen',
  contentComponent: ({navigation}) => { return <CustomDrawer navigation={navigation} />},
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle',
})




export default Drawer