import { View, StyleSheet,Image } from "react-native";

interface PhoneProps {
  style?: any;
}

const Phone: React.FC<PhoneProps> = ({ style }) => {
  return (
    <View style={[styles.body, style]}>
      <Image style={styles.image}  source={require("../../../assets/images/auth/register/smartphone.png")} />
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
    width: 20,
    height: 20,
  }
});

export default Phone;
