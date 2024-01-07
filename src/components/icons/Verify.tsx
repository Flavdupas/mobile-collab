import { View, StyleSheet,Image } from "react-native";

interface VerifyProps {
  style?: any;
}

const Verify: React.FC<VerifyProps> = ({ style }) => {
  return (
    <View style={[styles.body, style]}>
      <Image style={styles.image}  source={require("../../assets/images/connected/common/verify.png")} />
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
    width: 12,
    height: 12,
  }
});

export default Verify;
