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


function generateStat(){
    return Math.floor(Math.random() * 65) + 35;
}


export default class PlayerStats extends React.Component{
    constructor(props) {
        super(props);
        
    }
    
    render(){
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
                            data: [generateStat(), generateStat(), generateStat(), generateStat(), generateStat()],
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
                        borderRadius: 16,
                    }}
                />
            </RN.View>
        )
    }
}