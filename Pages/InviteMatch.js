import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import MapView from "react-native-maps";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Colors from "../Config/Colors";
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;
import Header from '../Components/Header';
import Button from '../Components/Button';

export default class RequestPage extends React.Component{
    state={
        title:"",
        description:"",

    }
    render(){
        var date = new Date().getDate() //Current Date
        var month = new Date().getMonth() //Current Month
        var year = new Date().getFullYear() //Current Year
        return(
            <RN.View style={{flex:1,backgroundColor: Colors.postBackground}}>
                <Header title="Invite match request"/>
                <RN.View style={{flex:8}}>
                    <NB.Form>
                        <NB.Item floatingLabel>
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="users" type="Entypo"/>
                                <RN.Text style={styles.labelStyle}> Title</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.title} onChangeText={(title)=>this.setState({title})}/>
                        </NB.Item>
                        <NB.Item floatingLabel>
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="users" type="Entypo"/>
                                <RN.Text style={styles.labelStyle}> Description</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.description} onChangeText={(description)=>this.setState({description})} />
                        </NB.Item>
                        <NB.Item disabled style={{marginTop:30}}>
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="users" type="Entypo"/>
                                <RN.Text style={styles.labelStyle}> Date</RN.Text>
                            </NB.Label>

                            <NB.DatePicker
                                defaultDate={new Date(year, month, date)}
                                minimumDate={new Date(year, month, date)}
                                maximumDate={new Date(year+1, month, date)}
                                locale={"tr"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"slide"}
                                androidMode={"default"}
                                placeHolderText="Select Match Date"
                                textStyle={{ color: "white" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={this.setDate}
                                disabled={false}
                            />
                        </NB.Item>
                        <NB.Item rounded style={{alignSelf:"center",borderTopRightRadius:width*.15, borderBottomLeftRadius:width*.15,marginTop:30,marginBottom:30}}>
                        <   RN.View style={{width:width*.7, height:height*.22, justifyContent:'center', borderTopRightRadius:width*.15, borderBottomLeftRadius:width*.15, overflow:'hidden'}}>
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
                        </NB.Item>
                    </NB.Form>
                </RN.View>
                <RN.View style={{flex:1,justifyContent:"center" ,marginBottom:20,alignItems:"center"}}>
                    <Button title={"SEND REQUEST"} />
                </RN.View>
            </RN.View>
        )
    }
}

const styles = RN.StyleSheet.create({
    headerFlex:{
        flex:2,
        flexDirection:'row',
        backgroundColor:Colors.backgroundGreen,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    labelStyle:{
        color:'#ccc', 
        fontSize:14, 
        letterSpacing:1.5
    },
    image:{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "green",
    },
})