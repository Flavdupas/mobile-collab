import { View, Image,ImageStyle } from "react-native";
interface LogoProps {
    style?:ImageStyle;
}
const Logo: React.FC<LogoProps> = ({style}) => {
  return (
    <View>
      <Image source={require("../../assets/images/logo.png")} style={style}/>
    </View>
  );
};

export default Logo;
