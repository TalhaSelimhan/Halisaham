import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
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
import ListFields from './Pages/ListFields';
import MatchRequest from './Pages/MatchRequest';
import InviteMatch from './Pages/InviteMatch';
import TabNavigator from './Pages/TabNavigator';
import AreaOwnerApp from './Pages/AreaOwnerApp';
import CreateArea from './Pages/CreateArea';
import Firebase from './Config/Firebase';
require('firebase/firestore');

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signedIn:false,
      checked:false,
    }
  }
  async componentWillMount(){
    let isareaowner = false;
    let that = this;
    await Firebase.auth().onAuthStateChanged(async (user) => {
      if(user && user.emailVerified) this.setState({signedIn: true}); 
      await Firebase.firestore().collection('users').doc(user.uid).get().then(doc => {
        isareaowner = doc.data().isareaowner;
      })
      await that.setState({isareaowner:isareaowner, checked:true});
    });
    
  }
  render(){
    let {signedIn, checked, isareaowner} = this.state;
    return !checked ? <View/> : signedIn ? isareaowner ? <AreaOwnerApp/> : <TabNavigator/> : <LoginPage/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
