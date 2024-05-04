import { StyleSheet } from "react-native";
import { MAIN_COLOR } from "./Color";

const connectedStyle = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
  },
  title: {
    fontSize:32,
    color: "#fff",
    fontWeight: "bold",
  }
});

export default connectedStyle;
