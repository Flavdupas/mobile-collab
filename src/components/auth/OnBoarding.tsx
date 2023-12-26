import { View, StyleSheet, Image, Text, Dimensions } from "react-native";
import Round from "./Round";

const { width } = Dimensions.get("window");

interface onBoardingProps {
  item: {
    id: number;
    title: string;
    content: string;
    image: any;
  };
}
const OnBoarding: React.FC<onBoardingProps> = ({ item }) => {
  return (
    <View style={styles.body}>
      <View>
        <Image source={item.image} />
        <Round size={16} color="#FAAEAE" bottom={30} right={0} />
        <Round size={10} color="#8BE7FB" bottom={0} left={30} />
        <Round size={16} color="#8AFB88" top={0} left={30} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: width,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 40,
    paddingVertical: 10,
    gap: 20,
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    color: "#fff",
    opacity: 0.6,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default OnBoarding;
