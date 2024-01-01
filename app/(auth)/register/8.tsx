import Button from "../../../src/components/auth/Navigate";
import InputPassword from "../../../src/components/auth/input/Password";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import { StyleSheet, Text, View } from "react-native";
import global from "../../../src/constants/Global";
import RegisterHeightController from "../../../src/viewController/auth/register/8";

const RegisterHeight = () => {
  return (
    <RegisterLayout>
      <View style={global.body}>
        <RegisterHeightController />
      </View>
    </RegisterLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 15,
  },
  inputPassword: {
    marginBottom: 20,
  },
});

export default RegisterHeight;
