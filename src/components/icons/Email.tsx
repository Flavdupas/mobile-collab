import { StyleSheet, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";

interface EmailProps {
    style?:any;
}

const Email:React.FC<EmailProps> = ({style}) => {
  return (
    <View style={[styles.body,style]}>
      <Svg viewBox="0 0 24 24" fill="none">
        <G id="SVGRepo_bgCarrier" stroke-width="0" />
        <G
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        />

        <G id="SVGRepo_iconCarrier">
          <Path
            d="M4 7L10.94 11.3375C11.5885 11.7428 12.4115 11.7428 13.06 11.3375L20 7M5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8V16C3 17.1046 3.89543 18 5 18Z"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
    body: {
        justifyContent:'center',
        alignItems:'center',
    }
});

export default Email;
