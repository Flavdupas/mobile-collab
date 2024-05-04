import { View, StyleSheet,Image } from "react-native";

interface ChevronProps {
  style?: any;
}

const Chevron: React.FC<ChevronProps> = ({ style }) => {
  return (
    <View style={[styles.body, style]}>
      <Image style={styles.image}  source={require("../../assets/images/connected/drawer/chevron.png")} />
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

export default Chevron;
