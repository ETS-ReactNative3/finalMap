import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, Image, View, TouchableOpacity } from 'react-native'
import { Icon, Left, Body, Title, Right, Header, Content, Container, Button } from 'native-base'
import { connect } from 'react-redux'
import Teachers from './Teachers'
import Buses from './Buses'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Images } from '../Themes'
import ButtonBox from '../../ignite/DevScreens/ButtonBox'
import { StackNavigator, DrawerNavigator } from 'react-navigation'
import ParentmapScreen from './ParentmapScreen.js'
import TeachersScreen from './TeachersScreen'
// Screens


// Styles
import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {
  render () {
    return (
      <Container>
      <Header style={{justifyContent:'center',alignItems:'center'}}>
       <Left>
         <Button transparent>
            <Icon name='menu' onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
          </Button>
       </Left>


       <Body>
         <Title>Home</Title>
       </Body>

       <Right>
       <Button transparent>
         <Icon name='search' onPress={()=>this.props.navigation.goBack(null)}/>
       </Button>
         <Button transparent>
           <Icon name='more' onPress={()=>this.props.navigation.goBack(null)}/>
         </Button>

       </Right>

      </Header>
      <Content>
      <View style={styles.mainContainer}>

          <View style={styles.centered}>
            <Image source={Images.school} style={styles.logo} />
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('Teachers')} style={styles.componentButton} image={require('../Images/teacher.png')} text='Teachers' />
            <ButtonBox onPress={() => this.props.navigation.navigate('ParentmapScreen')} style={styles.usageButton} image={Images.usageExamples} text='MAP' />
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.apiButton} image={Images.api}image={Images.faq} text='Communication center' />
            <ButtonBox onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.apiButton} image={Images.theme} text='buses' />
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonBox onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.deviceButton} image={Images.deviceInfo} text='school Info' />
            <ButtonBox onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.usageButton} image={Images.api} text='FAQ' />
          </View>

        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>Made with ❤️ by Evil Empire</Text>
        </View>
      </View>
    </Content>
</Container>
    )
  }
}

const myHome = DrawerNavigator({
  TeachersScreen: { screen: TeachersScreen }
})

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
