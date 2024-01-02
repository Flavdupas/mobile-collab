import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
import ForgotPasswordTwoController from "../../../src/viewController/auth/forgot/2";

const ForgotPasswordTwo = () => {
    return (
        <>
         <AuthLayout>
            <View style={global.body}>
                <ForgotPasswordTwoController />
            </View>
         </AuthLayout>
        </>
    )
}

export default ForgotPasswordTwo;