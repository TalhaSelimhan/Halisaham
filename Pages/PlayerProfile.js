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
                              style={{width:width, height:height*0.45, resizeMode:'cover', left:0, right:0, position:"absolute"}}/>
                </RN.View>
                <RN.View style={styles.infoView}>
                    <RN.View style={styles.firstSection}>
                        <RN.View style={{width:width*0.70, alignItems:'flex-start', justifyContent:'center'}}>
                            <RN.Text style={{fontSize:20, fontWeight:'bold', color:Colors.postBackground}}>mfsilay</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>Muhammed Furkan, 20</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>Sariyer, Istanbul</RN.Text>
                        </RN.View>
                        <RN.View style={{width:width*0.20, justifyContent:'space-around'}}>
                            <Button title="EDIT"
                                    containerStyle={{backgroundColor:'#fff', width:width*0.20, height:height*0.04}}
                                    textStyle={{color:Colors.postBackground, fontSize:10, fontWeight:'600'}}/>
                            <Button title="INVITE"
                                    containerStyle={{backgroundColor:Colors.squadButton, width:width*0.20, height:height*0.04}}
                                    textStyle={{color:'#fff', fontSize:10, fontWeight:'600'}}/>
                        </RN.View>
                    </RN.View>
                    <RN.View style={styles.secondSection}>
                        <RN.TouchableOpacity style={styles.secondSectionButtons}>
                            <NB.Icon name="ios-stats" type="Ionicons" style={styles.secondSectionIcon}/>
                            <RN.Text style={styles.secondSectionText}>Stats</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={styles.secondSectionButtons}>
                            <NB.Icon name="history" type="FontAwesome5" style={styles.secondSectionIcon}/>
                            <RN.Text style={styles.secondSectionText}>Match History</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={styles.secondSectionButtons}>
                            <NB.Icon name="people" type="MaterialIcons" style={styles.secondSectionIcon}/>
                            <RN.Text style={styles.secondSectionText}>Teams</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                    <RN.View style={styles.thirdSection}>
                        
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
        height:height*0.38,
        width:width*.9,
        marginHorizontal:width*.05,
        backgroundColor:Colors.postBackground, 
        elevation:5, 
        borderRadius:45
    }
})


export default PlayerProfile;
