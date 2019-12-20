import React from "react";
import * as RN from "react-native";
import * as RNE from "react-native-elements";
import MapView from "react-native-maps";
import * as NB from "native-base";
import Constants from 'expo-constants';
import Colors from "../Config/Colors";
import Header from "../Components/Header";
import AreaInfo from './AreaInfo';
import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation";
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;
const statusBarHeight = Constants.statusBarHeight;
import Firebase from '../Config/Firebase';
require('firebase/firestore');


class Field extends React.Component{
    render(){
        var {field, navigation} = this.props;
        return(
            <RN.TouchableOpacity style={styles.FieldRowView} onPress={() => navigation.navigate('AreaInfo', {uid:field.id})}>
                <RN.View style={styles.FieldHeader}>
                    <RN.Text style={styles.FieldHeaderText}>{field.name}</RN.Text>
                    <NB.Icon style={{color:'#eee'}} name="chevron-right" type="Entypo"/>
                </RN.View>  
                <RN.View style={styles.InfoField}>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={styles.InfoLabel}>Location</RN.Text>
                        <RN.Text style={styles.InfoLabel}>Rating</RN.Text>
                        <RN.Text style={styles.InfoLabel}>Contact</RN.Text>
                    </RN.View>
                    <RN.View style={{flex:1}}>
                        <RN.Text style={styles.InfoText}>{field.city}</RN.Text>
                        <RN.Text style={styles.InfoText}>{field.rating} ({field.ratingcount})</RN.Text>
                        <RN.Text style={styles.InfoText}>{field.contact}</RN.Text>
                    </RN.View>
                </RN.View>
            </RN.TouchableOpacity>
        )
    }
}


class ListFields extends React.Component{
    state={
        areas:[],
        loaded:false
    }
    async loadAreas(){
        let that = this;
        let areas = [];
        let areasRef = Firebase.firestore().collection('areas');
        await areasRef.get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                let area = doc.data();
                area.id = doc.id;
                areas.push(area);
            })
        })
        this.setState({areas:areas, loaded:true});
    }
    async componentWillMount(){
        await this.loadAreas();
    }
    render(){
        let {areas, loaded} = this.state;
        if(!loaded) return <RN.View/>
        return(
            <RN.View style={styles.FieldsListView}>
                <Header title="Fields" navigation={this.props.navigation} drawer={true}/>
                <RN.FlatList 
                    data={areas}
                    renderItem={item => <Field field={item.item} navigation={this.props.navigation}/>}
                    keyExtractor={item => item.id}
                />
            </RN.View>
        )
    }
}

const ListStack = createStackNavigator({
    List:{
        screen:ListFields,
        navigationOptions:{
            header:null,
        }
    },
    AreaInfo:{
        screen:AreaInfo,
        navigationOptions:{
            header:null
        }
    }
})

export default createAppContainer(ListStack);


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