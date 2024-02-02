import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MAIN_COLOR } from "../../../src/constants/Color";
import Chevron from "../../../src/components/icons/ChevronWhite";
import { router } from "expo-router";
import CreateViewController from "../../../src/viewController/connected/service/create";

const Create = () => {

    /* STYLES */
    const styles = StyleSheet.create({
        body: {
            flex:1,
            backgroundColor: MAIN_COLOR,
            padding:20,
            paddingTop:65,
        }
    });

    return (
        <View style={styles.body}>
            <TouchableOpacity onPress={() => router.back()}>
                <Chevron />
            </TouchableOpacity>
            <CreateViewController />
        </View>
    )
}

export default Create;