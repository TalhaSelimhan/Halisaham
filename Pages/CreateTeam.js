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
import MatchHistory from './MatchHistory';
import PlayerTeams from './PlayerTeams';
import PlayerStats from "./PlayerStats";
import { black } from "ansi-colors";

export default class CreateTeam extends React.Component{
    render(){
        return(
            <RN.View style={{flex:1,backgroundColor:Colors.postBackground}}>
                <RN.View style={styles.headerFlex}>
                    <RN.View style={{flex:1,marginTop:Constants.statusBarHeight,alignItems:"center",justifyContent:"center"}}>
                        <NB.Icon name="chevron-left" type="Entypo" onPress={() => this.props.navigation.pop()}/>
                    </RN.View>
                    <RN.View style={{flex:4,marginTop:Constants.statusBarHeight,alignItems:"center",justifyContent:"center"}}>
                        <RN.Text style={{color:"white",fontSize:24}}>Create New Team</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}/>
                </RN.View>
                <RN.View style={{flex:8}}>
                    <NB.Form>
                        <NB.Item floatingLabel>
                            <NB.Label >
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="users" type="Entypo"/>
                                <RN.Text style={styles.labelStyle}> Username</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} autoCapitalize="none" autoCompleteType="username"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="tournament" type="MaterialCommunityIcons"/>
                                <RN.Text style={styles.labelStyle}> Short Name</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="telephone" type="Foundation"/>
                                <RN.Text style={styles.labelStyle}> Contact Number</RN.Text>
                            </NB.Label>
                            <NB.Input keyboardType="number-pad" style={{fontSize:18,color:"white"}} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Item floatingLabel>
                            <NB.Label style={{marginBottom:20}}>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="description" type="MaterialIcons"/>
                                <RN.Text style={styles.labelStyle}> Description</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} autoCapitalize="none" />
                        </NB.Item>
                    </NB.Form>
                </RN.View>
                <RN.View style={{flex:1,justifyContent:"center" ,marginBottom:20,alignItems:"center"}}>
                    <Button title={"CREATE TEAM"} />
                </RN.View>
            </RN.View>
        )
    }
}

const styles = RN.StyleSheet.create({
    headerFlex:{
        flex:2,
        flexDirection:'row',
        backgroundColor:Colors.backgroundGreen,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    labelStyle:{
        color:'#ccc', 
        fontSize:14, 
        letterSpacing:1.5
    }
})