import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from "./Config/Colors"
import LoginPage from "./Pages/LoginPage"
import PlayerProfile from "./Pages/PlayerProfile";
import TeamProfile from './Pages/TeamProfile';
import PlayerStats from './Pages/PlayerStats';
<<<<<<< HEAD
import AreaInfo from "./Pages/AreaInfo";

=======
import CreateTeam from './Pages/CreateTeam';
>>>>>>> f555acc088a9293b9fa70723e90c9c7ee9cc637c

export default function App() {
  return (
    <LoginPage/>
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
