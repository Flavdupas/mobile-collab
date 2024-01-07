import { View, StyleSheet,Image } from "react-native";

interface MoneyProps {
  style?: any;
}

const Money: React.FC<MoneyProps> = ({ style }) => {
  return (
    <View style={[styles.body, style]}>
      <Image style={styles.image}  source={require("../../assets/images/connected/common/money.png")} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {  
    resizeMode:"contain",
    width: 12.29,
    height: 20,
  }
});

export default Money;
