import { StyleSheet, Text, View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import Logo from "../../../src/components/icons/Logo";
import global from "../../../src/constants/Global";
import InputEmail from "../../../src/components/auth/input/Email";
import InputPassword from "../../../src/components/auth/input/Password";
import { Link } from "expo-router";
import Navigate from "../../../src/components/auth/Navigate";
import IndexController from "../../../src/viewController/auth/login";

const Login = () => {
  return (
    <AuthLayout>
      <View style={global.body}>
        <IndexController />
      </View>
    </AuthLayout>
  );
};


export default Login;
