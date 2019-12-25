import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Header from "../Components/Header";
import Colors from "../Config/Colors";
import CreateMatchPost from './CreateMatchPost';
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;
import Loading from '../Components/Loading';
import Firebase from "../Config/Firebase";
require('firebase/firestore');


class Post extends React.Component{
    render(){
        var {match} = this.props;
        return(
            <RN.View style={styles.MatchPostView}>
                <RN.View style={styles.PostHeader}>
                    <RN.Text style={{color:'#ccc', fontSize:16, letterSpacing:2, fontWeight:'500'}}>{match.title}</RN.Text>
                    <NB.Icon style={{color:'#ccc'}} name="chevron-right" type="Entypo"/>
                </RN.View>  
                <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Position</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Date</RN.Text>
                        <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Contact</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{match.position}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{match.date}</RN.Text>
                        <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{match.contact}</RN.Text>
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
        loaded:false,
        refresh:false,
    }
    componentWillMount(){
        this.isTeamLeader();
        this.getList();
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
    render(){
        let {matches} = this.state;
        return(
            <RN.View style={styles.ListMatchesView}>
                <Header title="Matches" plus={this.state.isLeader} plusOnPress={
                    ()=>{ 
                        this.setState({modalVisible:true})
                    }
                } drawer={true} navigation={this.props.navigation}/>
                <RNE.Overlay
                    isVisible={this.state.modalVisible} 
                    windowBackgroundColor="rgba(255, 255, 255, .8)"
                    overlayStyle={{backgroundColor:Colors.postBackground, width:width*0.9, height:height*.5, borderRadius:width*.1, overflow:'hidden'}}
                    containerStyle={{width:width, height:height, flex:1}}
                    animationType="fade"
                    animated={true}
                    onBackdropPress={() => this.setState({modalVisible: false})}>
                        <CreateMatchPost/>
                </RNE.Overlay>
                    {this.state.loaded ? <RN.FlatList
                        refreshing={this.state.refresh}
                        onRefresh={async ()=>{
                            await this.setState({refresh:true})
                            await this.getList()
                        }}
                        data={matches}
                        renderItem={(item) =>  <Post match = {item.item} navigation={this.props.navigation}/>}
                        keyExtractor={(item) => item.id}
                    /> : <Loading extra={true} extraText="Match list will be available in a few seconds"/>}
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