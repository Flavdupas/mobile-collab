import { View } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import RegisterSixController from "../../../src/viewController/auth/register/6";
import global from "../../../src/constants/Global";

const RegisterSix = () => {
  return (
    <RegisterLayout>
      <View style={global.body}>
        <RegisterSixController />
      </View>
    </RegisterLayout>
  );
};

export default RegisterSix;
