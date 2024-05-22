import { View, StyleSheet,Text } from "react-native";
import LottieView from "lottie-react-native";
import global from "../../../src/constants/Global";
import { MAIN_COLOR } from "../../../src/constants/Color";
import ForgotFourController from "../../../src/viewController/auth/forgot/4";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ForgotPasswordFour = () => {
  return (
    <GestureHandlerRootView>
        <View style={[global.body, styles.body]}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          style={styles.lottie}
          source={require("../../../src/assets/animations/Success.json")}
        />
        <Text style={styles.title}>Félicitation</Text>
        <Text style={styles.text}>Votre mot de passe a été modifié avec succès</Text>
      </View>
      <ForgotFourController />
    </View>
    </GestureHandlerRootView>

  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: MAIN_COLOR,
  },
  container: {
    paddingTop:125,
    alignItems:"center",
    paddingHorizontal:20,
  },
  title: {
    color:"#fff",
    fontSize:42,
    fontWeight:"bold",
    marginBottom:5,
  },
  text: {
    fontSize:16,
    color:"#fff",
    textAlign:"center",
  },
  lottie: {
    width:175,
    height:175,
  }
});

export default ForgotPasswordFour;
