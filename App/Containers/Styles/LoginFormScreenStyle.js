import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  inputsContainer: {
    flex:1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
bottom:50,

  },
  rowStyle: {
  flexDirection: 'row',
  alignItems: 'center',
  height: 50,
  marginBottom:1
},
  buttonsContainer: {
    width: 300,
    marginTop:5,
    bottom:100,
  },
  textInput: {
    width: 250,
    borderRadius: 25,
    marginTop: 10,
    borderWidth: 1,
    height: 40,
    backgroundColor:'#ffffff',

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#ffffff'
  },
  backbutton: {
    paddingBottom: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 5,
    zIndex: 10,
    marginBottom: 180
  },
  imageStyle:{
    position: 'absolute',
    flex: 1,
    width: 120,
    height: 120,
    resizeMode: 'contain'
  },
  imageContainerStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 240,
    height: 240,

  },
  textStyle: {
    left: 40,
    marginTop:5
  }
})
