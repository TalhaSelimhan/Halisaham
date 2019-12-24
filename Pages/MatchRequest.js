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
import ModalDropdown from 'react-native-modal-dropdown';
import Firebase from '../Config/Firebase';
require('firebase/firestore');

export default class RequestPage extends React.Component{
    state={
        date:"",
        title:"",
        description:"",
        areas:[],
        loaded:false,
        options:[],
        selectedArea:"",
        opponentID:"",
        opponentName:"",
        team:{},
        loaded:false,
    }
    
    createRequest(){
        var requestRef = Firebase.firestore().collection('matchrequests');
        requestRef.add({
            date:this.state.date.toISOString().slice(0,10),
            description:this.state.description,
            opponentid:this.state.opponentID,
            teamid:this.state.team.id,
            opponentname:this.state.opponentName,
            teamname:this.state.team.name,
            title:this.state.title,
            status:"Waiting",
        })
    }
    async currentTeam (){ 
        let that =this
        Firebase.firestore().collection("teams").where("leaderid","==",Firebase.auth().currentUser.uid).get().then(docs=>docs.forEach(doc=>{
            that.setState({team:doc.data()});
            that.setState({team:{...this.state.team,id:doc.id}})
    }))
    }
    async componentWillMount(){
        await this.currentTeam();
        this.setState({opponentID:this.props.navigation.getParam("toChallengeId")})
        this.setState({opponentName:this.props.navigation.getParam("toChallengeName"),loaded:true})
    }

    render(){
        var date = new Date().getDate() //Current Date
        var month = new Date().getMonth() //Current Month
        var year = new Date().getFullYear() //Current Year
        if(!this.state.loaded) return <RN.View></RN.View>
        return(
            <RN.View style={{flex:1,backgroundColor: Colors.postBackground}}>
                <Header title="Create a New Request" navigation={this.props.navigation}/>
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
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="clock" type="Entypo"/>
                                <RN.Text style={styles.labelStyle}> Date</RN.Text>
                            </NB.Label>
                            <NB.DatePicker
                                defaultDate={new Date(year, month, date)}
                                minimumDate={new Date(year-2, month, date)}
                                maximumDate={new Date(year+2, month, date)}
                                locale={"tr"}
                                timeZoneOffsetInMinutes={undefined}
                                modalTransparent={false}
                                animationType={"slide"}
                                androidMode={"default"}
                                placeHolderText="Select Match Date"
                                textStyle={{ color: "white" }}
                                placeHolderTextStyle={{ color: "#d3d3d3" }}
                                onDateChange={(date)=>this.setState({date})}
                                disabled={false}
                            />
                        </NB.Item>
                    </NB.Form>
                </RN.View>
                <RN.View style={{flex:1,justifyContent:"center" ,marginBottom:20,alignItems:"center"}}>
                    <Button title={"CREATE REQUEST"} onPress={()=>this.createRequest()} />
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