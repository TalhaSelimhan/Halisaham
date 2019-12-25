import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import MapView from "react-native-maps";
import * as NB from "native-base";
import Button from '../Components/Button'
import Constants from 'expo-constants';
import Colors from "../Config/Colors";
import Header from "../Components/Header";
import TeamProfile from './TeamProfile';
import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation";
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;
import Firebase from '../Config/Firebase';
import Loading from '../Components/Loading';
require('firebase/firestore');


class Request extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            request:props.request,
        }
    }
    getStatusColor(status){
        if(status == "Accepted") return "#FFFF75"
        else if(status == "Rejected") return "#FF7575"
    }
    sendResponse(status){
        let requestid = this.state.request.id;
        let requestRef = Firebase.firestore().collection('matchrequests').doc(requestid);
        requestRef.update({
            status:status
        })
        this.setState({request:{...this.state.request, status:status}});
    }
    changeStatus(){
        let {request} = this.state;
        let message = `${request.teamname} wants to challange with you at ${request.date}. ${request.title} ${request.description}`;
        RN.Alert.alert('You have a waiting request', message, 
                [{text:'Reject', style:'destructive', onPress:() => this.sendResponse("Rejected")},
                 {text:'Wait', style:'default'},
                 {text:'Accept', style:'default', onPress:() => this.sendResponse("Accepted")}]);
        
    }
    render(){
        var {request} = this.state;
        return(
            <RN.TouchableOpacity style={styles.FieldRowView} onPress={() => {if(request.status == "Waiting"&&this.props.checker=="true") this.changeStatus();}}>
                <RN.View style={styles.FieldHeader}>
                    {this.props.checker=="true"?<RN.Text style={styles.FieldHeaderText}>Request From {request.teamname}</RN.Text>:
                    <RN.Text style={styles.FieldHeaderText}>Request To {request.opponentname}</RN.Text>
                    }
                </RN.View>  
                <RN.View style={styles.InfoField}>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={styles.InfoLabel}>Date</RN.Text>
                        <RN.Text style={styles.InfoLabel}>Title</RN.Text>
                        <RN.Text style={styles.InfoLabel}>Status</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={styles.InfoText}>{request.date}</RN.Text>
                        <RN.Text style={styles.InfoText}>{request.title}</RN.Text>
                        <RN.Text style={{...styles.InfoText, color:this.getStatusColor(request.status)}}>{request.status}</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.TouchableOpacity>
        )
    }
}

export default class ListRequests extends React.Component{
    state={
        requests:[],
        loaded:false,
        refresh:false,
        sended:[],
        checker:"true",
    }
    async loadRequests(){
        let that = this;
        let requests = [];
        let teamid = null;
        let teamRef = Firebase.firestore().collection('teams').where('leaderid', '==', Firebase.auth().currentUser.uid);
        let y=[];
        
        await teamRef.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                teamid = doc.id;
            })
        })
        let sendedRef=Firebase.firestore().collection('matchrequests').where("teamid","==",teamid);
        sendedRef.get().then(snapshot=>{
            snapshot.docs.forEach(doc=>{
                let x = doc.data()
                y.push(x)
            })
        }).then(()=> that.setState({sended:y}))
        let requestRef = Firebase.firestore().collection('matchrequests').where('opponentid', '==', teamid);
        requestRef.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let request = doc.data();
                request.id = doc.id;
                requests.push(request);
            })
        }).then(() => that.setState({requests:requests,refresh:false, loaded:true}))
    }
    async componentWillMount(){
        await this.loadRequests();
    }
    render(){
        let {requests, loaded,sended} = this.state;
        if(!loaded) return <Loading extra={true} extraText="Your requests are on way!"/>
        return(
            <RN.View style={styles.FieldsListView}>
                <Header title="Requests" navigation={this.props.navigation} drawer={true}/>
                <RN.View style={{height:height*0.05,flexDirection:"row",marginTop:10,marginBottom:10}}>
                    <Button containerStyle={{width:"35%",padding:0,height:"100%",margin:10}} title="Incoming" onPress={()=>{this.setState({checker:"true"});this.listx.props.onRefresh()}} />
                    <Button containerStyle={{width:"35%",padding:0,height:"100%",margin:10}} title="Sent" onPress={()=>{this.setState({checker:"false"});this.listx.props.onRefresh()}} />
                </RN.View>
                <RN.FlatList 
                    ref={c=>this.listx=c}
                    refreshing={this.state.refresh}
                    onRefresh={async ()=>{
                        await this.setState({refresh:true})
                        await this.loadRequests()
                    }}
                    
                    data={this.state.checker=="true"?requests:sended}
                    renderItem={item => <Request checker={this.state.checker} request={item.item}/>}
                    keyExtractor={item => item.id}
                />
            </RN.View>
        )
    }
}





const styles = RN.StyleSheet.create({
    FieldRowView:{
        height:height*.2, 
        width:width*.9, 
        backgroundColor:"#2a804b", 
        marginVertical:5,
        overflow:'hidden',
        borderRadius:20,
        marginTop:15
    },
    FieldHeader:{
        flex:3, 
        backgroundColor:'#1d6639', 
        overflow:'hidden', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        paddingHorizontal:5
    },
    FieldHeaderText:{
        color:'#fff', 
        fontSize:16, 
        letterSpacing:2, 
        fontWeight:'500', 
        marginHorizontal:5
    },
    InfoField:{
        flex:5, 
        flexDirection:'row', 
        alignContent:'center', 
        alignItems:'center', 
        padding:10,    
    },
    InfoLabel:{
        fontSize:12,
        fontWeight:'600', 
        color:'#fff', 
        letterSpacing:2
    },
    InfoText:{
        fontSize:12,
        fontWeight:'300', 
        color:'#eee', 
        letterSpacing:2,
        textAlign:'right'
    },
    FieldsListView:{
        width:width, 
        height:height, 
        backgroundColor:Colors.postBackground, 
        alignItems:'center', 
    },
    FieldsListHeader:{
        height:height*.2, 
        width:width, 
        alignItems:'center', 
        justifyContent:'center', 
        padding:5
    },
    FieldsListText:{
        fontSize:24, 
        color:'#fff', 
        elevation:4, 
        shadowColor:'black', 
        shadowOpacity:.9, 
        shadowOffset:{width:0, height:2}, 
        letterSpacing:2, 
        fontWeight:'800'
    },
})