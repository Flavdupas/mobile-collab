import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
import RegisterOneController from "../../../src/viewController/auth/register/1";

const RegisterOne = () => {
  return (
    <AuthLayout>
      <View style={global.body}>
        <RegisterOneController />
      </View>
    </AuthLayout>
  );
};

export default RegisterOne;
