import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
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
import colors from "../Config/Colors";
import Firebase from "../Config/Firebase";
require('firebase/firestore');




class PlayerProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:1,
            playerdata:{}
        }
    }
    async loadPlayer(uid){
        let that = this;
        let userRef = Firebase.firestore().collection('users').doc(uid);
        userRef.get().then(doc => {
            if(doc.exists){
                that.setState({playerdata:doc.data()})
            }
        })
    }

    async componentWillMount(){
        await this.loadPlayer(this.props.navigation.getParam('uid'));
    }

    render(){
        let {playerdata} = this.state;
        return(
            <RN.View style={{flex:1}}>
                
                
                <RN.View style={styles.imageView}>
                    <RN.Image source={{uri:'https://cdn.sporx.com/img/59/2019/neco.jpg'}}
                              style={styles.playerImage}/>
                    <RN.TouchableOpacity onPress={this.props.navigation.openDrawer} style={{width:40, height:40, top:height*.05, left:width*.05}}>
                        <NB.Icon name="menu" type="Feather" style={{color:'#111'}}/>
                    </RN.TouchableOpacity>
                </RN.View>
                <RN.View style={styles.infoView}>
                    <RN.View style={styles.firstSection}>
                        <RN.View style={styles.playerInfos}>
                            <RN.Text style={styles.usernameText}>{playerdata.username}</RN.Text>
                            <RN.Text style={styles.otherInfos}>{playerdata.fullname}, {playerdata.age}</RN.Text>
                            <RN.Text style={styles.otherInfos}>{playerdata.city}</RN.Text>
                        </RN.View>
                        <RN.View style={{width:width*0.20, justifyContent:'space-around'}}>
                            <Button title="EDIT"
                                    containerStyle={{backgroundColor:'#fff', width:width*0.20, height:height*0.04}}
                                    textStyle={{color:colors.postBackground, fontSize:10, fontWeight:'600'}}/>
                            <Button title="INVITE"
                                    containerStyle={{backgroundColor:Colors.squadButton, width:width*0.20, height:height*0.04}}
                                    textStyle={styles.buttonText}/>
                        </RN.View>
                    </RN.View>
                    <RN.View style={styles.secondSection}>
                        <RN.TouchableOpacity style={styles.secondSectionButtons} onPress={() => this.setState({show:1})}>
                            <NB.Icon name="ios-stats" type="Ionicons" style={styles.secondSectionIcon}/>
                            <RN.Text style={styles.secondSectionText}>Stats</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={styles.secondSectionButtons} onPress={() => this.setState({show:2})}>
                            <NB.Icon name="history" type="FontAwesome5" style={styles.secondSectionIcon}/>
                            <RN.Text style={styles.secondSectionText}>Match History</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={styles.secondSectionButtons} onPress={() => this.setState({show:3})}>
                            <NB.Icon name="people" type="MaterialIcons" style={styles.secondSectionIcon}/>
                            <RN.Text style={styles.secondSectionText}>Teams</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                    <RN.View style={styles.thirdSection}>
                        {this.state.show == 3 ? <PlayerTeams/> : this.state.show == 2 ? <MatchHistory/> : <PlayerStats/>}
                    </RN.View>

                </RN.View>
                
            </RN.View>
        )
    }
}





const styles = RN.StyleSheet.create({
    imageView:{
        zIndex:-1,
        left:0, 
        right:0, 
        bottom:height*0.55,
        top:0,
        padding:0,
        margin:0,
        width:'100%', 
        height:height*0.45,
        elevation:0
    },
    playerImage:{
        width:width, 
        height:height*0.45, 
        resizeMode:'cover', 
        left:0, right:0, 
        position:"absolute",        
    },
    infoView:{
        zIndex:1, 
        elevation:3,
        shadowColor:'black',
        shadowOffset:{
            height:-2,
            width:0
        },
        alignContent:'center',
        justifyContent:'space-around',
        shadowOpacity:0.7,
        shadowRadius:5,
        backgroundColor:Colors.backgroundGreen,
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        left:0, 
        right:0, 
        bottom:0, 
        top:-height*0.1, 
        width:'100%', 
        height:height*0.65, 
    },
    playerInfos:{
        width:width*0.70, 
        alignItems:'flex-start', 
        justifyContent:'center'
    },
    usernameText:{
        fontSize:20, 
        fontWeight:'bold', 
        color:Colors.postBackground
    },
    otherInfos:{
        fontSize:12, 
        fontWeight:'200', 
        color:Colors.locationBackground
    },
    buttonText:{
        color:'#fff', 
        fontSize:10, 
        fontWeight:'600'
    },
    firstSection:{
        height:height*0.12, 
        width:width*.9, 
        flexDirection:'row', 
        alignContent:'center', 
        justifyContent:'space-between', 
        marginHorizontal:width*0.05
    },
    secondSection:{
        height:height*0.1, 
        width:width*.9, 
        backgroundColor:'#fff', 
        elevation:5, 
        borderRadius:10, 
        flexDirection:"row", 
        marginHorizontal:width*0.05, 
        justifyContent:'space-between'
    },
    secondSectionButtons:{
        width:width*0.3, 
        alignItems:'center', 
        justifyContent:'center'
    },
    secondSectionIcon:{
        fontSize:20
    },
    secondSectionText:{
        fontSize:12, 
        color:'#999', 
        fontWeight:'200'
    },
    thirdSection:{
        height:height*0.38,
        paddingVertical:height*.02,
        width:width*.9,
        marginHorizontal:width*.05,
        backgroundColor:Colors.postBackground, 
        elevation:5, 
        borderRadius:45,
        overflow:'hidden'
    }
})


export default PlayerProfile;
