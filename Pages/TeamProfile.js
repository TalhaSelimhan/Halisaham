import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import {Radar} from "react-native-pathjs-charts";
const Window = RN.Dimensions.get("window");
const Screen = RN.Dimensions.get("screen");
const height = Window.height;
const width = Window.width;
import TeamMatchHistory from './TeamMatchHistory';
import TeamSquad from './TeamSquad';

class TeamProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:1
        }
    }
    render(){
        return(
            <RN.View style={{flex:1}}>
                <RN.View style={styles.imageView}>
                    <RN.Image source={{uri:'https://www.elsetge.cat/myimg/f/91-914400_soccer-s-s-c-napoli-logo-ssc-napoli.jpg'}}
                              style={{width:width, height:height*0.45, resizeMode:'cover', left:0, right:0, position:"absolute"}}/>
                </RN.View>
                <RN.View style={styles.infoView}>
                    <RN.View style={styles.firstSection}>
                        <RN.View style={{width:width*0.60, alignItems:'flex-start', justifyContent:'center'}}>
                            <RN.Text style={{fontSize:20, fontWeight:'bold', color:Colors.postBackground}}>SSC Napoli</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>Naples, Italy</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>2,8 km away</RN.Text>
                        </RN.View>
                        <RN.View style={{width:width*0.30, justifyContent:'space-around'}}>
                            <Button title="CHALLENGE"
                                    containerStyle={{backgroundColor:'#fff', width:width*0.3, height:height*0.04}}
                                    textStyle={{color:Colors.postBackground, fontSize:10, fontWeight:'600'}}/>
                            <Button title={this.state.show == 1 ? 'SQUAD' : 'MATCHES'}
                                    onPress={() => this.setState({show:this.state.show*-1})}
                                    containerStyle={{backgroundColor:Colors.squadButton, width:width*0.3, height:height*0.04}}
                                    textStyle={{color:'#fff', fontSize:10, fontWeight:'600'}}/>
                        </RN.View>
                    </RN.View>
                    <RN.View style={styles.thirdSection}>
                        {this.state.show == 1 ? <TeamMatchHistory/> : <TeamSquad/>}
                    </RN.View>

                </RN.View>
            </RN.View>
        )
    }
}





const styles = RN.StyleSheet.create({
    imageView:{
        zIndex:-1,
        left:0, 
        right:0, 
        bottom:height*0.55,
        top:0,
        padding:0,
        margin:0,
        width:'100%', 
        height:height*0.45,
        elevation:0
    },
    infoView:{
        zIndex:1, 
        elevation:3,
        shadowColor:'black',
        shadowOffset:{
            height:-2,
            width:0
        },
        alignContent:'center',
        justifyContent:'space-around',
        shadowOpacity:0.7,
        shadowRadius:5,
        backgroundColor:Colors.backgroundGreen,
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        left:0, 
        right:0, 
        bottom:0, 
        top:-height*0.1, 
        width:'100%', 
        height:height*0.65, 
    },
    firstSection:{
        height:height*0.12, 
        width:width*.9, 
        flexDirection:'row', 
        alignContent:'center', 
        justifyContent:'space-between', 
        marginHorizontal:width*0.05
    },
    secondSection:{
        height:height*0.1, 
        width:width*.9, 
        backgroundColor:'#fff', 
        elevation:5, 
        borderRadius:10, 
        flexDirection:"row", 
        marginHorizontal:width*0.05, 
        justifyContent:'space-between'
    },
    secondSectionButtons:{
        width:width*0.3, 
        alignItems:'center', 
        justifyContent:'center'
    },
    secondSectionIcon:{
        fontSize:20
    },
    secondSectionText:{
        fontSize:12, 
        color:'#999', 
        fontWeight:'200'
    },
    thirdSection:{
        height:height*0.48,
        width:width*.9,
        marginHorizontal:width*.05,
        backgroundColor:Colors.postBackground, 
        elevation:5, 
        borderRadius:45,
        overflow:'hidden'
    }
})


export default TeamProfile;
