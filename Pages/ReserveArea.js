import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import DatePicker from "react-native-datepicker";
import moment, { now } from "moment";
import Firebase from "../Config/Firebase";
const window = RN.Dimensions.get("window");
const width = window.width;
const height = window.height;



class CustomPicker extends React.Component{
    render(){
        return(
            <RN.View style={{marginVertical:height*.01}}>
                <RN.Text style={{fontSize:14, color:'#fff', fontWeight:'200'}}>{this.props.placeholder}</RN.Text>
                <RN.View style={{borderRadius:5, overflow:'hidden', elevation:5}}>
                    <RN.Picker
                        mode="dropdown"
                        selectedValue={this.props.selected}
                        style={{backgroundColor:'#fff', width:width*.7, height: height*.05}}
                        onValueChange={item => this.props.onValueChange(item)}>
                        {this.props.items.map(item => <RN.Picker.Item label={item.name} value={item.value} key={item.value}/>)}   
                    </RN.Picker>
                </RN.View>
            </RN.View>       
        );
    }
}


class TimePicker extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            time:12,
            active:false
        }
    }
    render(){
        let {that} = this.props;
        return(
            <RN.View style={{alignContent:'center', alignItems:'center', padding:8}}>
                <NB.Item>
                    <NB.Label>
                        <NB.Icon style={{fontSize:20,color:"#ccc"}} name="clock" type="Entypo"/>
                        <NB.Text style={{fontSize:14,color:"#ccc", paddingLeft:10}}>Select Hour</NB.Text>
                    </NB.Label>
                    <RN.Picker  ref={c => this.picker = c}
                                mode="dropdown"
                                selectedValue={this.state.time}
                                onValueChange={value => {that.setState({selectedTime:value}); this.setState({time:value})}}
                                style={{flex:1, height: 50, width:width*.3}}
                                itemStyle={{textAlign:'center'}}>
                        <RN.PickerItem value={12} label="12:00"/>
                        <RN.PickerItem value={13} label="13:00"/>        
                        <RN.PickerItem value={14} label="14:00"/>        
                        <RN.PickerItem value={15} label="15:00"/>        
                        <RN.PickerItem value={16} label="16:00"/>        
                        <RN.PickerItem value={17} label="17:00"/>        
                        <RN.PickerItem value={18} label="18:00"/>        
                        <RN.PickerItem value={19} label="19:00"/>        
                        <RN.PickerItem value={20} label="20:00"/>
                        <RN.PickerItem value={21} label="21:00"/>
                        <RN.PickerItem value={22} label="22:00"/>
                        <RN.PickerItem value={23} label="23:00"/>
                        <RN.PickerItem value={24} label="00:00"/>
                    </RN.Picker>
                    
                    
                </NB.Item>
            </RN.View>
        )
    }
}



export default class ReserveArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible:props.modalVisible,
            selectedTeam: null,
            selectedDate: new Date(),
            selectedTime: 12,
            showTimePicker:false
        }
    }
    setDate(date){
        this.setState({selectedDate:date})
    }
    sendRequest(){
        let areaid = this.props.areaid;
        let requestid = "";
        let user = Firebase.auth().currentUser;
        let requestRef = Firebase.firestore().collection('areas').doc(areaid).collection('requests');
        let userRef = Firebase.firestore().collection('users').doc(user.uid).collection('requests');
        let arearequest = {
            requestowner:user.displayName,
            requestowneruid:user.uid,
            time:this.state.selectedTime,
            date:this.state.selectedDate.toISOString().slice(0,10),
            status:"Waiting"
        };
        requestRef.add(arearequest).then(doc => requestid = doc.id)
        let userrequest = {
            requestid:requestid,
            areaname:this.props.that.state.areadata.name,
            areaid:areaid,
            time:this.state.selectedTime,
            date:this.state.selectedDate.toISOString().slice(0,10),
            status:"Waiting"
        };
        userRef.add(userrequest)
        RN.Alert.alert('Success!', "Your request is sent to area owner");
        this.props.that.setState({modalVisible:false})
    }
    render(){
        let {that} = this.props;
        var date = new Date().getDate() //Current Date
        var month = new Date().getMonth() //Current Month
        var year = new Date().getFullYear() //Current Year
        return(
            <RN.View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <RNE.Overlay 
                    isVisible={that.state.modalVisible} 
                    windowBackgroundColor="rgba(255, 255, 255, .8)"
                    overlayStyle={{backgroundColor:Colors.backgroundGreen, width:width*0.9, height:height*.8, borderRadius:width*.1, overflow:'hidden'}}
                    containerStyle={{width:width, height:height, flex:1}}
                    animationType="fade"
                    animated={true}
                    onBackdropPress={() => that.setState({modalVisible: false})}>
                        <RN.View style={{flex:1, alignItems:'center', alignContent:'center'}}>
                            <NB.Item disabled style={{marginTop:30}}>
                                <NB.Label>
                                    <NB.Icon style={{fontSize:20,color:"#ccc"}} name="calendar" type="Entypo"/>
                                </NB.Label>
                                <NB.DatePicker
                                    defaultDate={new Date(year, month, date)}
                                    minimumDate={new Date(year, month, date)}
                                    maximumDate={new Date(year+1, month, date)}
                                    locale={"tr"}
                                    timeZoneOffsetInMinutes={undefined}
                                    modalTransparent={true}
                                    animationType={"slide"}
                                    androidMode={"default"}
                                    placeHolderText="Select Match Date"
                                    textStyle={{ color: "white" }}
                                    placeHolderTextStyle={{ color: "#d3d3d3" }}
                                    onDateChange={(date) => this.setDate(date)}
                                    disabled={false}
                                />
                            </NB.Item>
                            <TimePicker that={this}/>
                            <Button title="Send Request" containerStyle={{width:width*.5}} onPress={() => this.sendRequest()}/>
                        </RN.View>
                </RNE.Overlay>
            </RN.View>
        )
    }
}
