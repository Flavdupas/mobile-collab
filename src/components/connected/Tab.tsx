import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Platform } from "react-native";
import { MAIN_COLOR } from "../../constants/Color";
import { Link, router } from "expo-router";
import Home from "../icons/Home";
import Document from "../icons/Document";
import Post from "../icons/Post";
import Heart from "../icons/Heart";
import Chat from "../icons/Chat";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomTabs = () => {
  const styles = StyleSheet.create({
    body: {
      height: Platform.OS === "ios" ? 115 : 100,
      position: "absolute",
      width: "100%",
      bottom: 0,
      paddingHorizontal: 15,
    },
    tabs: {
      backgroundColor: "#fff",
      width: "100%",
      height: 55,
      borderRadius: 50,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
    active: {
      position: "absolute",
      backgroundColor: MAIN_COLOR,
      height: 40,
      width: 40,
      borderRadius: 25,
      left: 29,
    },
  });

  return (
    <LinearGradient
      style={styles.body}
      colors={["rgba(38,30,53,.4)", MAIN_COLOR]}
    >
      <View style={styles.tabs}>
        <View style={styles.active} />
        <TouchableOpacity onPress={() => router.push("/home/")}>
          <Home color={"#fff"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/home/service")}>
          <Document />
        </TouchableOpacity>

        <Post />
        <Heart />
        <Chat />
      </View>
    </LinearGradient>
  );
};

export default CustomTabs;
