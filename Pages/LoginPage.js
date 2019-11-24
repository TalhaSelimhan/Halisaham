import * as React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import * as Navigation from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import {createTabNavigator} from "react-navigation-tabs";
import Colors from "../Config/Colors";
import Background from "../Images/background.png"
import Button from "../Components/Button"


class LandingPage extends React.Component{
    render(){
        return(
            <RN.ImageBackground source={require('../Images/background.png')} style={{width:'100%', height:'100%'}}>
                <RN.View style={{flex:5}}/>
                <RN.View style={{flex:4, alignItems:"center", justifyContent:"center"}}>
                    <RN.Text style={{color:'#fcfcfc', fontSize:36, fontWeight:'bold', textAlign:'center', width:'80%'}}>Welcome to OFA</RN.Text>
                    <RN.Text style={{color:"#dedede", fontSize:14, textAlign:'center', width:'75%', margin:10}}>The best way to arrange matches and finding opponents</RN.Text>
                    <Button title="LOGIN" onPress={() => this.props.navigation.navigate("Login")} containerStyle={{height:45, marginBottom:10}}/>
                </RN.View>
                <RN.View style={{flex:3, alignItems:"center", justifyContent:"center", opacity:0.9}}>
                    <RN.Text style={{color:"#dedede", fontSize:14, textAlign:'center', width:'75%', margin:10}}>Continue with:</RN.Text>
                    <Button title="Sign in with Google" 
                            onPress={() => this.props.navigation.navigate("Login")} 
                            containerStyle={{height:40, marginBottom:10, backgroundColor:'#fff'}}
                            textStyle={{color:Colors.headerBackground, fontWeight:'100'}}
                            logo1={require('../Images/googleLogo.png')}/>
                    <Button title="Sign in with Facebook"
                            onPress={() => this.props.navigation.navigate("Login")} 
                            containerStyle={{height:40, marginBottom:10, backgroundColor:'#1877f2'}}
                            logo1={require('../Images/facebookLogo.png')}/>
                </RN.View>         
            </RN.ImageBackground>         
        )
    }
}


class LoginPage extends React.Component{
    render(){
        return(
            <RN.View>
                <RN.Text>Login Page</RN.Text>
                <RN.Button title="Go Sign Up" onPress={() => this.props.navigation.navigate("Sign Up")}/>
            </RN.View>
        )
    }
}


class SignUpPage extends React.Component{
    render(){
        return(
            <RN.View>
                <RN.Text>SignUp Page</RN.Text>
            </RN.View>
        )
    }
}


const LandingNavigator = createStackNavigator(
    {
        "Home": {
                screen:LandingPage, 
                title:"Home",
                navigationOptions:{
                    header:null
                }
        },
        "Login":{
                screen:LoginPage,
                title:'Login',
                navigationOptions:{
                    header:null
                }
        },
        "Sign Up":{
                    screen:SignUpPage,
                    title:'Sign Up',
                    navigationOptions:{
                        header:null
                    }
        }
    },
);

export default Navigation.createAppContainer(LandingNavigator);