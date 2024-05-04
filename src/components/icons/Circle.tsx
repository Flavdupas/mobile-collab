import * as React from "react";
import { View, ViewStyle } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface CircleProps {
    style?: ViewStyle;
    reversed?: boolean;
}

const Circle: React.FC<CircleProps> = ({ style, reversed }) => (
    <View style={style}>
        {!reversed && <Svg

            width={185}
            height={180}
            fill="none"

        >
            <Path
                stroke="url(#a)"
                d="M199.5 87c0 54.952-44.548 99.5-99.5 99.5S.5 141.952.5 87 45.048-12.5 100-12.5s99.5 44.548 99.5 99.5Z"
            />
            <Defs>
                <LinearGradient
                    id="a"
                    x1={100}
                    x2={100}
                    y1={-13}
                    y2={187}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop offset={0.333} stopColor="#fff" stopOpacity={0} />
                    <Stop offset={0.958} stopColor="#fff" />
                </LinearGradient>
            </Defs>
        </Svg>}
        {reversed && <Svg
            width={145}
            height={150}
            fill="none"

        >
            <Path
                stroke="url(#a)"
                d="M199.929 81.429c0 54.952-44.548 99.5-99.5 99.5s-99.5-44.548-99.5-99.5 44.548-99.5 99.5-99.5 99.5 44.548 99.5 99.5Z"
            />
            <Defs>
                <LinearGradient
                    id="a"
                    x1={100.429}
                    x2={100.429}
                    y1={-18.571}
                    y2={181.429}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#fff" />
                    <Stop offset={0.589} stopColor="#fff" stopOpacity={0} />
                </LinearGradient>
            </Defs>
        </Svg>}
    </View>

)
export default Circle
