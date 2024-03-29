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
import Trash from "../../../src/components/icons/Trash";

const Direct = () => {
  const direct = useSelector((state: RootState) => state.connected.direct);
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
          (data[key].id_envoyeur === user.id_utilisateur &&
            data[key].id_receveur === direct?.id_utilisateur) ||
          (data[key].id_envoyeur === direct?.id_utilisateur &&
            data[key].id_receveur === user.id_utilisateur)
        ) {
          fakeMessage.push(data[key]);
        }
      }
      setMessage(fakeMessage);
    });
  }, []);

  const handleClick = async () => {
    console.log(content);
    if (token !== null && direct !== null && content !== "") {
      console.log(direct);
      model.sendMessage(token, direct.id_utilisateur, null, content);
      setContent("");
    }
  };

  const deleteMessage = async () => {
    
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
          justifyContent: "space-between",
          alignItems:"flex-end",
          flexDirection:"row",
          marginBottom: 50,
        }}
      >
        <TouchableOpacity onPress={router.back} style={{bottom:7.5}}>
          <Chevron />
        </TouchableOpacity>
        <TouchableOpacity onPress={router.back} style={{backgroundColor:"#df6060", padding:7.5, borderRadius:50}}>
          <Trash />
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
                  { flexDirection: "row-reverse", marginBottom: 20,flexWrap:"wrap" },
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
                    style={{ color: SUPER_LIGHT_PURPLE, fontWeight: "normal",  }}
                  >
                    {item.contenu}
                  </Text>
                </View>
              </View>
            );
          }
          if (item.id_envoyeur === direct?.id_utilisateur) {
            return (
              <View
                key={index}
                style={[
                  styles.containerMessage,
                  { flexDirection: "row", marginBottom: 20,flexWrap:"wrap" },
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

export default Direct;
