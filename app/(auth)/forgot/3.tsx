import { View } from "react-native";
import AuthLayout from "../../../src/components/auth/Layout";
import global from "../../../src/constants/Global";
import ForgotPasswordThreeController from "../../../src/viewController/auth/forgot/3";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const ForgotPasswordThree = () => {
    return (
        <GestureHandlerRootView>
         <AuthLayout>
            <View style={global.body}>
                <ForgotPasswordThreeController />
            </View>
         </AuthLayout>
        </GestureHandlerRootView>
    )
}

export default ForgotPasswordThree;