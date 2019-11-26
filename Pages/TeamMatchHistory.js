import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
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
                <RN.View style={{flex:3}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{match.opponent}</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{match.score}</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{match.date}</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:resultColor}}>{match.result}</RN.Text></RN.View>
            </RN.View>
        )
    }
}



class MatchHeader extends React.Component{
    render(){
        let {team} = this.props;
        return(
            <RN.View style={{backgroundColor:Colors.headerBackground, flexDirection:'row', height:height*0.05, justifyContent:'space-around', alignItems:'center'}}>
                <RN.View style={{flex:3}}><RN.Text style={{textAlign:'center', color:'#fff'}}>Against</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>Score</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>Date</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>Result</RN.Text></RN.View>
            </RN.View>
        )
    }
}




var matches = [{id:1, 'opponent':'Genoa', 'result':'W', 'date':'21.11.2019', score:'2-0'},
               {id:2, 'opponent':'Atalanta', 'result':'D', 'date':'15.11.2019', score:'2-2'},
               {id:3, 'opponent':'AS Roma', 'result':'L', 'date':'08.11.2019', score:'1-2'},
               {id:4, 'opponent':'Salzburg', 'result':'W', 'date':'01.11.2019', score:'3-2'}];


export default class MatchHistory extends React.Component{
    render(){
        return(
            <RN.View>
                <RN.Text style={{textAlign:'center', textAlignVertical:'center', fontSize:20, fontWeight:'700', padding:height*0.02, color:'#fff'}}>Match History</RN.Text>
                <RN.FlatList
                    data={matches}
                    renderItem={({ item }) => <MatchRow match={item} />}
                    ListHeaderComponent={() => <MatchHeader/>}
                    ListFooterComponent={() => <RN.Text style={{fontSize:12, color:'#ccc', textAlign:'center', padding:height*0.05}}>No more matches</RN.Text>}
                    keyExtractor={item => item.id.toString()}
                />
            </RN.View>
        )
    }
}

