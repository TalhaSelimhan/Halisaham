
import * as React from "react";
import {View,Text} from "react-native";
import * as NB from "native-base";
import {createAppContainer} from "react-navigation";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import Constants from "expo-constants";
import now from "performance-now";
import PlayerProfile from "./PlayerProfile";
import CreateTeam from "./CreateTeam";
import TeamProfile from "./TeamProfile";
import ListMatches from "./ListMatches";
import ListTeams from "./ListTeams";
import ListFields from "./ListFields";
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer';



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
    },
  });
  
export default MyApp = createAppContainer(MyDrawerNavigator);




