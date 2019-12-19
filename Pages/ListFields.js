import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import MapView from "react-native-maps";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Colors from "../Config/Colors";
import Header from "../Components/Header";

const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;


class Field extends React.Component{
    render(){
        var {field} = this.props;
        return(
            <RN.View style={styles.FieldRowView}>
                <RN.View style={styles.FieldHeader}>
                    <RN.Text style={styles.FieldHeaderText}>{field.name}</RN.Text>
                    <NB.Icon style={{color:'#eee'}} name="chevron-right" type="Entypo"/>
                </RN.View>  
                <RN.View style={styles.InfoField}>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={styles.InfoLabel}>Location</RN.Text>
                        <RN.Text style={styles.InfoLabel}>Distance</RN.Text>
                        <RN.Text style={styles.InfoLabel}>Contact</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={styles.InfoText}>{field.position}</RN.Text>
                        <RN.Text style={styles.InfoText}>3km away</RN.Text>
                        <RN.Text style={styles.InfoText}>{field.contact}</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.View>
        )
    }
}

var field = {
    name: 'TT Arena',
    position:'Maslak/Istanbul',
    contact: '+90 544 444 44 44',
    location: {
        latitude: 40.8279365,
        longitude: 14.1930611,
        latitudeDelta: 0.020,
        longitudeDelta: 0.020,
    },
}


export default class ListMatches extends React.Component{
    render(){
        return(
            <RN.View style={styles.FieldsListView}>
                <Header title="Fields" navigation={this.props.navigation} drawer={true}/>
                <RN.ScrollView contentContainerStyle={{height:height*.7}}>
                    <Field field = {field}/>
                    <Field field = {field}/>
                </RN.ScrollView>
            </RN.View>
        )
    }
}


const styles = RN.StyleSheet.create({
    FieldRowView:{
        height:height*.2, 
        width:width*.9, 
        backgroundColor:"#2a804b", 
        marginVertical:5,
        overflow:'hidden',
        borderRadius:20,
        marginTop:15
    },
    FieldHeader:{
        flex:3, 
        backgroundColor:'#1d6639', 
        overflow:'hidden', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center', 
        paddingHorizontal:5
    },
    FieldHeaderText:{
        color:'#fff', 
        fontSize:16, 
        letterSpacing:2, 
        fontWeight:'500', 
        marginHorizontal:5
    },
    InfoField:{
        flex:5, 
        flexDirection:'row', 
        alignContent:'center', 
        alignItems:'center', 
        padding:10,    
    },
    InfoLabel:{
        fontSize:12,
        fontWeight:'600', 
        color:'#fff', 
        letterSpacing:2
    },
    InfoText:{
        fontSize:12,
        fontWeight:'300', 
        color:'#eee', 
        letterSpacing:2,
        textAlign:'right'
    },
    FieldsListView:{
        width:width, 
        height:height, 
        backgroundColor:Colors.postBackground, 
        alignItems:'center', 
    },
    FieldsListHeader:{
        height:height*.2, 
        width:width, 
        alignItems:'center', 
        justifyContent:'center', 
        padding:5
    },
    FieldsListText:{
        fontSize:24, 
        color:'#fff', 
        elevation:4, 
        shadowColor:'black', 
        shadowOpacity:.9, 
        shadowOffset:{width:0, height:2}, 
        letterSpacing:2, 
        fontWeight:'800'
    },
})