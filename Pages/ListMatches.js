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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Post extends React.Component{
    getStatusColor(status){
        if(status == "Player Found") return "#FF7575"
        else return "#FFFF75"
    }

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
                    <RN.Text style={{color:'#fff', fontSize:14, letterSpacing:2, fontWeight:'400'}}>{match.title}</RN.Text>
                    <NB.Icon style={{color:'#fff'}} name="chevron-right" type="Entypo"/>
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
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:this.getStatusColor(match.status), letterSpacing:2}}>{match.status}</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.TouchableOpacity>
        )
    }
}

class Application extends React.Component{
    constructor(props){
        super(props);
        this.state={
            status:props.application.status,
        }
    }
    getStatusColor(status){
        if(status == "Accepted") return "#FFFF75"
        else if(status == "Rejected") return "#FF7575"
        else return "#ccc"
    }

    responseAlert(){
        let {application} = this.props;
        let message = `${application.sendername} wants to join your match as a player in position ${application.position} on ${application.date}`;
        RN.Alert.alert('You have a waiting request', message, 
                [{text:'Reject', style:'destructive', onPress:() => this.sendResponse("Rejected")},
                 {text:'Wait', style:'default'},
                 {text:'Accept', style:'default', onPress:() => this.sendResponse("Accepted")}]);
    }

    sendResponse(answer){
        let applicationid = this.props.application.id;
        let applicationRef = Firebase.firestore().collection('matchapplications').doc(applicationid);
        applicationRef.update({
            status:answer
        })
        if(answer == "Accepted"){
            let matchRef = Firebase.firestore().collection("matches").doc(this.props.application.matchid);
            matchRef.update({
                status:"Player Found"
            })
        }

        this.setState({status:answer});
    }

    render(){
        let {application, response} = this.props;
        let {status} = this.state;
        return(
            <RN.TouchableOpacity style={styles.MatchPostView} 
                disabled={!response || status!="Waiting"} 
                onPress={() => this.responseAlert()}>
                <RN.View style={styles.PostHeader}>
                    {response ? 
                        <RN.Text style={{color:'#fff', fontSize:14, letterSpacing:2, fontWeight:'400'}}>{application.sendername} is applied to your post!</RN.Text>
                        :<RN.Text style={{color:'#fff', fontSize:14, letterSpacing:2, fontWeight:'400'}}>{application.position} application to {application.teamname}</RN.Text>}
                </RN.View>  
                <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Date</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Location</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Status</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#eee', letterSpacing:2}}>{application.date}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#eee', letterSpacing:2}}>{application.location}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:this.getStatusColor(status), letterSpacing:2}}>{status}</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.TouchableOpacity>
        )
    }
}

