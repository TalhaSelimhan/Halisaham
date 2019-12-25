import React from "react";
import {View,Text,Alert} from "react-native";
import Button from '../Components/Button';
import * as RNE from "react-native-elements";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Header from "../Components/Header";
import Colors from "../Config/Colors";
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;
import Loading from '../Components/Loading';
import Firebase from "../Config/Firebase";
import { firestore, auth } from "firebase";
require('firebase/firestore');


export default class overlayke extends React.Component{
    state={
        title:"",
        distinct:"",
        date: new Date(),
        position:"",
    }
    async createRequest(){
        let that=this;
        let that2 = this.props.that;
        let team={}
        await Firebase.firestore().collection("teams").where("leaderid","==",Firebase.auth().currentUser.uid).get().then(docs=>docs.forEach(doc=>{
            team=doc.data();
            team.id = doc.id;
        }))
        requestRef=Firebase.firestore().collection("matches")
        await requestRef.add({
            title: that.state.title,
            location: that.state.distinct + " / Istanbul",
            position: that.state.position, 
            date:that.state.date.toISOString().slice(0,10),
            contact:team.contact,
            teamid:team.id,
            status:"Applicable"
        })
        Alert.alert("Success!", "Your match post is created");
        that2.setState({modalVisible:false});
    }

    render(){
        var date = new Date().getDate() //Current Date
        var month = new Date().getMonth() //Current Month
        var year = new Date().getFullYear() //Current Year    
        return(
            <View style={{flex:1,backgroundColor:Colors.postBackground,alignContent:"center",justifyContent:"center",paddingHorizontal:20}}>
                <NB.Item floatingLabel style={{marginBottom:13}}>
                    <NB.Label>
                        <Text>Title</Text>
                    </NB.Label>
                    <NB.Input style={{fontSize:18,color:"white"}} value={this.state.title} onChangeText={(title)=>this.setState({title})} autoCapitalize="none" autoCompleteType="username"/>
                </NB.Item>
                <NB.Item floatingLabel style={{marginBottom:13}}>
                    <NB.Label>
                        <Text>Distinct</Text>
                    </NB.Label>
                    <NB.Input style={{fontSize:18,color:"white"}} value={this.state.distinct} onChangeText={(distinct)=>this.setState({distinct})} autoCapitalize="none" autoCompleteType="username"/>
                </NB.Item>
                <NB.Item floatingLabel style={{marginBottom:13}}>
                    <NB.Label>
                        <Text>Position</Text>
                    </NB.Label>
                    <NB.Input style={{fontSize:18,color:"white"}} value={this.state.position} onChangeText={(position)=>this.setState({position})} autoCapitalize="none" autoCompleteType="username"/>
                </NB.Item>
                <NB.Item disabled style={{marginTop:30}}>
                    <NB.Label>
                        <NB.Icon style={{fontSize:20,color:"#ccc"}} name="calendar" type="Entypo"/>
                    </NB.Label>
                    <NB.DatePicker
                        defaultDate={new Date(year, month, date)}
                        minimumDate={new Date(year-2, month, date)}
                        maximumDate={new Date(year+2, month, date)}
                        locale={"tr"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Select Match Date"
                        textStyle={{ color: "white" }}
                        placeHolderTextStyle={{ color: "#d3d3d3" }}
                        onDateChange={(date) => this.setState({date:date})}
                        disabled={false}
                    />
                </NB.Item>
                <Button title="Send Request" containerStyle={{width:'100%',marginTop:20}} onPress={()=>this.createRequest()} />
            </View>
        )
    }
}