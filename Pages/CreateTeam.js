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
import Firebase from "../Config/Firebase";
require('firebase/firestore');
const teamRef = Firebase.firestore().collection('teams');



export default class CreateTeam extends React.Component{
    state = {
        image: null,
        teamname: "",
        shortname: "",
        contactnumber:null,
        description:"",
        district:"",
    }
    async resimYukle(uri, resimYolu) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function() {
            resolve(xhr.response);
          };
          xhr.onerror = function(e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true);
          xhr.send(null);
        });
        const ref = Firebase.storage().ref().child(resimYolu);
        const snapshot = await ref.put(blob);
      
        blob.close();
        let url = await snapshot.ref.getDownloadURL();
        return url;
      }
    
    createTeam(){
        let inputs =this.state;
        if(inputs.teamname==""){
            RN.Alert.alert("Create failed","Team name cannot be empty.");
            return;
        }
        else if(inputs.shortname==""){
            RN.Alert.alert("Create failed","Short name cannot be empty.");
            return
        }
        if(inputs.teamname.length>20){
            RN.Alert.alert("Create failed","Team name cannot be longer than 20.");
            return;
        }
        else if(inputs.shortname.length>4){
            RN.Alert.alert("Create failed","Short name cannot be longer than 4.");
            return
        }
        else if(inputs.contactnumber==""){
            RN.Alert.alert("Create failed","Contact number name cannot be empty.");
            return
        }
        else if(inputs.image==null){
            RN.Alert.alert("Create failed","Please upload a logo.");
            return
        }
        let teamid=null;
        teamRef.add({
            city:"Istanbul / "+this.state.district,
            name:this.state.teamname,
            contact:this.state.contactnumber,
            shortname:inputs.shortname,
            founded:new Date().getTime(),
            totalmatches:0,
            leaderid:Firebase.auth().currentUser.uid,
        }).then(async (doc)=>{

            let imageUri= await this.resimYukle(this.state.image,"/teams/"+doc.id);
            teamRef.doc(doc.id).update({
                photourl:imageUri
            });    
        });
        

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
    render(){
        let image = this.state.image
        return(
            <RN.View style={{flex:1,backgroundColor:Colors.postBackground}}>
                <Header title="Create New Team" navigation={this.props.navigation} drawer={true}/>
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
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.shortname} onChangeText={(shortname)=>this.setState({shortname})} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <NB.Icon style={{fontSize:20,color:"#ccc"}} name="home" type="MaterialCommunityIcons"/>
                                <RN.Text style={styles.labelStyle}>  District</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.district} onChangeText={(district)=>this.setState({district})} autoCapitalize="none"/>
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
                    <Button title={"CREATE TEAM"} onPress={()=>this.createTeam()} />
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