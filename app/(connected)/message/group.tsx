import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import {
  MAIN_COLOR,
  SOFT_PURPLE,
  SUPER_LIGHT_PURPLE,
} from "../../../src/constants/Color";
import Chevron from "../../../src/components/icons/ChevronWhite";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../../firebase";
import { Message } from "../../../src/data/interface/Message";
import ArrowUp from "../../../src/components/icons/ArrowUp";
import { LinearGradient } from "expo-linear-gradient";
import MessageModel from "../../../src/model/data/Message";
import Trash from "../../../src/components/icons/Trash";
import Validate from "../../../src/components/icons/Validate";
import { InterestedArray } from "../../../src/data/interface/Service";
import ServiceModel from "../../../src/model/data/Service";
import { isLoading } from "expo-font";
import { updateLoadMessage } from "../../../src/store/connected/connected";

const Groupe = () => {
  const groupe = useSelector((state: RootState) => state.connected.groupe);
  const user = useSelector((state: RootState) => state.connected.utilisateur);
  const [message, setMessage] = useState<Message[]>([]);
  const model = new MessageModel();
  const serviceModel = new ServiceModel();
  const [content, setContent] = useState<string>("");
  const token = useSelector((state: RootState) => state.login.token);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [interested, setInterested] = useState<InterestedArray>([]);
  const [idInterested, setIdInterested] = useState<number[]>([]);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handle = async () => {
      let fakeMessage: Message[] = [];
      const cardsRef = ref(db, "user/message/");
      onValue(cardsRef, (snapshot) => {
        fakeMessage = [];
        const data: Message[] = snapshot.val();
        for (const key in data) {
          if (data[key].id_recevoir_groupe === groupe?.id_groupe) {
            fakeMessage.push(data[key]);
          }
        }
        setMessage(fakeMessage);
      });
      if (token && groupe) {
        setInterested(
          await serviceModel.getInterested(token, groupe?.id_service)
        );
      }
    };
    handle();
  }, []);

  const handleClick = async () => {
    console.log(content);
    if (token !== null && groupe !== null && content !== "") {
      model.sendMessage(token, null, groupe.id_groupe, content);
      setContent("");
    }
  };

  const handleDelete = async () => {
    if (token !== null && groupe !== null) {
      model.delete(token, null, groupe.id_groupe);
      router.back();
      dispatch(updateLoadMessage(true))
    }
  };

  const handleClickValidate = async () => {
    setShowModal(true);
  };

  const handleInterestedClick = (id: number) => {
    const updatedInterested = [...idInterested];
    const index = updatedInterested.indexOf(id);
    if (index !== -1) {
      updatedInterested.splice(index, 1);
    } else {
      updatedInterested.push(id);
    }
    setIdInterested(updatedInterested);
  };

  const handleValidate = async () => {
    if (token && groupe) {
      setIsLoading(true);
      if (await serviceModel.validate(token, groupe.id_service, idInterested)) {
        setShowSuccess(true);
        setIsLoading(false);
      } else {
        setShowError(true);
        setIsLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowError(false);
    setShowSuccess(false);
    setIsLoading(false);
  };

  const styles = StyleSheet.create({
    pp: {
      height: 40,
      width: 40,
      borderRadius: 50,
    },
    containerMessage: {
      flexDirection: "row",
      gap: 10,
    },
    lottieRound: {
      width: 150,
      height: 150,
    },
    lottie: {
      width: 225,
      height: 225,
    },
  });

  return (
    <GestureHandlerRootView>
      <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: MAIN_COLOR, paddingHorizontal: 25 }}
    >
      <Modal transparent visible={showModal}>
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.2)",
              paddingHorizontal: 50,
              paddingVertical: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {(showError ||
              showSuccess ||
              isLoading) &&(
                <TouchableWithoutFeedback onPress={() => {}}>
                  <View
                    style={{
                      backgroundColor: MAIN_COLOR,
                      height: 250,
                      width:"100%",
                      borderRadius: 20,
                      overflow: "hidden",
                      padding: 10,
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {isLoading && (
                      <LottieView
                        autoPlay
                        style={styles.lottieRound}
                        source={require("../../../src/assets/animations/Confirmation.json")}
                      />
                    )}
                    {showError && (
                      <>
                        <LottieView
                          autoPlay
                          style={styles.lottieRound}
                          source={require("../../../src/assets/animations/Error.json")}
                        />
                        <Text style={{ color: "#fff" }}>
                          Vous avez déjà validé ce service
                        </Text>
                      </>
                    )}
                    {showSuccess && (
                      <LottieView
                        autoPlay
                        style={styles.lottieRound}
                        source={require("../../../src/assets/animations/Success.json")}
                      />
                    )}
                  </View>
                </TouchableWithoutFeedback>
              )}
            {!showError && !showSuccess && !isLoading && (
              <TouchableWithoutFeedback onPress={() => {}}>
                <View
                  style={{
                    backgroundColor: MAIN_COLOR,
                    width: "100%",
                    height: "100%",
                    borderRadius: 20,
                    overflow: "hidden",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {interested.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() =>
                          handleInterestedClick(item.etudiant.id_utilisateur)
                        }
                        key={index}
                      >
                        <View
                          style={{
                            backgroundColor: idInterested.includes(
                              item.etudiant.id_utilisateur
                            )
                              ? SOFT_PURPLE
                              : "transparent",
                            width: "100%",
                            height: 45,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 10,
                          }}
                        >
                          <Text
                            style={{
                              color: "#fff",
                              fontWeight: "700",
                              opacity: idInterested.includes(
                                item.etudiant.id_utilisateur
                              )
                                ? 1
                                : 0.75,
                            }}
                          >
                            {item.etudiant.prenom} {item.etudiant.nom}
                          </Text>
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                  {!showError && !showSuccess && !isLoading && (
                    <TouchableOpacity
                      onPress={handleValidate}
                      style={{
                        backgroundColor: "#63DF7F",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 40,
                        width: "100%",
                        borderRadius: 50,
                        opacity: 0.8,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 16,
                          fontWeight: "700",
                        }}
                      >
                        Valider
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View
        style={{
          height: 130,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexDirection: "row",
          marginBottom: 50,
        }}
      >
        <TouchableOpacity onPress={router.back}>
          <Chevron />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 10 }}>
          {groupe?.id_createur === user.id_utilisateur && groupe.id_service && (
            <TouchableOpacity
              onPress={handleClickValidate}
              style={{
                backgroundColor: "#63DF7F",
                padding: 7.5,
                borderRadius: 50,
              }}
            >
              <Validate />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleDelete}
            style={{
              backgroundColor: "#df6060",
              padding: 7.5,
              borderRadius: 50,
            }}
          >
            <Trash />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ justifyContent: "flex-end", flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {message.map((item, index) => {
          if (item.id_envoyeur === user.id_utilisateur) {
            return (
              <View
                key={index}
                style={[
                  styles.containerMessage,
                  {
                    flexDirection: "row-reverse",
                    marginBottom: 20,
                    flexWrap: "wrap",
                  },
                ]}
              >
                <Image
                  style={styles.pp}
                  source={{ uri: `${apiUrl}/post/pp/${item.id_envoyeur}` }}
                />
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{ color: SUPER_LIGHT_PURPLE, fontWeight: "600" }}
                  >
                    Moi
                  </Text>
                  <Text
                    style={{ color: SUPER_LIGHT_PURPLE, fontWeight: "normal" }}
                  >
                    {item.contenu}
                  </Text>
                </View>
              </View>
            );
          }
          if (item.id_recevoir_groupe === groupe?.id_groupe) {
            return (
              <View
                key={index}
                style={[
                  styles.containerMessage,
                  { flexDirection: "row", marginBottom: 20, flexWrap: "wrap" },
                ]}
              >
                <Image
                  style={styles.pp}
                  source={{ uri: `${apiUrl}/post/pp/${item.id_envoyeur}` }}
                />
                <View style={{ alignItems: "flex-start" }}>
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    {item.user.prenom}
                  </Text>
                  <Text style={{ color: "#fff", fontWeight: "normal" }}>
                    {item.contenu}
                  </Text>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
      <View style={{ position: "relative" }}>
        <TextInput
          value={content}
          onChangeText={setContent}
          style={{
            marginBottom: 40,
            width: "100%",
            height: 40,
            backgroundColor: "#fff",
            borderRadius: 50,
            paddingHorizontal: 10,
          }}
          placeholder="Entrer votre message ..."
        ></TextInput>
        <TouchableOpacity
          style={{ position: "absolute", right: 15, top: 5 }}
          onPress={handleClick}
        >
          <LinearGradient
            colors={["#5894EF", "#8CB4F1"]}
            style={{
              height: 30,
              width: 30,
              borderRadius: 50,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ArrowUp />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </GestureHandlerRootView>
  
  );
};

export default Groupe;
