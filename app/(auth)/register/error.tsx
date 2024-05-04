import { View, StyleSheet,Text } from "react-native";
import LottieView from "lottie-react-native";
import RegisterNineController from "../../../src/viewController/auth/register/success";
import global from "../../../src/constants/Global";
import { MAIN_COLOR } from "../../../src/constants/Color";
import RegisterTenController from "../../../src/viewController/auth/register/error";

const RegisterTen = () => {
  return (
    <View style={[global.body, styles.body]}>
      <View style={styles.container}>
        <LottieView
          autoPlay
            loop
            
          style={styles.lottie}
          source={require("../../../src/assets/animations/Error.json")}
        />
        <Text style={styles.title}>Erreur</Text>
        <Text style={styles.text}>Nous avons rencontré une erreur durant votre inscription, si cela ce reproduit, contacter nos administrateur en charge</Text>
      </View>
      <RegisterTenController />
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
    width:150,
    height:150,
  }
});

export default RegisterTen;
