import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
const Window = RN.Dimensions.get("window");
const Screen = RN.Dimensions.get("screen");
const height = Window.height;
const width = Window.width;
import * as Rating from "react-native-ratings";
import MatchHistory from './MatchHistory';
import PlayerTeams from './PlayerTeams';
import PlayerStats from "./PlayerStats";
import MapView from "react-native-maps";





class AreaInfo extends React.Component{
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
                    <RN.Image source={{uri:'https://www.italian-traditions.com/wp-content/uploads/2016/08/stadio-san-paolo-napoli.jpg'}}
                              style={{width:width, height:height*0.45, resizeMode:'cover', left:0, right:0, position:"absolute"}}/>
                </RN.View>
                <RN.View style={styles.infoView}>
                    <RN.View style={styles.firstSection}>
                        <RN.View style={{width:width*0.65, alignItems:'flex-start', justifyContent:'center'}}>
                            <RN.Text style={{fontSize:20, fontWeight:'bold', color:Colors.postBackground}}>Stadio San Paolo</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>Naples, Italy</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>4 km away</RN.Text>
                        </RN.View>
                        <RN.View style={{width:width*0.25, justifyContent:'center'}}>
                            <Button title="RESERVE"
                                    containerStyle={{backgroundColor:'#fff', width:width*0.25, height:height*0.04}}
                                    textStyle={{color:Colors.postBackground, fontSize:10, fontWeight:'600'}}/>
                            <RN.View>
                                <RN.Text style={{fontSize:16, fontWeight:'600', color:'#fff', textAlign:'center'}}>50$ / Hour</RN.Text>
                            </RN.View>                                                       
                        </RN.View>
                    </RN.View>
                    <RN.View style={styles.secondSection}>
                        <Rating.AirbnbRating
                            defaultRating={2}
                            isDisabled={true}
                            showRating={false}
                        />
                        <RN.Text style={{textAlign:'center', fontSize:14, fontWeight:'400', color:Colors.headerText}}>725 reviews</RN.Text>
                    </RN.View>
                    <RN.TouchableOpacity style={styles.thirdSection}>
                        <RN.View style={{width:width*.8, height:height*.08, flexDirection:'row', justifyContent:'space-around'}}>
                            <NB.Icon name="location" type="Entypo" style={{fontSize:18, color:Colors.postSubText}}/>
                            <RN.Text style={{color:Colors.postText, fontSize:18, fontWeight:'700', textAlign:'center'}}>Location</RN.Text>
                            <NB.Icon name="ios-arrow-forward" type="Ionicons" style={{fontSize:18, color:Colors.postSubText, textAlign:'center'}}/>
                        </RN.View>
                        <RN.View style={{width:width*.7, height:height*.22, justifyContent:'center', borderTopRightRadius:width*.15, borderBottomLeftRadius:width*.15, overflow:'hidden'}}>
                            <MapView  style={{height:height*.22, width:width*.7}} 
                                        pointerEvents="none"
                                        initialRegion={{
                                            latitude: 40.8279365,
                                            longitude: 14.1930611,
                                            latitudeDelta: 0.010,
                                            longitudeDelta: 0.010,
                                        }}
                            />
                        </RN.View>
                    </RN.TouchableOpacity>

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
        height:height*.1,
        width:width*.9,
        alignContent:'center',
        justifyContent:'center',
        marginHorizontal:width*.05
    },
    thirdSection:{
        height:height*0.34,
        width:width*.9,
        marginHorizontal:width*.05,
        marginVertical:height*0.02,
        backgroundColor:Colors.postBackground, 
        elevation:5, 
        borderRadius:45,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center'
    }
})


export default AreaInfo;
