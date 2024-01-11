import { ReactNode } from "react";
import { ColorValue, View, ViewStyle } from "react-native";
import Svg, { Path } from "react-native-svg";

interface PolygoneProps {
  background: ColorValue;
  style?: ViewStyle;
  children?: ReactNode;
}

const Polygone: React.FC<PolygoneProps> = ({ background, children, style }) => {
  return (
    <View style={style}>
      <Svg width={44} height={38} fill="none">
        <Path
          fill={background}
          stroke="#38304B"
          strokeWidth={2.5}
          d="m32.32 2 10 17.32-10 17.321h-20l-10-17.32L12.32 2h20Z"
        />
      </Svg>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Polygone;
