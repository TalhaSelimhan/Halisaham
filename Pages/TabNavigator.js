
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
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer';



const Player = createStackNavigator({
  Home: {
        screen:PlayerProfile,
        navigationOptions:{
            header:null,
        }
  }
});

const Team = createStackNavigator({
  Settings: {
        screen:TeamProfile,
        navigationOptions:{
            header:null,
        }
    }
});

  
  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
      screen: Player,
    },
    Notifications: {
      screen: Team,
    },
  });
  
export default MyApp = createAppContainer(MyDrawerNavigator);