export default class ListMatches extends React.Component{
    state={
        isLeader:false,
        modalVisible:false,
        matches:[],
        applications:[],
        incoming:[],
        loaded:false,
        refresh:false,
        show:"Matches",
    }
    async componentWillMount(){
        await this.isTeamLeader();
        await this.getList();
        await this.getMyApplications();
        await this.getIncomingApplications();
        this.setState({loaded:true})
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
        await this.setState({matches:y, refresh:false});
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
        let applications = [];
        let applicationsRef = Firebase.firestore().collection("matchapplications").where("senderid", "==", Firebase.auth().currentUser.uid);
        let teamRef = Firebase.firestore().collection("teams");
        let matchRef = Firebase.firestore().collection("matches");
        await applicationsRef.get().then(docs => {
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
                await applications.push(application);
            })
        })
        await sleep(1500);
        await this.setState({applications:applications, refresh:false});
    }
    async getIncomingApplications(){
        if(!this.state.isLeader) return; 
        let incoming = [];
        let teamid;
        await Firebase.firestore().collection("teams")
                .where("leaderid", "==", Firebase.auth().currentUser.uid)
                    .get().then(docs => {
                        docs.forEach(doc => {
                            teamid = doc.id;
                        })
                    })
        let incomingRef = Firebase.firestore().collection("matchapplications").where("teamid", "==", teamid);
        await incomingRef.get().then(docs => {
            docs.forEach(async doc => {
                let application = doc.data();
                application.id = doc.id;
                let matchRef = Firebase.firestore().collection("matches").doc(application.matchid);
                await matchRef.get().then(doc => {
                    application.position = doc.data().position;
                    application.date = doc.data().date;
                    application.location = doc.data().location;
                })
                incoming.push(application);
            })
        })
        await sleep(1500);
        await this.setState({incoming:incoming, refresh:false});
    }
    
    render(){
        let {matches, applications, isLeader, show, incoming, loaded} = this.state;
        let sectionWidth = isLeader ? "23.3%" : "35%";
        return(
            <RN.View style={styles.ListMatchesView}>
                <Header title="Matches" plus={this.state.isLeader} plusOnPress={()=>{ this.setState({modalVisible:true})}} 
                        drawer={true} navigation={this.props.navigation}/>
                <RN.View style={{height:height*0.05,flexDirection:"row",marginTop:10,marginBottom:10}}>
                    <Button containerStyle={{width:sectionWidth,padding:0,height:"100%",margin:10}} title="Open" textStyle={{fontSize:12}} onPress={()=>this.setState({show:"Matches"})} />
                    <Button containerStyle={{width:sectionWidth,padding:0,height:"100%",margin:10}} title="Applied" textStyle={{fontSize:12}} onPress={()=>this.setState({show:"Applied"})} />
                    {isLeader && <Button containerStyle={{width:sectionWidth,padding:0,height:"100%",margin:10}} title="Incoming" textStyle={{fontSize:12}} onPress={()=>this.setState({show:"Incoming"})} />}
                    
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

                {loaded && (show == "Matches") && 
                    <RN.FlatList
                        ref={c=>this.matches=c}
                        ListEmptyComponent={()=>{
                            return <Button title={"Fetch"} onPress={()=>{
                                this.matches.props.onRefresh()
                            }} containerStyle={{backgroundColor:"#24a0ed",height:80,width:80,marginTop:20,borderRadius:200}} />
                        }}
                        refreshing={this.state.refresh}
                        onRefresh={async ()=>{await this.setState({refresh:true}); await this.getList();}}
                        data={matches}
                        renderItem={(item) => <Post match = {item.item} navigation={this.props.navigation}/>}
                        keyExtractor={(item) => item.id}/>}
                
                {loaded && (show == "Applied") && 
                    <RN.FlatList
                        ref={c=>this.applied=c}
                        ListEmptyComponent={()=>{
                            return <Button title={"Fetch"} onPress={()=>{
                                this.applied.props.onRefresh()
                            }} containerStyle={{backgroundColor:"#24a0ed",height:80,width:80,marginTop:20,borderRadius:200}} />
                        }}
                        refreshing={this.state.refresh}
                        onRefresh={async ()=>{await this.setState({refresh:true}); await this.getMyApplications();}}
                        data={applications}
                        renderItem={(item) =>  <Application application={item.item} navigation={this.props.navigation}/>}
                        keyExtractor={(item) => item.id}/>}

                {loaded && (show == "Incoming") && 
                    <RN.FlatList
                        ref={c=>this.incoming=c}
                        ListEmptyComponent={()=>{
                            return <Button title={"Fetch"} onPress={()=>{
                                this.incoming.props.onRefresh()
                            }} containerStyle={{backgroundColor:"#24a0ed",height:80,width:80,marginTop:20,borderRadius:200}} />
                        }}
                        refreshing={this.state.refresh}
                        onRefresh={async ()=>{await this.setState({refresh:true}); await this.getIncomingApplications();}}
                        data={incoming}
                        renderItem={(item) =>  <Application application={item.item} response={true} navigation={this.props.navigation}/>}
                        keyExtractor={(item) => item.id}/>}
                {!loaded && (show == "Matches") &&
                    <Loading extra={true} extraText="Available match list will be available in a few seconds"/>}
                
                {!loaded && (show == "Applied") &&
                    <Loading extra={true} extraText="Application list will be available in a few seconds"/>}
                
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