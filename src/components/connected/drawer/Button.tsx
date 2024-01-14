import { Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SOFT_PURPLE } from "../../../constants/Color";
import { persistor } from "../../../store/store";
import resetHistory from "../../../utils/router";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import {
  updateEtudiant,
  updateNotifications,
  updateUtilisateur,
} from "../../../store/connected/connected";

const ButtonDrawer = () => {
  /* VARIABLE */
  const dispatch = useDispatch();

  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      width: "100%",
      height: 50,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 3,
      borderColor: SOFT_PURPLE,
      borderRadius: 75,
    },
    title: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      opacity: 0.85,
    },
  });

  /* LOGIQUE */
  const handlePress = async () => {
    await persistor.purge();
    dispatch(
      updateUtilisateur({ id_utilisateur: null, email: null, path_pp: null })
    );
    dispatch(
      updateEtudiant({
        credit: null,
        nom: null,
        prenom: null,
        telephone: null,
        date_naissance: null,
        rencontre: null,
      })
    );
    dispatch(updateNotifications([]));
    resetHistory().then(() => {
      router.replace("/");
    });
  };

  return (
    <TouchableOpacity style={styles.body} onPress={handlePress}>
      <Text style={styles.title}>Déconnecter</Text>
    </TouchableOpacity>
  );
};

export default ButtonDrawer;
