import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from "./Config/Colors"
import LoginPage from "./Pages/LoginPage"
import PlayerProfile from "./Pages/PlayerProfile";
import TeamProfile from './Pages/TeamProfile';
import PlayerStats from './Pages/PlayerStats';
import AreaInfo from "./Pages/AreaInfo";
import ReserveArea from "./Pages/ReserveArea";
import CreateTeam from './Pages/CreateTeam';
import ListMatches from './Pages/ListMatches';
import ListTeams from './Pages/ListTeams';

export default function App() {
  return (
    <ListTeams/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
