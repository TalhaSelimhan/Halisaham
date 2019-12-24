import * as React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import * as Navigation from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import {createTabNavigator, createMaterialTopTabNavigator} from "react-navigation-tabs";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import Constants from "expo-constants";
import now from "performance-now";
import PlayerProfile from "./PlayerProfile";
import TeamProfile from "./TeamProfile";
import AreaInfo from "./AreaInfo";
import AreaOwnerApp from "./AreaOwnerApp";
import TabNavigator from "./TabNavigator";
import CreateArea from "./CreateArea";
import Firebase from "../Config/Firebase";
require('firebase/firestore');
const usersRef = Firebase.firestore().collection('users');



class LandingPage extends React.Component{
    render(){
        return(
            <RN.ImageBackground source={require('../Images/background.png')} style={{width:'100%', height:'100%'}}>
                <RN.View style={{flex:5}}/>
                <RN.View style={{flex:4, alignItems:"center", justifyContent:"center"}}>
                    <RN.Text style={{color:'#fcfcfc', fontSize:36, fontWeight:'bold', textAlign:'center', width:'80%'}}>Welcome to OFA</RN.Text>
                    <RN.Text style={{color:"#dedede", fontSize:14, textAlign:'center', width:'75%', margin:10}}>The best way to arrange matches and finding opponents</RN.Text>
                    <Button title="LOG IN" onPress={() => this.props.navigation.navigate("Login")} containerStyle={{height:45, marginBottom:10}}/>
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
    state = {
        email:'',
        password:'',
    }
    async signIn(){
        let inputs = this.state;
        let navigation = this.props.navigation;
        try{
            Firebase.auth().signInWithEmailAndPassword(inputs.email, inputs.password).then(async function(user) {
                if(!user.user.emailVerified){
                    RN.Alert.alert('Authentication required', 'Please check and verify your email');
                    return;
                }
            }).catch(error => RN.Alert.alert(error.code, error.message))
        }catch(error){
            RN.Alert.alert(error.code, error.message);
        }
    }
    render(){
        return(
            <RN.KeyboardAvoidingView style={{flex:1, backgroundColor:Colors.backgroundGreen, alignContent:'center', alignItems:'center', paddingTop:Constants.statusBarHeight}}>
                <RN.View style={{flex:1, flexDirection:'row', marginTop:'5%'}}>
                    <RN.View style={{flex:1, alignItems:'center'}}>
                        <NB.Icon name="chevron-left" type="Entypo" onPress={() => this.props.navigation.pop()}/>
                    </RN.View>
                    <RN.View style={{flex:4, flexDirection:'row', justifyContent:'center'}}>
                        <RN.TouchableOpacity style={styles.selectedStyle}>
                            <RN.Text style={{fontSize:12, color:'#fff'}}>LOG IN</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={styles.unSelectedStyle} 
                                             onPress={() => this.props.navigation.navigate("Sign Up")}>
                            <RN.Text style={{fontSize:12, color:'#fff'}}>SIGN UP</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                    <RN.View style={{flex:1}}/>
                </RN.View>
                <RN.View style={{flex:10, width:'90%'}}>
                    <NB.Form>
                        <NB.Item floatingLabel>
                            <NB.Label >
                                <NB.Icon style={{fontSize:20}} name="user" type="Feather"/>
                                <RN.Text style={styles.labelStyle}> Email</RN.Text>
                            </NB.Label>
                            <NB.Input autoCapitalize="none" autoCompleteType="username" onChangeText={text => this.setState({email:text})}/>
                        </NB.Item>
                        <NB.Item floatingLabel style={{marginBottom:20}}>
                            <NB.Label>
                                <NB.Icon style={{fontSize:20}} name="lock" type="Entypo"/>
                                <RN.Text style={styles.labelStyle}> Password</RN.Text>
                            </NB.Label>
                            <NB.Input autoCompleteType="password" autoCapitalize="none" secureTextEntry={true} onChangeText={text => this.setState({password:text})}/>
                        </NB.Item>
                    </NB.Form>
                    <RN.Text style={styles.forgotPasswordStyle}>Forgot password ?</RN.Text>
                </RN.View>
                <RN.View style={{flex:2, alignContent:"flex-end", padding:10, justifyContent:'space-around'}}>
                    <Button title="LOGIN"
                        onPress={() => this.signIn()} 
                        containerStyle={{height:40, marginBottom:10, backgroundColor:'#fff'}}
                        textStyle={{color:Colors.headerBackground}}/>
                </RN.View>
            </RN.KeyboardAvoidingView>
        )
    }
}


class SignUpPage extends React.Component{
    state = {
        fullname:'',
        age: 0,
        email:'',
        username:'',
        password:'',
        password2:'',
        isareaowner:false,
    }
    async signUp(){
        let inputs = this.state;
        let navigation = this.props.navigation;
        if(inputs.password.length < 6){
            RN.Alert.alert('Error', 'Password must be at least 6 characters!');
            return;
        }
        if(inputs.age < 15){
            RN.Alert.alert('Error', 'You must be older than 14 years old!');
            return;
        }
        if(inputs.password != inputs.password2){
            RN.Alert.alert('Error', 'Passwords should be match!');
            return;
        }
        try{
            Firebase.auth().createUserWithEmailAndPassword(inputs.email, inputs.password).then(async function(user){
                user.user.emailVerified = false;
                user.additionalUserInfo.username=inputs.username;
                user.user.updateProfile({
                    photoURL:'https://thumbor.forbes.com/thumbor/711x476/https://specials-images.forbesimg.com/dam/imageserve/e1555717e3dd4e858f39c9fcf2396b83/960x0.jpg',
                    displayName:inputs.fullname,
                    username:inputs.username
                })
                usersRef.doc(user.user.uid).set({
                    hasteam:false,
                    fullname:inputs.fullname,
                    age:inputs.age,
                    username:inputs.username,
                    city:'Istanbul',
                    photourl:'https://thumbor.forbes.com/thumbor/711x476/https://specials-images.forbesimg.com/dam/imageserve/e1555717e3dd4e858f39c9fcf2396b83/960x0.jpg',
                    isareaowner:inputs.isareaowner
                });
                user.user.sendEmailVerification();
                RN.Alert.alert('Success!', 'Account is created, please verify your email');
                if(inputs.isareaowner) navigation.navigate('Create Area', {uid:user.user.uid})
                else navigation.navigate('Login');
                return;
            }).catch(error => RN.Alert.alert(error.code, error.message))
        }catch(error){RN.Alert.alert(error.code, error.message)}
    }
    render(){
        return(
            <RN.KeyboardAvoidingView style={{flex:1, backgroundColor:Colors.backgroundGreen, alignContent:'center', alignItems:'center', paddingTop:Constants.statusBarHeight}}>
                <RN.View style={{flex:1, flexDirection:'row', marginTop:'5%'}}>
                    <RN.View style={{flex:1, alignItems:'center'}}>
                        <NB.Icon name="chevron-left" type="Entypo" onPress={() => this.props.navigation.pop()}/>
                    </RN.View>
                    <RN.View style={{flex:4, flexDirection:'row', justifyContent:'center'}}>
                        <RN.TouchableOpacity style={styles.unSelectedStyle}
                                            onPress={() => this.props.navigation.navigate("Login")}>
                            <RN.Text style={{fontSize:12, color:'#fff'}}>LOG IN</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity style={styles.selectedStyle}>
                            <RN.Text style={{fontSize:12, color:'#fff'}}>SIGN UP</RN.Text>
                        </RN.TouchableOpacity>
                    </RN.View>
                    <RN.View style={{flex:1}}/>
                </RN.View>
                <RN.View  style={{flex:10, width:'90%'}}>
                    <RN.ScrollView style={{maxHeight:'85%'}}>
                        <NB.Form>
                            <NB.Item floatingLabel>
                                <NB.Label>
                                    <NB.Icon style={{fontSize:16}} name="persona" type="Zocial"/>
                                    <RN.Text style={styles.labelStyle}>  Full Name</RN.Text>
                                </NB.Label>
                                <NB.Input autoCapitalize="words" autoCompleteType="name" onChangeText={text => this.setState({fullname:text})}/>
                            </NB.Item>
                            <NB.Item floatingLabel>
                                <NB.Label>
                                    <NB.Icon style={{fontSize:20}} name="calendar" type="Feather"/>
                                    <RN.Text style={styles.labelStyle}>  Age</RN.Text>
                                </NB.Label>
                                <NB.Input keyboardType="numeric" onChangeText={text => this.setState({age:text})}/>
                            </NB.Item>
                            <NB.Item floatingLabel>
                                <NB.Label>
                                    <NB.Icon style={{fontSize:20}} name="email" type="MaterialCommunityIcons"/>
                                    <RN.Text style={styles.labelStyle}>  E-mail</RN.Text>
                                </NB.Label>
                                <NB.Input autoCapitalize="none" autoCompleteType="email" onChangeText={text => this.setState({email:text})}/>
                            </NB.Item>
                            <NB.Item floatingLabel>
                                <NB.Label>
                                    <NB.Icon style={{fontSize:20}} name="user" type="Feather"/>
                                    <RN.Text style={styles.labelStyle}>  Username</RN.Text>
                                </NB.Label>
                                <NB.Input autoCapitalize="none" autoCompleteType="username" onChangeText={text => this.setState({username:text})}/>
                            </NB.Item>
                            <NB.Item floatingLabel>
                                <NB.Label>
                                    <NB.Icon style={{fontSize:20}} name="lock" type="Entypo"/>
                                    <RN.Text style={styles.labelStyle}>  Password</RN.Text>
                                </NB.Label>
                                <NB.Input autoCompleteType="password" autoCapitalize="none" secureTextEntry={true} onChangeText={text => this.setState({password:text})}/>
                            </NB.Item>
                            <NB.Item floatingLabel>
                                <NB.Label>
                                    <NB.Icon style={{fontSize:20}} name="lock" type="Entypo"/>
                                    <RN.Text style={styles.labelStyle}>  Password Again</RN.Text>
                                </NB.Label>
                                <NB.Input autoCompleteType="password" autoCapitalize="none" secureTextEntry={true} onChangeText={text => this.setState({password2:text})}/>
                            </NB.Item>
                        </NB.Form>
                    </RN.ScrollView>
                </RN.View>
                <RN.View style={{flex:2, alignContent:"center", justifyContent:'center', padding:10}}>
                    
                    <RNE.CheckBox
                        center
                        title='I am an area owner'
                        checkedColor='yellow'
                        textStyle={{color:'#eee', fontSize:16, fontWeight:'500', letterSpacing:1.3}}
                        onIconPress={() => this.setState({isareaowner:!this.state.isareaowner})}
                        onPress={() => this.setState({isareaowner:!this.state.isareaowner})}
                        containerStyle={{width:'70%', backgroundColor:'transparent', borderWidth:0, alignContent:'center', justifyContent:'center', alignItems:'center'}}
                        checked={this.state.isareaowner}
                    />
                    <Button title="Sign Up"
                        onPress={async () => await this.signUp()} 
                        containerStyle={{height:40, marginBottom:10, backgroundColor:'#fff'}}
                        textStyle={{color:Colors.headerBackground}}/>
                </RN.View>
            </RN.KeyboardAvoidingView>
        )
    }
}


const loginSignupNavigator = createMaterialTopTabNavigator({
        "Login":{
            screen:LoginPage,
        },
        "Sign Up":{
            screen:SignUpPage
        }
    },{
        swipeEnabled:true,
        tabBarOptions:{
            style:{display:'none'}
        },
        lazy:true
    })

const LandingNavigator = createStackNavigator(
    {
        "Home":{
                screen:LandingPage, 
                title:"Home",
                navigationOptions:{
                    header:null
            }
        },
        "Login":{
                screen:loginSignupNavigator,
                title:'Login',
                navigationOptions:{
                    header:null
            }
        },
        "Create Area":{
            screen:CreateArea,
            title:'Create Area',
            navigationOptions:{
                header:null
            }
        },
    },
);

const styles = RN.StyleSheet.create({
    labelStyle:{
      color:'#ccc', 
      fontSize:14, 
      letterSpacing:1.5
    },
    selectedStyle:{
        backgroundColor:Colors.headerBackground, 
        height:30, 
        paddingVertical:5, 
        paddingHorizontal:15, 
        alignContent:'center',
        justifyContent:'center', 
        borderRadius:15
    },
    unSelectedStyle:{
        backgroundColor:"transparent", 
        height:30, 
        paddingVertical:5, 
        paddingHorizontal:15, 
        alignContent:'center',
        justifyContent:'center', 
        borderRadius:15
    },
    forgotPasswordStyle:{
        textAlign:'center', 
        color:"#ccc", 
        fontSize:12
    },
  });


export default Navigation.createAppContainer(LandingNavigator);