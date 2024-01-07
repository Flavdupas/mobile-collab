import { Text, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import { SOFT_PURPLE } from "../../../constants/Color";
import { persistor } from "../../../store/store";
import resetHistory from "../../../utils/router";
import { router } from "expo-router";

const ButtonDrawer = () => {

    const styles = StyleSheet.create({
        body: {
            width:"100%",
            height:50,
            justifyContent:"center",
            alignItems:"center",
            borderWidth:3,
            borderColor: SOFT_PURPLE,
            borderRadius:75
        },
        title: {
            color:"#fff",
            fontSize:18,
            fontWeight:"bold",
            opacity:.85,
        }
    });

    /* LOGIQUE */
    const handlePress = async () => {
        await persistor.purge();
        resetHistory().then(() => {
            router.replace("/");
        });
    }

    return (
        <TouchableOpacity style={styles.body} onPress={handlePress}>
            <Text style={styles.title}>Déconnecter</Text>
        </TouchableOpacity>
    )
}

export default ButtonDrawer;