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





class PlayerProfile extends React.Component{
    render(){
        let data = [{
            "speed": 74,
            "balance": 29,
            "explosives": 40,
            "energy": 40,
            "flexibility": 30,
            "agility": 25,
            "endurance": 44
        }]
        
        let options = {
        width: 290,
        height: 290,
        margin: {
            top: 20,
            left: 20,
            right: 30,
            bottom: 20
        },
        r: 150,
        max: 100,
        fill: "#2980B9",
        stroke: "#2980B9",
        animate: {
            type: 'oneByOne',
            duration: 200
        },
        label: {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: true,
            fill: '#34495E'
        }
        }
        return(
            <RN.View style={{flex:1}}>
                <RN.View style={styles.imageView}>
                    <RN.Image source={{uri:'https://pmcwwd.files.wordpress.com/2019/09/jlo-versace-dress-versace-show-spring-2020-1.jpg'}}
                              style={{width:width, height:height*0.45, resizeMode:'contain', top:-10, left:0, right:0, position:"absolute"}}/>
                </RN.View>
                <RN.View style={styles.infoView}>
                    <RN.View style={{flex:1.5, flexDirection:'row', alignContent:'center'}}>
                        <RN.View style={{flex:2, alignItems:'flex-start', paddingHorizontal:20, justifyContent:'center'}}>
                            <RN.Text style={{fontSize:20, fontWeight:'bold', color:Colors.postBackground}}>Muhammed Furkan</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>Sariyer, Istanbul</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>20 years</RN.Text>
                        </RN.View>
                        <RN.View style={{flex:1, justifyContent:'space-evenly', alignItems:'center'}}>
                            <Button title="EDIT"
                                    containerStyle={{backgroundColor:'#fff', width:width/3 - 50, height:25}}
                                    textStyle={{color:Colors.postBackground, fontSize:10, fontWeight:'600'}}/>
                            <Button title="MANAGE TEAMS"
                                    containerStyle={{backgroundColor:Colors.squadButton, width:width/3 - 50, height:25}}
                                    textStyle={{color:'#fff', fontSize:8, fontWeight:'600'}}/>
                        </RN.View>
                    </RN.View>
                    <RN.View style={{flex:1.2, backgroundColor:'#fff', elevation:5, marginHorizontal:'5%', marginVertical:5, borderRadius:15, flexDirection:"row"}}>
                        <RN.TouchableOpacity style={{flex:1, alignItems:"center", justifyContent:'center'}}>
                            <NB.Icon name="history" type="FontAwesome5" style={{fontSize:16}}/>
                            <RN.Text style={{fontSize:12, color:'#999', fontWeight:'200'}}>Match History</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <NB.Icon name="people" type="MaterialIcons" style={{fontSize:16}}/>
                            <RN.Text style={{fontSize:12, color:'#999', fontWeight:'200'}}>Teams</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                            <NB.Icon name="location-on" type="MaterialIcons" style={{fontSize:16}}/>
                            <RN.Text style={{fontSize:12, color:'#999', fontWeight:'200'}}>Location</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                    <RN.View style={{flex:4.8, backgroundColor:Colors.postBackground, elevation:5, borderRadius:65, marginHorizontal:'5%', marginTop:'3%', marginBottom:'10%'}}>
                        
                    </RN.View>

                </RN.View>
            </RN.View>
        )
    }
}



const styles = RN.StyleSheet.create({
    imageView:{
        zIndex:-1, 
        backgroundColor:"#eee", 
        left:0, 
        right:0, 
        bottom:height*0.55,
        top:0,
        width:'100%', 
        height:height*0.45
    },
    infoView:{
        zIndex:1, 
        elevation:3,
        shadowColor:'black',
        shadowOffset:{
            height:-2,
            width:0
        },
        paddingTop:10,
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
        alignSelf:'flex-end'
    }
})


export default PlayerProfile;
