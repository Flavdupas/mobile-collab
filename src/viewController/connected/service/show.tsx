import { LinearGradient } from "expo-linear-gradient";
import { MAIN_COLOR } from "../../../constants/Color";
import { TouchableOpacity, StyleSheet, Text, Modal, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useState } from "react";
import LottieView from "lottie-react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ShowViewModel from "../../../viewModel/connected/service/Show";
import { ServiceInterface } from "../../../data/interface/Service";

interface ShowControllerProps {
  item: ServiceInterface;
}

const ShowController: React.FC<ShowControllerProps> = ({ item }) => {
  /* VARIABLES */
  const viewModel = new ShowViewModel();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const currentMoney = useSelector(
    (state: RootState) => state.connected.etudiant.credit
  );
  const token = useSelector((state: RootState) => state.login.token);

  const styles = StyleSheet.create({
    body: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: 125,
      paddingHorizontal: 20,
      justifyContent: "center",
    },
    linear: {
      width: "100%",
      height: 50,
      borderRadius: 25,
    },
    btn: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      overflow: "hidden",
    },
    title: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
    },
    modalBody: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0,0,0,.3)",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      height: 350,
      overflow: "hidden",
      width: 280,
      backgroundColor: MAIN_COLOR,
      borderRadius: 10,
    },
    lottie: {
      width: 225,
      height: 225,
    },
    lottieRound: {
      width: 150,
      height: 150,
    },
    linearBtn: {
      width: "100%",
      height: 40,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  /* LOGIQUE */
  const handleConfirmation = async (item: ServiceInterface) => {
    if (currentMoney && token) {
      if (
        (item.prix <= currentMoney &&
          item.type_service.libelle_type === "Proposition") ||
        item.type_service.libelle_type === "Demande"
      ) {
        setIsLoading(true);
        const res = await viewModel.answerService(item.id_service, token);
        if (res) {
          setIsLoading(false);
          setShowSuccess(true);
        } else {
          setIsLoading(false);
          setShowError(true);
        }
      }
    }
  };

  const close = () => {
    setIsLoading(false);
    setModalVisible(false);
    setShowError(false);
    setShowSuccess(false);
  };

  return (
    <>
      <LinearGradient
        style={styles.body}
        colors={["rgba(38,30,53,.4)", MAIN_COLOR]}
      >
        <LinearGradient
          start={[0, 1]}
          end={[1, 0]}
          colors={["#9C92DD", "#8271EB"]}
          style={styles.linear}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.title}>
              Répondre à la {item.type_service.libelle_type.toLocaleLowerCase()}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </LinearGradient>
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBody}>
          <View style={styles.container}>
            <View
              style={{ height: "50%", width: "100%", alignItems: "center", justifyContent:"center" }}
            >
              {!showError && !showSuccess && (
                <LottieView
                  autoPlay
                  style={styles.lottie}
                  source={require("../../../assets/animations/Confirmation.json")}
                />
              )}
              {showSuccess && (
                <LottieView
                  autoPlay
                  style={styles.lottieRound}
                  source={require("../../../assets/animations/Success.json")}
                />
              )}
              {showError && (
                <LottieView
                  autoPlay
                  style={styles.lottieRound}
                  source={require("../../../assets/animations/Error.json")}
                />
              )}
            </View>
            <View
              style={{
                height: "50%",
                width: "100%",
                paddingHorizontal: 20,
                justifyContent: "center",
                gap: 7.5,
              }}
            >
              {currentMoney && !isLoading && !showError && !showSuccess && (
                <>
                  <TouchableOpacity
                    style={{ width: "100%", height: 40, borderRadius: 25 }}
                    onPress={() => handleConfirmation(item)}
                  >
                    <LinearGradient
                      start={[0, 1]}
                      end={[1, 0]}
                      colors={["#9C92DD", "#8271EB"]}
                      style={styles.linearBtn}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "700",
                          color: "#fff",
                        }}
                      >
                        {(item.prix <= currentMoney &&
                          item.type_service.libelle_type === "Proposition") ||
                        item.type_service.libelle_type === "Demande"
                          ? "Confirmer"
                          : "Crédit insuffisant"}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ color: "#fff", opacity: 0.8 }}>annuler</Text>
                  </TouchableOpacity>
                </>
              )}
              {currentMoney && (showSuccess || showError) && (
                <TouchableOpacity
                  style={{ width: "100%", height: 40, borderRadius: 25 }}
                  onPress={close}
                >
                  <LinearGradient
                    start={[0, 1]}
                    end={[1, 0]}
                    colors={["#9C92DD", "#8271EB"]}
                    style={styles.linearBtn}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#fff",
                      }}
                    >
                      Fermer
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )}
              {isLoading && (
                <Text
                  style={{
                    color: "#fff",
                    alignSelf: "center",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Validation en cours ...
                </Text>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ShowController;
