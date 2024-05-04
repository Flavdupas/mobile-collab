import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import RegisterFiveController from "../../../src/viewController/auth/register/5";
import global from "../../../src/constants/Global";

const RegisterFive = () => {
  return (
    <AuthLayout>
      <View style={global.body}>
        <RegisterFiveController />
      </View>
    </AuthLayout>
  );
};

export default RegisterFive;
