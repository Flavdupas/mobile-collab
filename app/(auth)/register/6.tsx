import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import RegisterSixController from "../../../src/viewController/auth/register/6";
import global from "../../../src/constants/Global";

const RegisterSix = () => {
  return (
    <AuthLayout>
      <View style={global.body}>
        <RegisterSixController />
      </View>
    </AuthLayout>
  );
};

export default RegisterSix;
