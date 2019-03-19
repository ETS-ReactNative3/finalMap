//import library to help create cmponeent
import React from 'react';
import { Text, View } from 'react-native';

//create componnent
const allMSG = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    {this.state.AllMessages.map(function(x) {

      if(!x.me &&x.Messagesdata){
            return(

                <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'#0000CD', padding: 5}}>
                <Text style={{textAlign: 'right', fontSize: 18, color: 'white'}}>{x.Messagesdata}</Text>

                </View>
    )
    }
    else if(!x.theOtherSide && x.Messagesdata)
    {
    return(

        <View style={{borderRadius: 10, borderWidth: 1, backgroundColor:'#F5F5DC', padding: 15}}>
        <Text style={{textAlign: 'left', fontSize: 18}}>{x.Messagesdata}</Text>

        </View>
    )
    }

    }
    )
    }
  );
};
const styles = {
  viewStyle: {
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'

    },
  textStyle: {
      fontSize: 20
  }
};

//make the component available to other part of the app
export default allMSG;
