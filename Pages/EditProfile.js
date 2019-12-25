import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import MapView, { AnimatedRegion } from "react-native-maps";
import * as NB from "native-base";
import Firebase from '../Config/Firebase';
import * as firebase from 'firebase';
import Header from '../Components/Header';
import Button from '../Components/Button';
import Colors from '../Config/Colors';
require('firebase/firestore');

export default class editProfile extends React.Component{
    state={
        user:{},
        username:"",
        age:null,
        fullname:"",
    }
    async componentWillMount(){
        await this.getUser();
    }
    async pushUpdate(){

        let that=this
        userRef=Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid)
        await userRef.update({
            username:that.state.username,
            age:that.state.age,
            fullname:that.state.fullname,
        })
        RN.Alert.alert("Profile Updated","Your changes will update on restart.")
        that.props.navigation.pop()
    }
    async deletePlayer(s){
        
        if(s=="x"){
            await Firebase.auth().currentUser.delete()
            await RN.Alert.alert("Your account has been deleted.")
        }

    }
    async getUser(){
        let x={}
        let userRef=Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid)
        await userRef.get().then(doc=>{
            x=doc.data()
            x.email=Firebase.auth().currentUser.email
        })
        await this.setState({user:x,username:x.username,age:x.age,fullname:x.fullname})
    }
    render(){
        return(
            <RN.View style={{flex:1,backgroundColor:Colors.postBackground}}>
                <Header plusOnPress={()=>this.pushUpdate()} plus={true} title={"Edit Profile"} navigation={this.props.navigation}/>
                <RN.View style={{flex:8,paddingHorizontal:20}}>
                    <NB.Item floatingLabel style={{margin:10}}>
                        <NB.Label >
                            <NB.Icon style={{fontSize:20,color:"#ccc"}} name="users" type="Entypo"/>
                            <RN.Text style={{}}>  Full Name</RN.Text>
                        </NB.Label>
                        <NB.Input disabled={false} style={{fontSize:18,color:"white"}} value={this.state.fullname} onChangeText={(fullname)=>{this.setState({fullname})}}/>
                    </NB.Item>
                    <NB.Item disabled style={{margin:10}}>
                        <NB.Label >
                            <NB.Icon style={{fontSize:20,color:"#ccc"}} name="mail" type="Entypo"/>
                            <RN.Text style={{}}>  Email</RN.Text>
                        </NB.Label>
                        <NB.Input disabled={true} style={{fontSize:18,color:"white"}} value={this.state.user.email}/>
                    </NB.Item>
                    <NB.Item floatingLabel style={{margin:10}}>
                        <NB.Label >
                            <NB.Icon style={{fontSize:20,color:"#ccc"}} name="user" type="Entypo"/>
                            <RN.Text style={{}}>  Username</RN.Text>
                        </NB.Label>
                        <NB.Input disabled={false} style={{fontSize:18,color:"white"}} value={this.state.username} onChangeText={(username)=>{this.setState({username})}}/>
                    </NB.Item>
                    <NB.Item floatingLabel style={{margin:10}}>
                        <NB.Label >
                            <NB.Icon style={{fontSize:20,color:"#ccc"}} name="calendar" type="Entypo"/>
                            <RN.Text style={{}}>  Age</RN.Text>
                        </NB.Label>
                        <NB.Input disabled={false} style={{fontSize:18,color:"white"}} value={this.state.age} onChangeText={(age)=>{this.setState({age})}}/>
                    </NB.Item>
                </RN.View>
                <Button onPress={()=>{
                    RN.Alert.alert('WARNING', "You are near to delete your account. Are your sure?", 
                    [{text:'Reject', style:'default', onPress:() => this.deletePlayer("Rejected")},
                     {text:'Accept', style:'destructive', onPress:() => this.deletePlayer("x")}]);
            
                }} title={"DELETE PROFILE"} textStyle={{fontSize:17.6,fontWeight:"500",letterSpacing:1.25}} containerStyle={{backgroundColor:"#ff4b5b",margin:30,alignSelf:"center",width:"70%"}}/>
            </RN.View>
        )
    }
}