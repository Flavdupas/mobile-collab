import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
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
