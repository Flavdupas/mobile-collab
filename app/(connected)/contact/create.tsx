import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../../../src/components/connected/Layout";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import ServiceModel from "../../../src/model/data/Service";
import { router } from "expo-router";

const Create = () => {
  const [content, setContent] = useState<string>("");
  const token = useSelector((state: RootState) => state.login.token);
  const model = new ServiceModel();
  const handleCreate = () => {
    const handle = async () => {
      if (token && content !== "") {
        model.createRequest(token, content);
        router.back();
        router.back();
      }
    };
    handle();
  };

  return (
    <Layout>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1, paddingTop: 150, paddingHorizontal: 20 }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            fontWeight: "800",
            marginBottom: 10,
          }}
        >
          Création d'une demande
        </Text>
        <TextInput
          onChangeText={setContent}
          style={{
            backgroundColor: SOFT_PURPLE,
            flex: 1,
            borderRadius: 10,
            padding: 10,
            color:"#fff"
          }}
          multiline
        ></TextInput>
        <TouchableOpacity
          onPress={handleCreate}
          style={{
            height: 50,
            width: "100%",
            borderRadius: 50,
            marginBottom: 50,
            marginTop: 20,
            backgroundColor: SOFT_PURPLE,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Créer
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default Create;
