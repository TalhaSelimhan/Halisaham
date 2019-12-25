import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Header from "../Components/Header";
import Button from "../Components/Button";
import Colors from "../Config/Colors";
import CreateMatchPost from './CreateMatchPost';
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;
import Loading from '../Components/Loading';
import Firebase from "../Config/Firebase";
import * as firebase from "firebase";
require('firebase/firestore');


class Post extends React.Component{
    async applyAlert(){
        let {match} = this.props
        let checkerRef = Firebase.firestore().collection("matchapplications").where("matchid", "==", match.id).where("senderid", "==", Firebase.auth().currentUser.uid)
        let applied = false;
        await checkerRef.get().then(docs => {
            docs.forEach(doc => {
                if(doc.exists){
                    RN.Alert.alert("Oopss", "You have already applied for this match!");
                    applied = true;
                }
            })
        })
        if(!applied){
            RN.Alert.alert("Applying for this match", "Do you really want to apply for this position?", 
                        [{text:"No", style:"destructive"},
                         {text:"Yes, I'm in", onPress:() => this.applyRequest()}])
        }
    }
    applyRequest(){
        let {match} = this.props;
        let requestRef = Firebase.firestore().collection("matchapplications");
        requestRef.add({
            matchid:match.id,
            teamid:match.teamid,
            senderid:Firebase.auth().currentUser.uid,
            sendername:Firebase.auth().currentUser.displayName,
            status:"Waiting"
        })
        RN.Alert.alert("Success!", "Your application is sent to team leader, wait for response")
    }
    render(){
        var {match} = this.props;
        return(
            <RN.TouchableOpacity style={styles.MatchPostView} onPress={async () => await this.applyAlert()}>
                <RN.View style={styles.PostHeader}>
                    <RN.Text style={{color:'#ccc', fontSize:16, letterSpacing:2, fontWeight:'500'}}>{match.title}</RN.Text>
                    <NB.Icon style={{color:'#ccc'}} name="chevron-right" type="Entypo"/>
                </RN.View>  
                <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Position</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Date</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Contact</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Status</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{match.position}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{match.date}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{match.contact}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{match.status}</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.TouchableOpacity>
        )
    }
}

class Application extends React.Component{
    render(){
        var {application} = this.props;
        return(
            <RN.View style={styles.MatchPostView}>
                <RN.View style={styles.PostHeader}>
                    <RN.Text style={{color:'#ccc', fontSize:16, letterSpacing:2, fontWeight:'500'}}>{application.position} application to {application.teamname}</RN.Text>
                </RN.View>  
                <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Date</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Location</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Status</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{application.date}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{application.location}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{application.status}</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.View>
        )
    }
}

export default class ListMatches extends React.Component{
    state={
        isLeader:false,
        modalVisible:false,
        matches:[],
        applications:[],
        loaded:false,
        refresh:false,
        show:"Matches",
    }
    componentWillMount(){
        this.isTeamLeader();
        this.getList();
        this.getMyApplications();
    }
    async getList(){
        let that = this;
        let y = [];
        let matchRef = Firebase.firestore().collection('matches');
        await matchRef.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let match = doc.data();
                match.id = doc.id;
                y.push(match);
            })
        })
        await this.setState({matches:y, loaded:true,refresh:false});
    }
    async isTeamLeader(){
    let teamRef = Firebase.firestore().collection('users').doc(Firebase.auth().currentUser.uid);
        let teamid={}
        await teamRef.get().then(docs => {
            teamid=docs.data()
        });
        this.setState({isLeader:teamid.hasteam})
    }
    async getMyApplications(){
        let that = this;
        that.setState({loaded:false});
        let applications = [];
        let applicationsRef = Firebase.firestore().collection("matchapplications").where("senderid", "==", Firebase.auth().currentUser.uid);
        let teamRef = Firebase.firestore().collection("teams");
        let matchRef = Firebase.firestore().collection("matches");
        applicationsRef.get().then(docs => {
            docs.forEach(async (doc) => {
                let application = doc.data();
                application.id = doc.id;
                let tRef = teamRef.where(firebase.firestore.FieldPath.documentId(), "==", application.teamid);
                await tRef.get().then(docs => {
                    docs.forEach(doc => {
                        application.teamname = doc.data().name;
                    })
                })
                let mRef = matchRef.where(firebase.firestore.FieldPath.documentId(), "==", application.matchid);
                await mRef.get().then(docs => {
                    docs.forEach(doc => {
                        application.date=doc.data().date;
                        application.position = doc.data().position;
                        application.location = doc.data().location;
                    })
                })
                applications.push(application); 
            })
        }).then(() => that.setState({applications:applications, loaded:true}));
    }
    
    render(){
        let {matches, applications} = this.state;
        return(
            <RN.View style={styles.ListMatchesView}>
                <Header title="Matches" plus={this.state.isLeader} plusOnPress={()=>{ this.setState({modalVisible:true})}} 
                        drawer={true} navigation={this.props.navigation}/>
                <RN.View style={{height:height*0.05,flexDirection:"row",marginTop:10,marginBottom:10}}>
                    <Button containerStyle={{width:"35%",padding:0,height:"100%",margin:10}} title="Applicable" onPress={()=>this.setState({show:"Matches"})} />
                    <Button containerStyle={{width:"35%",padding:0,height:"100%",margin:10}} title="Applied" onPress={()=>this.setState({show:"Applied"})} />
                </RN.View>
                <RNE.Overlay
                    isVisible={this.state.modalVisible} 
                    windowBackgroundColor="rgba(255, 255, 255, .8)"
                    overlayStyle={{backgroundColor:Colors.postBackground, width:width*0.9, height:height*.7, borderRadius:width*.1, overflow:'hidden'}}
                    containerStyle={{width:width, height:height, flex:1}}
                    animationType="fade"
                    animated={true}
                    onBackdropPress={() => this.setState({modalVisible: false})}>
                        <CreateMatchPost that={this}/>
                </RNE.Overlay>
                {this.state.loaded ? 
                    (this.state.show != "Matches") ?
                    <RN.FlatList
                        refreshing={this.state.refresh}
                        onRefresh={async ()=>{await this.setState({refresh:true}); await this.getMyApplications();}}
                        data={applications}
                        renderItem={(item) =>  <Application application={item.item} navigation={this.props.navigation}/>}
                        keyExtractor={(item) => item.id}/> 
                    :<RN.FlatList
                        refreshing={this.state.refresh}
                        onRefresh={async ()=>{await this.setState({refresh:true}); await this.getList();}}
                        data={matches}
                        renderItem={(item) =>  <Post match = {item.item} navigation={this.props.navigation}/>}
                        keyExtractor={(item) => item.id}/> 
                        :<Loading extra={true} extraText="Match list will be available in a few seconds"/>}
            </RN.View>
        )
    }
}


const styles = RN.StyleSheet.create({
    MatchPostView:{
        height:height*.2, 
        width:width*.9, 
        backgroundColor:"#2a804b", 
        marginVertical:5,
        overflow:'hidden',
        borderRadius:20,
        marginTop:15,
    },
    PostHeader:{
        flex:3, 
        backgroundColor:'#1d6639', 
        overflow:'hidden', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        paddingHorizontal:5
    },
    ListMatchesView:{
        width:width, 
        height:height, 
        backgroundColor:Colors.backgroundGreen, 
        alignItems:'center', 

        backgroundColor:Colors.postBackground
    }
})