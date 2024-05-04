import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Chevron from "../../icons/ChevronWhite";
import { router } from "expo-router";

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={router.back}>
        <View style={styles.contianerBackBtn}>
          <Chevron />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  contianerBackBtn: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Header;
