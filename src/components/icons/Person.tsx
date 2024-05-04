import { View, StyleSheet,Image } from "react-native";

interface PersonProps {
  style?: any;
}

const Person: React.FC<PersonProps> = ({ style }) => {
  return (
    <View style={[styles.body, style]}>
      <Image style={styles.image}  source={require("../../assets/images/connected/drawer/person.png")} />
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

export default Person;
