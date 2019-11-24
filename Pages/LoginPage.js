import * as React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import * as Navigation from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import {createTabNavigator} from "react-navigation-tabs";
import Colors from "../Config/Colors";





class LandingPage extends React.Component{
    render(){
        return(
            <RN.ImageBackground>
                <RN.View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                    <RN.Text>Landing Page</RN.Text>
                    <RN.Button title="Go Login" onPress={() => this.props.navigation.navigate("Login")}/>
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

const LoginNavigator = createTabNavigator(
    {
        "Login": {screen:LoginPage, title:"Login"},
        "Sign Up": {screen:SignUpPage, title:"Sign Up"}
    }
)

const LoginComponent = Navigation.createAppContainer(LoginNavigator);

const LandingNavigator = createStackNavigator(
    {
    "Home": {screen:LandingPage, title:"Home"},
    "Login": {screen:LoginPage},
    "Sign Up": {screen:SignUpPage}
    },
    {
        navigationOptions:{
            headerMode:"none"
        }
    }
);

export default LandingPage;