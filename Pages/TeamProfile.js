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
import TeamMatchHistory from './TeamMatchHistory';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import TeamSquad from './TeamSquad';
import Firebase from "../Config/Firebase";
import MatchRequest from "./MatchRequest";
import Loading from '../Components/Loading';
require('firebase/firestore');


class TeamProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:1,
            teamdata:{},
            drawerci:true,
            challenge:true,
        }
    }
    async loadTeam(uid){
        
        let that = this;
        if(uid==undefined){
            let teamxRef = Firebase.firestore().collection('teams').where("leaderid","==",Firebase.auth().currentUser.uid);
            teamxRef.get().then(snapshots=>{snapshots.docs.forEach(
                async doc=>{
                    if(doc.exists){
                        await that.setState({teamdata:doc.data(),challenge:false,drawerci:false})
                        await that.setState({teamdata:{...this.state.teamdata,id:doc.id}})
                    }
                }
            )})
            return
        }
        let teamsRef = Firebase.firestore().collection('teams').doc(uid);
        teamsRef.get().then(async doc => {
            if(doc.exists){
                await that.setState({teamdata:doc.data()})
                await that.setState({teamdata:{...this.state.teamdata,id:doc.id}})
                if(that.state.teamdata.leaderid==Firebase.auth().currentUser.uid) await that.setState({challenge:false})
            }
        })
    }

    async componentWillMount(){
        await this.loadTeam(this.props.navigation.getParam('uid'));
    }
    render(){
        let {teamdata} = this.state;
        let {navigation} = this.props;
        return(
            <RN.View style={{flex:1}}>
                <RN.View style={styles.imageView}>
                    <RN.Image source={{uri:teamdata.photourl}}
                              style={{width:width, height:height*0.45, resizeMode:'cover', left:0, right:0, position:"absolute"}}/>
                    {this.state.drawerci==1?
                    <RN.TouchableOpacity onPress={()=> this.props.navigation.pop()} style={{width:40, height:40, top:height*.05, left:width*.05}}>
                        <NB.Icon name="chevron-left" type="Entypo" style={{color:'#111'}}/>
                    </RN.TouchableOpacity>:
                    <RN.TouchableOpacity onPress={this.props.navigation.openDrawer} style={{width:40, height:40, top:height*.05, left:width*.05}}>
                    <NB.Icon name="menu" type="Feather" style={{color:'#111'}}/>
                </RN.TouchableOpacity>}
                </RN.View>
                <RN.View style={styles.infoView}>
                    <RN.View style={styles.firstSection}>
                        <RN.View style={{width:width*0.60, alignItems:'flex-start', justifyContent:'center'}}>
                            <RN.Text style={{fontSize:20, fontWeight:'bold', color:Colors.postBackground}}>{teamdata.name}</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>{teamdata.city}</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>{teamdata.shortname}</RN.Text>
                        </RN.View>
                        <RN.View style={{width:width*0.30, justifyContent:'space-around'}}>
                            <Button title="CHALLENGE"
                                    disabled={!this.state.challenge}
                                    onPress={() => navigation.navigate('ChallengePage', {toChallengeId:teamdata.id, toChallengeName:teamdata.name})}
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


const TeamStack = createStackNavigator({
    TeamProfile:{
        screen:TeamProfile,
        navigationOptions:{
            header:null
        }
    },
    ChallengePage:{
        screen:MatchRequest,
        navigationOptions:{
            header:null
        }
    }
})

export default createAppContainer(TeamStack);



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
