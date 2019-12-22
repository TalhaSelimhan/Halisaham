import * as React from "react";
import * as RN from "react-native";
import * as Indicators from "react-native-indicators";
import Colors from "../Config/Colors";


export default class Indicator extends React.Component{
    render(){
        return(
            <RN.View style={{left:0, right:0, top:0, bottom:0, position:'absolute', backgroundColor:Colors.backgroundGreen, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                <RN.View style={{flex:3}}>
                    <Indicators.PacmanIndicator color={Colors.postBackground}/> 
                </RN.View>
                <RN.View style={{flex:1}}>
                    <RN.Text style={{color:Colors.postText, fontSize:24, fontWeight:'500', letterSpacing:3, textAlign:'center'}}>
                        Loading...
                    </RN.Text>
                    {this.props.extra && 
                        <RN.Text style={{color:Colors.postBackground, fontSize:16, fontWeight:'200', letterSpacing:1.5, textAlign:'center'}}>
                            {this.props.extraText}
                        </RN.Text>
                    }
                </RN.View>
                
                
            </RN.View>
        )
    }
}