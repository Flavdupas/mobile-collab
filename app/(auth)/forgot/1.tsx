import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
import ForgotPasswordOneController from "../../../src/viewController/auth/forgot/1";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ForgotPasswordOne = () => {
    return (
        <GestureHandlerRootView>
         <AuthLayout>
            <View style={global.body}>
                <ForgotPasswordOneController />
            </View>
         </AuthLayout>
        </GestureHandlerRootView>
    )
}

export default ForgotPasswordOne;