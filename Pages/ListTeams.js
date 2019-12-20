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
import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation";
import Firebase from '../Config/Firebase';
require('firebase/firestore');
import TeamProfile from "./TeamProfile";
import ReserveArea from "./ReserveArea";
import Header from "../Components/Header";

class Item extends React.Component{
    render(){
        var {team, navigation} = this.props;
        return(
            <RN.TouchableOpacity style={styles.MatchPostView} onPress={() => navigation.navigate('TeamProfile', {uid:team.id})} >
                <RN.ImageBackground source={{uri:team.photourl}} style={{width:width*.9, height:height*.2}} resizeMode="cover">
                    <RN.View style={{opacity:.4, backgroundColor:'#000', position:"absolute", top:0, right:0, left:0, bottom:0}}/>
                    <RN.View style={styles.PostHeader}>
                        <RN.View style={{opacity:.6, backgroundColor:'#000', position:"absolute", top:0, right:0, left:0, bottom:0}}/>
                        <RN.Text style={{color:'#fff', fontSize:16, letterSpacing:2, fontWeight:'700'}}>{team.name}</RN.Text>
                    </RN.View>  
                    <RN.View style={{flex:5, flexDirection:'row', alignContent:'center', alignItems:'center', padding:10}}>
                        <RN.View style={{flex:1}}>
                            <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Total Matches</RN.Text>
                            <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>City</RN.Text>
                            <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Founded</RN.Text>
                            <RN.Text style={{fontSize:12,fontWeight:'600', color:'#fff', letterSpacing:2}}>Contact</RN.Text>
                        </RN.View>
                        <RN.View style={{flex:1}}>
                            <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{team.totalmatches}</RN.Text>
                            <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{team.city}</RN.Text>
                            <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{team.founded}</RN.Text>
                            <RN.Text style={{fontSize:12, textAlign:'right', fontWeight:'300', color:'#ccc', letterSpacing:2}}>{team.contact}</RN.Text>
                        </RN.View>
                    </RN.View>
                    
                </RN.ImageBackground>
            </RN.TouchableOpacity>
        )
    }
}


class ListTeams extends React.Component{
    state={
        teams:[],
        loaded:false
    }
    async loadTeams(){
        let that = this;
        let teams = [];
        let teamsRef = Firebase.firestore().collection('teams');
        await teamsRef.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let team = doc.data();
                var d = new Date( team.founded );
                team.founded = d.getFullYear();
                team.id = doc.id;
                teams.push(team);
            })
        })
        this.setState({teams:teams, loaded:true});
    }
    async componentWillMount(){
        await this.loadTeams();
    }
    render(){
        let {teams, loaded} = this.state;

        return(
            <RN.View style={styles.ListMatchesView}>
                <Header title='Teams List' drawer={true} navigation={this.props.navigation}/>
                {loaded ? <RN.FlatList
                    data={teams}
                    renderItem={(item) => <Item team = {item.item} navigation={this.props.navigation}/>}
                    keyExtractor={(item) => item.id}
                    
                /> : <RN.View/>}
                
                
            </RN.View>
        )
    }
}


const ListStack = createStackNavigator({
    List:{
        screen:ListTeams,
        navigationOptions:{
            header:null,
        }
    },
    TeamProfile:{
        screen:TeamProfile,
        navigationOptions:{
            header:null
        }
    },
    ReserveArea:{
        screen:ReserveArea,
        navigationOptions:{
            header:null
        }
    }
})

export default createAppContainer(ListStack);

const styles = RN.StyleSheet.create({
    MatchPostView:{
        height:height*.2, 
        width:width*.9, 
        backgroundColor:Colors.postBackground, 
        marginVertical:5,
        overflow:'hidden',
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginTop:15,
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
        backgroundColor:Colors.postBackground, 
        alignItems:'center', 
    }
})