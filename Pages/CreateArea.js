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
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Firebase from "../Config/Firebase";
require('firebase/firestore');
const areaRef = Firebase.firestore().collection('areas');

export default class CreateArea extends React.Component{
    state={
        district:"",
        areaName:"",
        image:null,
        adress:"",
        contactnumber:null,
        location:{
        },
        errorMessage:null,
        coordinates:{
        },
        loaded:false,
        x:{},
        price:null,
        locationAdded:false,
    }
    setLocation(){
        this.setState({coordinates:this.state.location.coords})
    }
    componentDidMount() {
        this.getPermissionAsync();
    }
    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }
        }
    }
    componentWillMount() {
        if (RN.Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      }
    
      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        
        this.setState({location:location.coords});
        await this.setState({location:{...this.state.location,
            latitudeDelta:0.001,
            longitudeDelta:0.001},
            loaded:true,});
            this.setState({x:{longitude:location.coords.longitude,latitude:location.coords.latitude}});
      };
    
    
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7
        });

        console.log(result);

        if (!result.cancelled) {
        this.setState({ image: result.uri });
        }
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



    createArea(){
        let inputs =this.state;
        if(inputs.areaName==""){
            RN.Alert.alert("Create failed","Area name cannot be empty.");
            return;
        }
        else if(inputs.district==""){
            RN.Alert.alert("Create failed","District name cannot be empty.");
            return
        }
        else if(inputs.contactnumber==""){
            RN.Alert.alert("Create failed","Contact number name cannot be empty.");
            return
        }
        else if(inputs.image==""){
            RN.Alert.alert("Create failed","Please upload photo of your pitch.");
            return
        }
        let areaid=null;
        areaRef.add({
            city:"Istanbul / "+this.state.district,
            name:this.state.areaName,
            contact:this.state.contactnumber,
            latitude:this.state.x.latitude,
            longitude:this.state.x.longitude,
            price:this.state.price,
            rating:2.5,
            ratingcount:0,
            votes:[],
        }).then(async (doc)=>{
            RN.Alert.alert(doc.id);
            let imageUri= await this.resimYukle(this.state.image,"/areas/"+doc.id);
            areaRef.doc(doc.id).update({
                photourl:imageUri
            });    
        });
        

    }

    render(){
        let image = this.state.image
        return(
            <RN.View style={{flex:1,backgroundColor:Colors.postBackground}}>
                <Header title="Create Area"/>
                <RN.ScrollView style={{height:"65%"}}>
                    <NB.Form>
                        <NB.Item floatingLabel>
                            <NB.Label >
                                <RN.Text style={styles.labelStyle}>  Area Name</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.areaName} onChangeText={(areaName)=>this.setState({areaName})} autoCapitalize="none" autoCompleteType="username"/>
                        </NB.Item>
                        <NB.Item floatingLabel>
                            <NB.Label >
                                <RN.Text style={styles.labelStyle}>  District Location</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.district} onChangeText={(district)=>this.setState({district})} autoCapitalize="none" autoCompleteType="username"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <RN.Text style={styles.labelStyle}>  Contact Number</RN.Text>
                            </NB.Label>
                            <NB.Input keyboardType="number-pad" value={this.state.contactnumber} onChangeText={(contactnumber)=>this.setState({contactnumber})} style={{fontSize:18,color:"white"}} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <RN.Text style={styles.labelStyle}>  Price</RN.Text>
                            </NB.Label>
                            <NB.Input keyboardType="number-pad" value={this.state.price} onChangeText={(price)=>this.setState({price})} style={{fontSize:18,color:"white"}} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Label style={{margin:20,marginTop:50,alignSelf:"center"}} onPress={this._pickImage}>
                            <NB.Icon style={{fontSize:20,color:"#ccc"}} name="photo" type="MaterialIcons"/>
                            <RN.Text style={styles.labelStyle}> Add Photo</RN.Text>
                        </NB.Label>
                        <RN.View style={{alignSelf:"center"}}>
                            {image &&
                            <RN.Image source={{ uri: image }} style={styles.image} />}
                        </RN.View>
                        <RN.View>
                        {this.state.loaded && <MapView
                            
                            style={{width:300,height:300,justifyContent:"center",alignSelf:"center",marginTop:20,borderRadius:40}}
                            initialRegion={this.state.location}>

                                <MapView.Marker draggable
                                coordinate={this.state.location}
                                onDragEnd={async (e) => {
                                     await this.setState({ x: e.nativeEvent.coordinate });

                                }}
                                />
                            </MapView>}
                        </RN.View>
                        
                    </NB.Form>
                </RN.ScrollView>
                <RN.View style={{flex:1,justifyContent:"center" ,marginBottom:20,alignItems:"center"}}>
                    <Button title="CREATE AREA" onPress={()=>this.createArea()} />
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