import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
import ForgotPasswordTwoController from "../../../src/viewController/auth/forgot/2";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ForgotPasswordTwo = () => {
    return (
        <GestureHandlerRootView>
         <AuthLayout>
            <View style={global.body}>
                <ForgotPasswordTwoController />
            </View>
         </AuthLayout>
        </GestureHandlerRootView>
    )
}

export default ForgotPasswordTwo;