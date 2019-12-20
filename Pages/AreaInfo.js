import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
const Window = RN.Dimensions.get("window");
const Screen = RN.Dimensions.get("screen");
const height = Window.height;
const width = Window.width;
import * as Rating from "react-native-ratings";
import MatchHistory from './MatchHistory';
import PlayerTeams from './PlayerTeams';
import PlayerStats from "./PlayerStats";
import MapView from "react-native-maps";
//import {MapView} from "expo"
import Firebase from '../Config/Firebase';
require('firebase/firestore');
import StarRating from 'react-native-star-rating';




class AreaInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:1,
            areadata:{},
            loaded:false,
            ratingcolor: '#fff'
        }
    }

    async loadArea(uid){
        let that = this;
        let areaRef = Firebase.firestore().collection('areas').doc(uid);
        areaRef.get().then(doc => {
            if(doc.exists){
                let area = doc.data();
                area.canVote = !area.votes.includes(Firebase.auth().currentUser.uid);
                that.setState({areadata:area, loaded:true})
            }
        })
    }

    getRatingColor(){
        let rating = this.state.areadata.rating;
        let red = 200 + (rating-1) * 13.75;
        let green = 200 + (rating-1) * 13.75;
        let blue = 153 - (rating-1) * 25.5;
        let color = 'rgba('+red.toString()+','+green.toString()+','+blue.toString()+',1)';
        return color;
    }
    async componentWillMount(){
        let area = this.props.navigation.getParam('area');
        if(area){
            this.setState({areadata:area, loaded:true})
        }
        else await this.loadArea(this.props.navigation.getParam('uid'));
    }
    rateFinish(rating){
        RN.Alert.alert('You gave ' + rating.toString() + ' points', 
                       'Do you confirm this rating', 
                    [{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                     {text: 'Yes', onPress: () => this.giveRating(rating), style:'default'}])
    }
    async giveRating(newRating){
        let {rating, ratingcount, votes, canVote} = this.state.areadata;
        let areaRef = Firebase.firestore().collection('areas').doc(this.state.areadata.id);
        let updatedRating = (rating*ratingcount + newRating) / (++ratingcount);
        updatedRating = updatedRating.toFixed(1);
        votes.push(Firebase.auth().currentUser.uid);
        this.setState({areadata:{...this.state.areadata, rating:updatedRating, votes:votes, ratingcount:ratingcount , canVote:false}});
        await areaRef.update({
            rating:updatedRating,
            ratingcount:ratingcount,
            votes:votes
        })
    }
    render(){
        let {areadata, loaded} = this.state;
        if(!loaded) return <RN.View/>
        return(
            <RN.View style={{flex:1}}>
                <RN.View style={styles.imageView}>
                    <RN.Image source={{uri:areadata.photourl}}
                              style={{width:width, height:height*0.45, resizeMode:'cover', left:0, right:0, position:"absolute"}}/>
                    <RN.TouchableOpacity onPress={()=> this.props.navigation.pop()} style={{width:40, height:40, top:height*.05, left:width*.05}}>
                        <NB.Icon name="chevron-left" type="Entypo" style={{color:'#111'}}/>
                    </RN.TouchableOpacity>
                </RN.View>
                <RN.View style={styles.infoView}>
                    <RN.View style={styles.firstSection}>
                        <RN.View style={{width:width*0.65, alignItems:'flex-start', justifyContent:'center'}}>
                            <RN.Text style={{fontSize:20, fontWeight:'bold', color:Colors.postBackground}}>{areadata.name}</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>{areadata.city}</RN.Text>
                            <RN.Text style={{fontSize:12, fontWeight:'200', color:Colors.locationBackground}}>4 km away</RN.Text>
                        </RN.View>
                        <RN.View style={{width:width*0.25, justifyContent:'center'}}>
                            <Button title="RESERVE" onPress={() => this.props.navigation.navigate('ReserveArea')}
                                    containerStyle={{backgroundColor:'#fff', width:width*0.25, height:height*0.04}}
                                    textStyle={{color:Colors.postBackground, fontSize:10, fontWeight:'600'}}/>
                            <RN.View>
                                <RN.Text style={{fontSize:16, fontWeight:'600', color:'#fff', textAlign:'center'}}>{areadata.price}₺ / Hour</RN.Text>
                            </RN.View>                                                       
                        </RN.View>
                    </RN.View>
                    <RN.View style={styles.secondSection}>
                        <RN.Text style={{textAlign:'center', fontSize:16, fontWeight:'600', color:this.getRatingColor()}}>{areadata.rating} / 5</RN.Text>
                        <Rating.Rating
                            type="custom"
                            ratingColor={this.getRatingColor()}
                            startingValue={areadata.rating}
                            readonly={!areadata.canVote}
                            showRating={false}
                            fractions={1}
                            onFinishRating={rating => this.rateFinish(rating)}
                            tintColor={Colors.backgroundGreen}
                            
                        />
                        <RN.Text style={{textAlign:'center', fontSize:14, fontWeight:'400', color:Colors.headerText}}>{areadata.ratingcount} reviews</RN.Text>
                    </RN.View>
                    <RN.TouchableOpacity style={styles.thirdSection}>
                        <RN.View style={{width:width*.8, height:height*.08, flexDirection:'row', justifyContent:'space-around'}}>
                            <NB.Icon name="location" type="Entypo" style={{fontSize:18, color:Colors.postSubText}}/>
                            <RN.Text style={{color:Colors.postText, fontSize:18, fontWeight:'700', textAlign:'center'}}>Location</RN.Text>
                            <NB.Icon name="ios-arrow-forward" type="Ionicons" style={{fontSize:18, color:Colors.postSubText, textAlign:'center'}}/>
                        </RN.View>
                        <RN.View style={{width:width*.7, height:height*.22, justifyContent:'center', 
                                         borderTopRightRadius:width*.15, borderBottomLeftRadius:width*.15, 
                                         borderBottomRightRadius:width*.05, borderTopLeftRadius:width*.05,
                                         overflow:'hidden'}}>
                            <MapView  style={{height:height*.22, width:width*.7}} 
                                        pointerEvents="none"
                                        provider="google"
                                        initialRegion={{
                                            latitude: areadata.latitude,
                                            longitude: areadata.longitude,
                                            latitudeDelta: 0.010,
                                            longitudeDelta: 0.010,
                                        }}>
                                <MapView.Marker coordinate={{latitude:areadata.latitude, longitude:areadata.longitude}}/>
                            </MapView>
                        </RN.View>
                    </RN.TouchableOpacity>

                </RN.View>
            </RN.View>
        )
    }
}





