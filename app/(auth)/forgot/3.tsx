import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
import ForgotPasswordThreeController from "../../../src/viewController/auth/forgot/3";

const ForgotPasswordThree = () => {
    return (
        <>
         <AuthLayout>
            <View style={global.body}>
                <ForgotPasswordThreeController />
            </View>
         </AuthLayout>
        </>
    )
}

export default ForgotPasswordThree;