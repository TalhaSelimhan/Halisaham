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



class MatchRow extends React.Component{
    render(){
        let {match} = this.props;
        if(match.result == 'W') var resultColor = Colors.win
        else if(match.result == 'D') var resultColor = Colors.draw
        else if(match.result == 'L') var resultColor = Colors.lose
        else var resultColor = '#fff'
        return(
            <RN.View style={{backgroundColor:match.id % 2 == 0 ? Colors.tableFirst : Colors.tableSecond, flexDirection:'row', height:height*0.05, justifyContent:'space-around', alignItems:'center'}}>
                <RN.View style={{flex:1}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{match.role}</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{match.team}</RN.Text></RN.View>
                <RN.View style={{flex:4}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{match.date}</RN.Text></RN.View>
                <RN.View style={{flex:1}}><RN.Text style={{textAlign:'center', color:resultColor}}>{match.result}</RN.Text></RN.View>
            </RN.View>
        )
    }
}

var matches = [{id:1, 'role':'DF', 'team':'NPL', 'result':'W', 'date':'21.10.2019'},
               {id:2, 'role':'DF', 'team':'NPL', 'result':'D', 'date':'15.05.2019'},
               {id:3, 'role':'DF', 'team':'NPL', 'result':'L', 'date':'20.07.2019'},
               {id:4, 'role':'DF', 'team':'NPL', 'result':'W', 'date':'10.05.2019'},
               {id:5, 'role':'DF', 'team':'NPL', 'result':'W', 'date':'01.10.2019'},
               {id:6, 'role':'DF', 'team':'NPL', 'result':'W', 'date':'07.10.2019'},
               {id:7, 'role':'DF', 'team':'NPL', 'result':'W', 'date':'09.11.2019'},
                ];


export default class MatchHistory extends React.Component{
    render(){
        return(
            <RN.View>
                <RN.Text style={{textAlign:'center', textAlignVertical:'center', fontSize:20, fontWeight:'700', padding:height*0.02, color:'#fff'}}>Match History</RN.Text>
                <RN.FlatList
                    data={matches}
                    renderItem={({ item }) => <MatchRow match={item} />}
                    ListFooterComponent={() => <RN.Text style={{fontSize:12, color:'#ccc', textAlign:'center', padding:height*0.05}}>No more matches</RN.Text>}
                    keyExtractor={item => item.id}
                />
            </RN.View>
        )
    }
}

