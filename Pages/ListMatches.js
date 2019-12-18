import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Colors from "../Config/Colors";
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;


class MatchPost extends React.Component{
    render(){
        var {post} = this.props;
        var labels = post.type == 0 ? ['Position'] : ['Team'];
        var infos = post.type == 0 ? [post.position] : [post.team];
        labels.push('Location', 'Date');
        infos.push(post.location, post.date);
        return(
            <RN.View style={styles.MatchPostView}>
                <RN.View style={styles.PostHeader}>
                    <RN.Text style={{color:'#ccc', fontSize:16, letterSpacing:2, fontWeight:'500'}}>{post.title}</RN.Text>
                    <NB.Icon style={{color:'#ccc'}} name="chevron-right" type="Entypo"/>
                </RN.View>  
                <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                    <RN.View style={{flex:1}}>
                        {labels.map(label => <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>{label}</RN.Text>)}
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        {infos.map(info => <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{info}</RN.Text>)}
                    </RN.View>
                    
                </RN.View>
            </RN.View>
        )
    }
}

var post1 = {
    type: 0,
    title: 'Missing Player',
    position: 'GK',
    location:'Maslak/Istanbul',
    date: '13.08.2019',
    contact: '+90 544 444 44 44'
}

export default class ListMatches extends React.Component{
    render(){
        return(
            <RN.View style={styles.ListMatchesView}>
                <RN.View style={{height:height*.2, width:width, alignItems:'center', justifyContent:'center', padding:5}}>
                    <RN.Text style={{fontSize:24, color:'#fff', shadowColor:'black', shadowOpacity:.9, shadowOffset:{width:0, height:2}}}>Match Posts</RN.Text>
                </RN.View>
                <RN.ScrollView contentContainerStyle={{height:height*.7}}>
                    <MatchPost post = {post1}/>
                    <MatchPost post = {post1}/>
                </RN.ScrollView>
                
            </RN.View>
        )
    }
}


const styles = RN.StyleSheet.create({
    MatchPostView:{
        height:height*.2, 
        width:width*.9, 
        backgroundColor:Colors.postBackground, 
        marginVertical:5,
        overflow:'hidden',
    },
    PostHeader:{
        flex:3, 
        backgroundColor:'#1A2938', 
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
        paddingTop:statusBarHeight
    }
})