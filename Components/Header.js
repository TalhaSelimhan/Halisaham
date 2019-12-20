import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
const Window = RN.Dimensions.get("window");
const Screen = RN.Dimensions.get("screen");
const height = Window.height;
const width = Window.width;


export default class Header extends React.Component{
    render(){
        return(
            <RN.View style={styles.headerFlex}>
                <RN.View style={{flex:1,marginTop:Constants.statusBarHeight,alignItems:"center",justifyContent:"center"}}>
                    {this.props.drawer ? 
                        <NB.Icon name="menu" type="Feather" onPress={() => this.props.navigation.openDrawer()}/>:
                        <NB.Icon name="chevron-left" type="Entypo" onPress={() => this.props.navigation.pop()}/>}
                </RN.View>
                <RN.View style={{flex:4,marginTop:Constants.statusBarHeight,alignItems:"center",justifyContent:"center"}}>
                    <RN.Text style={{color:"white",fontSize:24}}>{this.props.title}</RN.Text>
                </RN.View>
                <RN.View style={{flex:1}}/>
            </RN.View>            
        )
    }
}

const styles = RN.StyleSheet.create({
    headerFlex:{
        height:height*2/11,
        flexDirection:'row',
        backgroundColor:Colors.backgroundGreen,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    labelStyle:{
        color:'#ccc', 
        fontSize:14, 
        letterSpacing:1.5
    }
})