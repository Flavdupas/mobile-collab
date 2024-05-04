import { View, Image, ViewStyle, ImageStyle } from "react-native";

interface ChevronProps {
  style?: ViewStyle;
  imageStyle?: ImageStyle;
}
const Chevron: React.FC<ChevronProps> = ({style,imageStyle}) => {
  return (
    <View style={style}>
      <Image style={imageStyle} source={require("../../assets/images/auth/register/chevron.png")} />
    </View>
  );
};

export default Chevron;