const styles = RN.StyleSheet.create({
    imageView:{
        zIndex:-1,
        left:0, 
        right:0, 
        bottom:height*0.55,
        top:0,
        padding:0,
        margin:0,
        width:'100%', 
        height:height*0.45,
        elevation:0
    },
    infoView:{
        zIndex:1, 
        elevation:3,
        shadowColor:'black',
        shadowOffset:{
            height:-2,
            width:0
        },
        alignContent:'center',
        justifyContent:'space-around',
        shadowOpacity:0.7,
        shadowRadius:5,
        backgroundColor:Colors.backgroundGreen,
        borderTopStartRadius:25,
        borderTopEndRadius:25,
        left:0, 
        right:0, 
        bottom:0, 
        top:-height*0.1, 
        width:'100%', 
        height:height*0.65, 
    },
    firstSection:{
        height:height*0.12, 
        width:width*.9, 
        flexDirection:'row', 
        alignContent:'center', 
        justifyContent:'space-between', 
        marginHorizontal:width*0.05
    },
    secondSection:{
        height:height*.1,
        width:width*.9,
        alignContent:'center',
        justifyContent:'center',
        marginHorizontal:width*.05
    },
    thirdSection:{
        height:height*0.34,
        width:width*.9,
        marginHorizontal:width*.05,
        marginVertical:height*0.02,
        backgroundColor:Colors.postBackground, 
        elevation:5, 
        borderRadius:45,
        overflow:'hidden',
        alignItems:'center',
        justifyContent:'center'
    }
})


export default AreaInfo;
