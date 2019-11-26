import React from "react";
import * as RN from "react-native";
import * as NB from "native-base";
import * as RNE from "react-native-elements";
import Constants from "expo-constants";
import Colors from "../Config/Colors";
import Button from "../Components/Button";
import * as Charts from "react-native-chart-kit";
const Window = RN.Dimensions.get("window");
const Screen = RN.Dimensions.get("screen");
const height = Window.height;
const width = Window.width;




export default class PlayerStats extends React.Component{
    constructor(props) {
        super(props);
        
    }
    
    render(){
        const data=[
            {
              name: 'Shooting',
              population: 32,
              color: 'rgba(131, 167, 234, 1)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 12,
            },
            {
              name: 'Passing',
              population: 70,
              color: '#F00',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Defending',
              population: 94,
              color: '#ffffff',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Pace',
              population: 72,
              color: 'rgb(0, 0, 255)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
        ];
        return(
            <RN.View>
                <Charts.LineChart
                    data={{
                        labels: [
                        'Shoot',
                        'Pass',
                        'Defence',
                        'Pace',
                        'Aggression',
                        ],
                        datasets: [
                        {
                            data: [20, 45, 94, 72, 82],
                            strokeWidth: 2,
                        },
                        ],
                    }}
                    width={width*.9}
                    height={height*.34}
                    fromZero={true}
                    chartConfig={{
                        backgroundColor: Colors.postBackground,
                        backgroundGradientFrom: Colors.postBackground,
                        backgroundGradientTo: Colors.postBackground,
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(33, 143, 95, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                    }}
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </RN.View>
        )
    }
}