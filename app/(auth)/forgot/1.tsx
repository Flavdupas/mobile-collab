import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
import ForgotPasswordOneController from "../../../src/viewController/auth/forgot/1";

const ForgotPasswordOne = () => {
    return (
        <>
         <AuthLayout>
            <View style={global.body}>
                <ForgotPasswordOneController />
            </View>
         </AuthLayout>
        </>
    )
}

export default ForgotPasswordOne;