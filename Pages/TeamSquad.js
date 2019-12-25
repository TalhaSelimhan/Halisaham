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
import Firebase from "../Config/Firebase";
require('firebase/firestore');
import * as Indicators from "react-native-indicators";


class PlayerRow extends React.Component{
    render(){
        let {player} = this.props;
        if(player.type == 'Leader'){
            var iconName = "crown"
            var iconColor = "#d4af37"
        }
        else {
            var iconName = "user"
            var iconColor = "#ccc"
        }
        var PlayerIcon = <NB.Icon name={iconName} type="FontAwesome5" style={{color:iconColor, fontSize:18}}/>
        return(
            <RN.View style={{backgroundColor:player.id % 2 == 0 ? Colors.tableFirst : Colors.tableSecond, flexDirection:'row', height:height*0.05, justifyContent:'space-around', alignItems:'center'}}>
                <RN.View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <RNE.Avatar source={{uri:player.photourl}} rounded containerStyle={{width:20, height:20}} avatarStyle={{width:20, height:20}}/>
                </RN.View>
                <RN.View style={{flex:3}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{player.fullname}</RN.Text></RN.View>
                <RN.View style={{flex:1}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{PlayerIcon}</RN.Text></RN.View>
                <RN.View style={{flex:2}}><RN.Text style={{textAlign:'center', color:'#fff'}}>{player.type}</RN.Text></RN.View>
            </RN.View>
        )
    }
}


var players = [{id:1, 'name':'Lorenzo Insigne', 'type':'Leader', 'image':'https://www.futwiz.com/assets/img/fifa19/faces/67307083.png'},
               {id:2, 'name':'Hirving Lozano', 'type':'Member', 'image': 'https://www.futwiz.com/assets/img/fifa20/faces/221992.png'},
               {id:3, 'name':'Jose Callejon', 'type':'Member', 'image': 'https://www.futwiz.com/assets/img/fifa19/faces/185020.png'},
               {id:4, 'name':'Kalidou Koulibaly', 'type':'Member', 'image': 'https://www.futwiz.com/assets/img/fifa20/faces/201024.png'},];


export default class Squad extends React.Component{
    state = {
        players:[],
        loaded:false
    }
    async componentWillMount(){
        await this.loadSquad();
    }
    async loadSquad(){
        let leaderRef = Firebase.firestore().collection("users").doc(this.props.team.leaderid)
        let leader = [];
        await leaderRef.get().then(doc => {
            let player = doc.data();
            player.id = doc.id;
            player.type = "Leader"
            leader = [player];
        })
        this.setState({players:leader, loaded:true});
    }
    render(){
        if(!this.state.loaded) return <Indicators.BarIndicator color="#eee" count={5}/>
        return(
            <RN.View>
                <RN.Text style={{textAlign:'center', textAlignVertical:'center', fontSize:20, fontWeight:'700', padding:height*0.02, color:'#fff'}}>Squad</RN.Text>
                <RN.FlatList
                    data={this.state.players}
                    renderItem={({ item }) => <PlayerRow player={item} />}
                    ListFooterComponent={() => <RN.Text style={{fontSize:12, color:'#ccc', textAlign:'center', padding:height*0.05}}>No more players</RN.Text>}
                    keyExtractor={item => item.id}
                />
            </RN.View>
        )
    }
}

