
import * as React from "react";
import {View,Text,TouchableOpacity,SafeAreaView,Dimensions,ScrollView, Alert} from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import {createAppContainer} from "react-navigation";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import Constants from "expo-constants";
import PlayerProfile from "./PlayerProfile";
import ListMatches from "./ListMatches";
import ListTeams from "./ListTeams";
import ListFields from "./ListFields";
import CreateTeam from "./CreateTeam";
import AreaInfo from "./AreaInfo";
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Firebase from "../Config/Firebase";
require('firebase/firestore');
const Screen = Dimensions.get("screen");
const height = Screen.height;
const width = Screen.width;



  const MatchesPage = createStackNavigator({
    Home: {
          screen:ListMatches,
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
                <Text style={{fontSize:16, color:'#d45675', letterSpacing:1.5, fontWeight:'500', textAlign:'center'}}>Sign Out</Text>
          </TouchableOpacity>

        </View>
      );
  }

const AreaOwnerApp = createDrawerNavigator({
    "My Area": {
      screen: AreaInfo,
    },
    "Matches": {
        screen: MatchesPage,
    }
  },
  {
    contentComponent:CustomDrawerComponent,
    contentOptions: {
      activeTintColor: "white",
    },
    drawerWidth:width*0.65
  }
);


export default createAppContainer(AreaOwnerApp);




