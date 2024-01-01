import { View } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import RegisterFourController from "../../../src/viewController/auth/register/4";
import global from "../../../src/constants/Global";
const RegisterFour = () => {
  return (
    <RegisterLayout>
      <View style={global.body}>
        <RegisterFourController />
      </View>
    </RegisterLayout>
  );
};

export default RegisterFour;
