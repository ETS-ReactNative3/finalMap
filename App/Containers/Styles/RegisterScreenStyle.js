import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  backbutton: {
    paddingBottom: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 5,
    zIndex: 10,
    marginBottom: 180
  },
  container: {
    flex: 1,
    height: 550,
    justifyContent: 'center',
      backgroundColor: '#ffffff'
  },
  createAccountButton: {
    marginLeft: 70,
    marginRight: 80,
    width: 200,
    borderRadius: 20,
    backgroundColor: '#6666ff'
  },
  createAccountButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    margin: 15,
    color: 'white'

  },
  signInButton: {
    marginLeft: 70,
    marginRight: 80,
    width: 200,
    borderRadius: 20,
    margin: 15,
    backgroundColor: '#6666ff'
  },
  signInButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  imageStyle:{
    width: 180,
      height:200,
      flex:1,
      resizeMode: 'contain'
  },
  imageContainerStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 240,
    marginTop: 70,
    borderRadius: 120,
    borderWidth:3,
    borderColor: '#ddd',
    shadowColor: '#000' ,
    shadowOpacity: 0.2,
    shadowOffset:{ width: 0, height: 1 },
    marginBottom: 240
  }
})
