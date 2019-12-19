import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import Header from "../Components/Header";
const Window = RN.Dimensions.get("window");
const Screen = RN.Dimensions.get("screen");
const height = Window.height;
const width = Window.width;
import { black } from "ansi-colors";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';



export default class CreateTeam extends React.Component{
    state = {
        image: null,
        teamname: "",
        shortname: "",
        contactnumber:null,
        description:"",
    }

    componentDidMount() {
        this.getPermissionAsync();
        console.log('hi');
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        }
    }
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
        });

        console.log(result);

        if (!result.cancelled) {
        this.setState({ image: result.uri });
        }
    }
    checkValid(){

    }
    render(){
        let image = this.state.image
        return(
            <RN.View style={{flex:1,backgroundColor:Colors.postBackground}}>
                <Header title="Create New Team" navigation={this.props.navigation}/>
                <RN.View style={{flex:8}}>
                    <NB.Form>
                        <NB.Item floatingLabel>
                            <NB.Label >
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="users" type="Entypo"/>
                                <RN.Text style={styles.labelStyle}>  Team Name</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.teamname} onChangeText={(teamname)=>this.setState({teamname})} autoCapitalize="none" autoCompleteType="username"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="tournament" type="MaterialCommunityIcons"/>
                                <RN.Text style={styles.labelStyle}>  Short Name</RN.Text>
                                <RN.Text>{this.state.shortname}</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.shortname} onChangeText={(shortname)=>this.setState({shortname})} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="telephone" type="Foundation"/>
                                <RN.Text style={styles.labelStyle}>  Contact Number</RN.Text>
                            </NB.Label>
                            <NB.Input keyboardType="number-pad" value={this.state.contactnumber} onChangeText={(contactnumber)=>this.setState({contactnumber})} style={{fontSize:18,color:"white"}} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Label style={{margin:20,marginTop:50,alignSelf:"center"}} onPress={this._pickImage}>
                            <NB.Icon style={{fontSize:20,color:"#ccc"}} name="photo" type="MaterialIcons"/>
                            <RN.Text style={styles.labelStyle}> Add Logo</RN.Text>
                        </NB.Label>
                        <RN.View style={{alignSelf:"center"}}>
                            {image &&
                            <RN.Image source={{ uri: image }} style={styles.image} />}
                        </RN.View>
                        
                    </NB.Form>
                </RN.View>
                <RN.View style={{flex:1,justifyContent:"center" ,marginBottom:20,alignItems:"center"}}>
                    <Button title={"CREATE TEAM"} />
                </RN.View>
            </RN.View>
        )
    }
}

const styles = RN.StyleSheet.create({
    headerFlex:{
        flex:2,
        flexDirection:'row',
        backgroundColor:Colors.backgroundGreen,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    labelStyle:{
        color:'#ccc', 
        fontSize:14, 
        letterSpacing:1.5
    },
    image:{
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "green",
    },
})