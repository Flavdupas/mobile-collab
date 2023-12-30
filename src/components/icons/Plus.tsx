import { View, StyleSheet,Image } from "react-native";

interface PlusProps {
  style?: any;
}

const Plus: React.FC<PlusProps> = ({ style }) => {
  return (
    <View style={[styles.body, style]}>
      <Image style={styles.image}  source={require("../../../assets/images/auth/register/plus.png")} />
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
    width: 22.5,
    height: 22.5,
  }
});

export default Plus;
