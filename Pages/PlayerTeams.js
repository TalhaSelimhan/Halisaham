import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import {Radar} from "react-native-pathjs-charts";
const Window = RN.Dimensions.get("window");
const Screen = RN.Dimensions.get("screen");
const height = Window.height;
const width = Window.width;



class TeamRow extends React.Component{
    render(){
        let {team} = this.props;
        return(
            <RN.View style={{backgroundColor:team.id % 2 == 0 ? Colors.tableFirst : Colors.tableSecond, flexDirection:'row', height:height*0.05, justifyContent:'space-around', alignItems:'center'}}>
                <RN.View style={{flex:1}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{team.role}</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{team.team}</RN.Text></RN.View>
                <RN.View style={{flex:1}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{team.played}</RN.Text></RN.View>
            </RN.View>
        )
    }
}

class TeamHeader extends React.Component{
    render(){
        let {team} = this.props;
        return(
            <RN.View style={{backgroundColor:Colors.headerBackground, flexDirection:'row', height:height*0.05, justifyContent:'space-around', alignItems:'center'}}>
                <RN.View style={{flex:1}}><RN.Text style={{textAlign:'center', color:'#fff'}}>Position</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>Team Name</RN.Text></RN.View>
                <RN.View style={{flex:1}}><RN.Text style={{textAlign:'center', color:'#fff'}}>#Matches</RN.Text></RN.View>
            </RN.View>
        )
    }
}

var teams = [{id:1, 'role':'DF', 'team':'SSC Napoli', 'played':227},
             {id:2, 'role':'DF', 'team':'KRC Genk', 'played':92},
             {id:3, 'role':'DF', 'team':'FC Metz', 'played':42}];


export default class PlayerTeams extends React.Component{
    render(){
        return(
            <RN.View>
                <RN.Text style={{textAlign:'center', textAlignVertical:'center', fontSize:20, fontWeight:'700', padding:height*0.02, color:'#fff'}}>Player's Teams</RN.Text>
                <RN.FlatList
                    data={teams}
                    renderItem={({ item }) => <TeamRow team={item} />}
                    ListFooterComponent={() => <RN.Text style={{fontSize:12, color:'#ccc', textAlign:'center', padding:height*0.05}}>No more teams</RN.Text>}
                    ListHeaderComponent={() => <TeamHeader/>}
                    keyExtractor={item => item.id}
                />
            </RN.View>
        )
    }
}

