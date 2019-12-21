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


export default class CreateArea extends React.Component{
    state={
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
        this.setState({location:{...this.state.location,
            latitudeDelta:0.001,
            longitudeDelta:0.001},
            loaded:true});
        RN.Alert.alert(this.state.location);

        
      };
    
    
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
                <Header title="Create Area"/>
                <RN.ScrollView style={{height:"65%"}}>
                    <NB.Form>
                        <NB.Item floatingLabel>
                            <NB.Label >
                                <RN.Text style={styles.labelStyle}>  Area Name</RN.Text>
                            </NB.Label>
                            <NB.Input style={{fontSize:18,color:"white"}} value={this.state.areaName} onChangeText={(areaName)=>this.setState({areaName})} autoCapitalize="none" autoCompleteType="username"/>
                        </NB.Item>
                        <NB.Item floatingLabel >
                            <NB.Label>
                                <RN.Text style={styles.labelStyle}>  Contact Number</RN.Text>
                            </NB.Label>
                            <NB.Input keyboardType="number-pad" value={this.state.contactnumber} onChangeText={(contactnumber)=>this.setState({contactnumber})} style={{fontSize:18,color:"white"}} autoCapitalize="none"/>
                        </NB.Item>
                        <NB.Label style={{margin:20,marginTop:50,alignSelf:"center"}} onPress={this._pickImage}>
                            <NB.Icon style={{fontSize:20,color:"#ccc"}} name="photo" type="MaterialIcons"/>
                            <RN.Text style={styles.labelStyle}> Add Photo</RN.Text>
                        </NB.Label>
                        <RN.View style={{alignSelf:"center"}}>
                            {image &&
                            <RN.Image source={{ uri: image }} style={styles.image} />}
                        </RN.View>
                        <RN.View >
                        {this.state.loaded && <MapView
                            provide="google"
                            style={{width:300,height:300,justifyContent:"center",alignSelf:"center",marginTop:20}}
                            initialRegion={{
                                latitude:this.state.location.latitude,
                                longitude:this.state.location.longitude,
                                latitudeDelta:this.state.location.latitudeDelta,
                                longitudeDelta:this.state.location.longitudeDelta,
                            }}>

                                <MapView.Marker draggable
                                coordinate={{
                                    latitude:this.state.location.latitude,
                                    longitude:this.state.location.longitude,
                                    latitudeDelta:this.state.location.latitudeDelta,
                                    longitudeDelta:this.state.location.longitudeDelta,
                                }}
                                onDragEnd={async (e) => {
                                     await this.setState({ x: e.nativeEvent.coordinate });
                                    RN.Alert.alert(this.state.x);
                                }}
                                />
                            </MapView>}
                        </RN.View>
                        
                    </NB.Form>
                </RN.ScrollView>
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