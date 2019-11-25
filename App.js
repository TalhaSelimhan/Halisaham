import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from "./Config/Colors"
import LoginPage from "./Pages/LoginPage"
import PlayerProfile from "./Pages/PlayerProfile";
import TeamProfile from './Pages/TeamProfile';

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
