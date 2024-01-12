import { View, StyleSheet,Image, ViewStyle } from "react-native";

interface MoneyProps {
  style?: ViewStyle;
  width?: number;
  height?:number;
}

const Money: React.FC<MoneyProps> = ({ style, width, height }) => {
  const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {  
    resizeMode:"contain",
    width: width ?? 12.29,
    height: height ?? 20,
  }
});
  return (
    <View style={[styles.body, style]}>
      <Image style={styles.image}  source={require("../../assets/images/connected/common/money.png")} />
    </View>
  );
};



export default Money;
