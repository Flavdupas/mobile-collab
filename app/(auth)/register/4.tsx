import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import RegisterFourController from "../../../src/viewController/auth/register/4";
import global from "../../../src/constants/Global";
const RegisterFour = () => {
  return (
    <AuthLayout>
      <View style={global.body}>
        <RegisterFourController />
      </View>
    </AuthLayout>
  );
};

export default RegisterFour;
