import { View } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import RegisterFiveController from "../../../src/viewController/auth/register/5";
import global from "../../../src/constants/Global";

const RegisterFive = () => {
  return (
    <RegisterLayout>
      <View style={global.body}>
        <RegisterFiveController />
      </View>
    </RegisterLayout>
  );
};

export default RegisterFive;
