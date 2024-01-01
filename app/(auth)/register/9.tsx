import { View, StyleSheet,Text } from "react-native";
import Button from "../../../src/components/auth/Navigate";
import LottieView from "lottie-react-native";
import RegisterNineController from "../../../src/viewController/auth/register/9";
import global from "../../../src/constants/Global";
import { MAIN_COLOR } from "../../../src/constants/Color";

const RegisterNine = () => {
  return (
    <View style={[global.body, styles.body]}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          style={styles.lottie}
          source={require("../../../src/assets/animations/Success.json")}
        />
        <Text style={styles.title}>Félicitation</Text>
        <Text style={styles.text}>Votre inscription a bien été prise en compte, un mail vous sera envoyé quand votre compte sera validé par l’un de nos administrateur</Text>
      </View>
      <RegisterNineController />
    </View>
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

export default RegisterNine;
