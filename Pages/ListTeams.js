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


class Item extends React.Component{
    render(){
        var {labels, post, title} = this.props;
        return(
            <RN.View style={styles.MatchPostView}>
                <RN.ImageBackground source={{uri:'https://www.elsetge.cat/myimg/f/91-914400_soccer-s-s-c-napoli-logo-ssc-napoli.jpg'}} style={{width:width*.9, height:height*.2}} resizeMode="cover">
                    <RN.View style={{opacity:.4, backgroundColor:'#000', position:"absolute", top:0, right:0, left:0, bottom:0}}/>
                    <RN.View style={styles.PostHeader}>
                        <RN.View style={{opacity:.6, backgroundColor:'#000', position:"absolute", top:0, right:0, left:0, bottom:0}}/>
                        <RN.Text style={{color:'#fff', fontSize:16, letterSpacing:2, fontWeight:'700'}}>{title}</RN.Text>
                    </RN.View>  
                    <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                        <RN.View style={{flex:1}}>
                            {labels.map(label => <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>{label}</RN.Text>)}
                        </RN.View>
                        <RN.View style={{flex:1}}>
                            {post.map(info => <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{info}</RN.Text>)}
                        </RN.View>
                    </RN.View>
                    
                </RN.ImageBackground>
            </RN.View>
        )
    }
}

var team = {
    name: 'Napoli SCF',
    location:'Maslak/Istanbul',
    totalmatch:36,
    founded: '13.08.2019',
    contact: '+90 544 444 44 44'
}

var labels = ['Total Matches', 'City', 'Founded', 'Contact']
var post = [team.totalmatch, team.location, team.founded, team.contact]
var title = team.name;

export default class ListTeams extends React.Component{
    render(){
        return(
            <RN.View style={styles.ListMatchesView}>
                <RN.View style={{height:height*.2, width:width, alignItems:'center', justifyContent:'center', padding:5}}>
                    <RN.Text style={{fontSize:24, color:'#fff', elevation:4, shadowColor:'black', shadowOpacity:.9, shadowOffset:{width:0, height:2}, letterSpacing:2, fontWeight:'800'}}>Teams List</RN.Text>
                </RN.View>
                <RN.ScrollView contentContainerStyle={{height:height*.7}}>
                    <Item post = {post} labels={labels} title={title}/>
                    <Item post = {post} labels={labels} title={title}/>
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
        borderRadius:20,
        shadowColor:'black', 
        shadowOpacity:.9, 
        shadowOffset:{width:0, height:2},
        elevation:4
    },
    PostHeader:{
        flex:3, 
        overflow:'hidden', 
        alignItems:'center', 
        justifyContent:'center',
        paddingHorizontal:5,
    },
    ListMatchesView:{
        width:width, 
        height:height, 
        backgroundColor:Colors.backgroundGreen, 
        alignItems:'center', 
        paddingTop:statusBarHeight
    }
})