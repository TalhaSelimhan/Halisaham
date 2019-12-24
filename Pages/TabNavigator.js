
import * as React from "react";
import {View,Text,TouchableOpacity,SafeAreaView,Dimensions,ScrollView,Alert} from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import {createAppContainer} from "react-navigation";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import Constants from "expo-constants";
import PlayerProfile from "./PlayerProfile";
import TeamProfile from "./TeamProfile";
import ListMatches from "./ListMatches";
import ListTeams from "./ListTeams";
import ListFields from "./ListFields";
import CreateTeam from "./CreateTeam";
import TeamLeaderRequests from "./TeamLeaderRequests";
import AreaInfo from "./AreaInfo";
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Firebase from "../Config/Firebase";
import * as firebase from "firebase";
require('firebase/firestore');
const Screen = Dimensions.get("screen");
const height = Screen.height;
const width = Screen.width;


const PlayerPage = createStackNavigator({
  Home: {
        screen:PlayerProfile,
        navigationOptions:{
            header:null,
        }
  }
});

const TeamsPage = createStackNavigator({
    Home: {
          screen:ListTeams,
          navigationOptions:{
              header:null,
          }
    }
  });
  const FieldsPage = createStackNavigator({
    Home: {
          screen:ListFields,
          navigationOptions:{
              header:null,
          }
    }
  });
  const MatchesPage = createStackNavigator({
    Home: {
          screen:ListMatches,
          navigationOptions:{
              header:null,
          }
    }
  });
  const TeamRequests = createStackNavigator({
    Home: {
          screen:TeamLeaderRequests,
          navigationOptions:{
              header:null,
          }
    }
  });
  const TeamProfilePage = createStackNavigator({
    Home: {
          screen:TeamProfile,
          navigationOptions:{
              header:null,
          }
    }
  });



const CustomDrawerComponent= (props) =>{
      let photourl = Firebase.auth().currentUser.photoURL;
      let name = Firebase.auth().currentUser.displayName;

      return(
        <View style={{flex:1, backgroundColor:Colors.backgroundGreen}}>
          <View style={{height:height*.25,backgroundColor:Colors.sideBarHeaderBackground, alignContent:'center', alignItems:'center', justifyContent:'center'}}>
            <View style={{alignContent:'center', alignItems:'center'}}>
              <RNE.Avatar rounded size="large" source={{uri:photourl}}/>
            </View>
            <Text style={{fontSize:16, color:'#eee', letterSpacing:1.5, fontWeight:'500', textAlign:'center', marginTop:8}}>{name}</Text>
          </View>
          <ScrollView>
            <DrawerItems  {...props}  itemStyle={{borderRadius:100,margin:5,alignSelf:"flex-start"}} activeBackgroundColor={Colors.postBackground} />
          </ScrollView>
          <TouchableOpacity style={{marginBottom:20, flexDirection:'row', padding:8, marginHorizontal:40,borderRadius:100, backgroundColor:Colors.postBackground, justifyContent:'space-around'}} onPress={async ()=>await Firebase.auth().signOut()}>
                <NB.Icon name="poweroff" type="AntDesign" style={{fontSize:24,color:"#d45675"}}/>
                <Text style={{fontSize:16, color:'#d45675', letterSpacing:1.5, fontWeight:'500', textAlign:'center', textAlignVertical:'center'}}>Sign Out</Text>
          </TouchableOpacity>

        </View>
      );
  }
  
const MyDrawerNavigator = createDrawerNavigator({
    "Player Profile": {
      screen: PlayerPage,
    },
    Teams: {
      screen: TeamsPage,
    },
    Fields: {
        screen: FieldsPage,
    },
    "Matches": {
        screen: MatchesPage,
    },
    "Create Team":{
        screen:CreateTeam
    },
  },
  {
    contentComponent:CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "white",
    },
    drawerWidth:width*0.65
}
);

const TeamLeader = createDrawerNavigator({
  "Player Profile": {
    screen: PlayerPage,
  },
  Teams: {
    screen: TeamsPage,
  },
  Fields: {
      screen: FieldsPage,
  },
  "Matches": {
      screen: MatchesPage,
  },
  "Team Profile":{
      screen:TeamProfilePage,
  },
  "Match Requests":{
      screen:TeamRequests,
  },
  
},
{
  contentComponent:CustomDrawerComponent,
  contentOptions: {
    activeTintColor: "white",
  },
  drawerWidth:width*0.65
}
);

const Contain = createAppContainer(MyDrawerNavigator);
const TeamLead = createAppContainer(TeamLeader);

export default class TabNavigator extends React.Component{
  state={
    isleader:false,
  }
  async checkLeader(){
    let teamRef = Firebase.firestore().collection('users').where(firebase.firestore.FieldPath.documentId(), "==", Firebase.auth().currentUser.uid);
    let isleader= false
    let that = this;
    var listener = teamRef.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        isleader = change.doc.data().hasteam;
        that.setState({isleader:isleader})
      })
    })
  }
  async componentWillMount(){
    this.checkLeader();
  }
  render(){
    return !this.state.isleader ? <Contain/> : <TeamLead/>
  }
}



