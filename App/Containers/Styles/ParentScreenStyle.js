import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  inputsContainer: {
    flex:1,
    flexDirection: 'column',
    left: 40,
    width: 290,
    marginBottom: 30,
    justifyContent: "center"
  },
  buttonsContainer: {
    flex:1,
    flexDirection: 'column',
    position: 'absolute',
    width: 306,
    top: 370,
    right:1,
    justifyContent: "center",

  },
  textInput: {
    justifyContent: "center",
    alignItems: "stretch",
    width: 250,
    borderRadius: 25,
    height: 40,
    borderWidth: 1,
    backgroundColor:'#ffffff',
    paddingTop: 30,
    marginHorizontal: 10,
    marginVertical: 10

  },
  container: {
    flex: 1,
    justifyContent: 'center'

  },
  backbutton: {
    paddingBottom: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    paddingHorizontal: 5,
    zIndex: 10,
    marginBottom: 180
  }
  })
