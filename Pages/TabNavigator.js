
import * as React from "react";
import {View,Text} from "react-native";
import * as NB from "native-base";
import {createAppContainer} from "react-navigation";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import Constants from "expo-constants";
import now from "performance-now";
import PlayerProfile from "./PlayerProfile";
import TeamProfile from "./TeamProfile";
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator, BottomTabBar, } from 'react-navigation-tabs';



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

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
          screen:Team,
          navigationOptions:{
            tabBarIcon: ({tintColor}) => (<NB.Icon name='home' type="Entypo" style={{fontSize:26,color:tintColor}} />)
          }
    },
      Profile: {
            screen:Player,
            navigationOptions:{
                tabBarIcon: ({tintColor}) => (<NB.Icon name='md-person' type="Ionicons" style={{fontSize:26,color:tintColor}} />)
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: Colors.backgroundGreen, 
            inactiveTintColor: Colors.postSubText,
            
            labelStyle: {
              fontSize: 14,
            },

            style: {
              backgroundColor: Colors.postBackground,
              paddingTop:5,
            },
          }
    }
  )
);