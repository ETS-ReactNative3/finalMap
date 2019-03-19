import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Icon, Left, Header, Content, Container, Button } from 'native-base'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/TeachersScreenStyle'

class TeachersScreen extends Component {
  render () {
    return (
      <Container>
      <Header>
       <Left>
          <Icon name='menu' onPress={()=>this.props.navigation.navigate('DrawerOpen')} />
       </Left>
      </Header>
      <Content contentContainerStyle={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      }}>
           <Text>hello</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TeachersScreen)
