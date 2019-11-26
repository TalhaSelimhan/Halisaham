import React from "react";
import * as RN from "react-native";
import Colors from '../Config/Colors'



export default class Button extends React.Component{
    render(){
        return(
            <RN.TouchableOpacity style={{...styles.container, ...this.props.containerStyle}} onPress={this.props.onPress}>
                <RN.Image source={this.props.logo1} style={{flex:1, width:20, height:20, resizeMode:'contain'}}/>
                <RN.Text style={{...styles.textStyle, ...this.props.textStyle}}>{this.props.title}</RN.Text>
                <RN.View style={{flex:1}}/>
            </RN.TouchableOpacity>
        )
    }
}

const styles = RN.StyleSheet.create({
    container: {
      backgroundColor: Colors.backgroundGreen,
      width:'90%',
      height:45,
      padding:5,
      borderRadius:20,
      alignContent:'center',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection:'row'
    },
    textStyle:{
        flex:4,
        color:Colors.postText,
        textAlign:'center', 
        fontSize:15, 
        fontWeight:'200'
    }
  });