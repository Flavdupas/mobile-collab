import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import RegisterTwoController from "../../../src/viewController/auth/register/2";
import global from "../../../src/constants/Global";

const RegisterTwo = () => {
  return (
    <AuthLayout>
      <View style={global.body}>
        <RegisterTwoController />
      </View>
    </AuthLayout>
  );
};

export default RegisterTwo;
