import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import DatePicker from "react-native-datepicker";
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




export default class ReserveArea extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalVisible: false,
            selectedTeam: null,
            selectedField: null,
            selectedDate: new Date(),
            selectedTime: new Date()
        }
    }
    setDate(newDate) {
        this.setState({ selectedDate: newDate });
    }
    render(){

        return(
            <RN.View style={{backgroundColor:'black', flex:1, justifyContent:'center', alignItems:'center'}}>
                <Button title="Reserve" onPress={() => this.setState({modalVisible:!this.state.modalVisible})}
                        containerStyle={{width:width*.5, height:height*.05, backgroundColor:'#ccc'}}/>
                <RNE.Overlay 
                    isVisible={this.state.modalVisible} 
                    windowBackgroundColor="rgba(255, 255, 255, .7)"
                    overlayStyle={{backgroundColor:Colors.backgroundGreen, width:width*0.9, height:height*.8, borderRadius:width*.1, overflow:'hidden'}}
                    containerStyle={{width:width, height:height, flex:1}}
                    onBackdropPress={() => this.setState({modalVisible: false})}>
                        <RN.View style={{flex:1, alignItems:'center', alignContent:'center'}}>
                            <RN.View style={{flex:7}}>
                                <CustomPicker 
                                    selected={this.state.selectedTeam}
                                    placeholder="Select opponent..."
                                    items={[{name:"Napoli", value:'0'}, {name:"Milan", value:'1'}, {name:"Juventus", value:'2'}]}
                                    onValueChange={item => this.setState({selectedTeam:item})}/>
                                
                                <CustomPicker 
                                    selected={this.state.selectedField}
                                    placeholder="Select the field..."
                                    items={[{name:"San Paolo", value:'0'}, {name:"San Siro", value:'1'}, {name:"Juventus Stadium", value:'2'}]}
                                    onValueChange={item => this.setState({selectedField:item})}/>
                            </RN.View>
                            <RN.View style={{flex:1, backgroundColor:'#aaa'}}></RN.View>
                        </RN.View>
                </RNE.Overlay>
            </RN.View>
        )
    }
}
