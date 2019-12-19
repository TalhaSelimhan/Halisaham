
import * as React from "react";
import {View,Text,TouchableOpacity,SafeAreaView,Dimensions,ScrollView} from "react-native";
import * as NB from "native-base";
import {createAppContainer} from "react-navigation";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import Constants from "expo-constants";
import PlayerProfile from "./PlayerProfile";
import ListMatches from "./ListMatches";
import ListTeams from "./ListTeams";
import ListFields from "./ListFields";
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Firebase from "../Config/Firebase";


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

  const CustomDrawerComponent= (props) =>{
      return(
        <View style={{flex:1}}>
          <View style={{height:250,backgroundColor:Colors.sideBarHeaderBackground}}>
            <TouchableOpacity style={{paddingTop:40}} onPress={async ()=>await Firebase.auth().signOut()}>
              <Text style={{fontSize:24,color:"white"}}>Sign Out</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{backgroundColor:Colors.backgroundGreen}}>
            <DrawerItems  {...props}  itemStyle={{borderRadius:100,margin:5,alignSelf:"flex-start"}} activeBackgroundColor={Colors.postBackground} />
          </ScrollView>

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
    "Last Matches": {
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
  
export default MyApp = createAppContainer(MyDrawerNavigator);




