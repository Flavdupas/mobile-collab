import { View } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import RegisterTwoController from "../../../src/viewController/auth/register/2";
import global from "../../../src/constants/Global";

const RegisterTwo = () => {
  return (
    <RegisterLayout>
      <View style={global.body}>
        <RegisterTwoController />
      </View>
    </RegisterLayout>
  );
};

export default RegisterTwo;
