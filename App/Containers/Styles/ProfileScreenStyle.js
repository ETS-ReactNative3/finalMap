import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
containerStyle: {
  flex: 1 ,
  flexDirection: 'column',
   backgroundColor: '#fff'
},
  rowStyle: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1 ,
  borderRadius: 5,
  height: 50,
  marginBottom:1
},
inputStyle: {
  paddingLeft: 20,
  flex: 2,
  fontSize: 18
},
textStyle:{
  paddingLeft: 20,
  flex: 1,
  fontSize: 18,
  fontWeight: 'bold',
},
imageStyle:{
  position: 'absolute',
  resizeMode: 'stretch',
  flex: 1,
  width: 84,
  height: 84
},
imageContainerStyle:{
  justifyContent: 'center',
  alignItems: 'center',
  width: 140,
  height: 140,
  marginTop: 70,
  borderRadius: 100,
  borderWidth:3,
  borderColor: '#ddd',
  shadowColor: '#000' ,
  shadowOpacity: 0.2,
  shadowOffset:{ width: 0, height: 1 },
  marginBottom: 40
}
})
