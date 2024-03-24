import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MAIN_COLOR, SUPER_LIGHT_PURPLE } from "../../../src/constants/Color";
import Chevron from "../../../src/components/icons/ChevronWhite";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "../../../firebase";
import { Message } from "../../../src/data/interface/Message";
import ArrowUp from "../../../src/components/icons/ArrowUp";
import { LinearGradient } from "expo-linear-gradient";
import MessageModel from "../../../src/model/data/Message";

const Groupe = () => {
  const groupe = useSelector((state: RootState) => state.connected.groupe);
  const user = useSelector((state: RootState) => state.connected.utilisateur);
  const [message, setMessage] = useState<Message[]>([]);
  const model = new MessageModel();
  const [content, setContent] = useState<string>("");
  const token = useSelector((state: RootState) => state.login.token);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    let fakeMessage: Message[] = [];
    const cardsRef = ref(db, "user/message/");
    onValue(cardsRef, (snapshot) => {
      fakeMessage = [];
      const data: Message[] = snapshot.val();
      for (const key in data) {
        if (
          data[key].id_recevoir_groupe === groupe?.id_groupe
        ) {
          fakeMessage.push(data[key]);
        }
      }
      setMessage(fakeMessage);
    });
  }, []);

  const handleClick = async () => {
    console.log(content);
    if (token !== null && groupe !== null && content !== "") {
      model.sendMessage(token, null, groupe.id_groupe, content);
      setContent("");
    }
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
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: MAIN_COLOR, paddingHorizontal: 25 }}
    >
      <View
        style={{
          height: 130,
          width: "100%",
          justifyContent: "flex-end",
          marginBottom: 50,
        }}
      >
        <TouchableOpacity onPress={router.back}>
          <Chevron />
        </TouchableOpacity>
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={{ justifyContent: "flex-end", flex: 1 }}
      >
        {message.map((item, index) => {
          if (item.id_envoyeur === user.id_utilisateur) {
            return (
              <View
                key={index}
                style={[
                  styles.containerMessage,
                  { flexDirection: "row-reverse", marginBottom: 20 },
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
                  { flexDirection: "row", marginBottom: 20 },
                ]}
              >
                <Image
                  style={styles.pp}
                  source={{ uri: `${apiUrl}/post/pp/${item.id_envoyeur}` }}
                />
                <View style={{ alignItems: "flex-start" }}>
                  <Text style={{ color: "#fff", fontWeight: "600" }}>
                    Interlocuteur
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
  );
};

export default Groupe;
