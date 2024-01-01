import { View } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import global from "../../../src/constants/Global";
import RegisterOneController from "../../../src/viewController/auth/register/1";

const RegisterOne = () => {
  return (
    <RegisterLayout>
      <View style={global.body}>
        <RegisterOneController />
      </View>
    </RegisterLayout>
  );
};

export default RegisterOne;
