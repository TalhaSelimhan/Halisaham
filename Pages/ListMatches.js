import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Header from "../Components/Header";
import Colors from "../Config/Colors";
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;
import Loading from '../Components/Loading';


class Post extends React.Component{
    render(){
        var {labels, post, title} = this.props;
        return(
            <RN.View style={styles.MatchPostView}>
                <RN.View style={styles.PostHeader}>
                    <RN.Text style={{color:'#ccc', fontSize:16, letterSpacing:2, fontWeight:'500'}}>{title}</RN.Text>
                    <NB.Icon style={{color:'#ccc'}} name="chevron-right" type="Entypo"/>
                </RN.View>  
                <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                    <RN.View style={{flex:1}}>
                        {labels.map(label => <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>{label}</RN.Text>)}
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        {post.map(info => <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{info}</RN.Text>)}
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

var labels = ['Position', 'Location', 'Date', 'Contact']
var post = [post1.position, post1.location, post1.date, post1.contact]
var title = post1.title;

export default class ListMatches extends React.Component{
    render(){
        return(
            <RN.View style={styles.ListMatchesView}>
                <Header title="Matches" drawer={true} navigation={this.props.navigation}/>
                <RN.ScrollView contentContainerStyle={{height:height*.7}}>
                    <Post post = {post} labels={labels} title={title}/>
                    <Post post = {post} labels={labels} title={title}/>
                </RN.ScrollView>
                
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