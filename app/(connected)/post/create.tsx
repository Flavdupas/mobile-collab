import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import Layout from "../../../src/components/connected/Layout";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import CarteEtudiantModal from "../../../src/components/auth/register/CarteEtudiantModal";
import { useEffect, useState } from "react";
import PostModel from "../../../src/model/data/Post";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { updateLoadPost } from "../../../src/store/connected/connected";
import { router } from "expo-router";

const Create = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const token = useSelector((state: RootState) => state.login.token);
  const [image, setImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const model = new PostModel();
  const dispatch = useDispatch();
  const toogleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCreate = () => {
    if (token && title !== "" && content !== "") {
      model.create(token, title, content, image);
      dispatch(updateLoadPost(true));
      router.back()
    }
  };

  useEffect(() => {
    console.log(image);
  }, [image]);
  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, paddingTop: 150, paddingHorizontal: 20 }}>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Titre
          </Text>
          <TextInput
            onChangeText={setTitle}
            style={{
              width: "100%",
              height: 40,
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
              backgroundColor: SOFT_PURPLE,
              borderRadius: 5,
            }}
          ></TextInput>
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Contenu
          </Text>
          <TextInput
            onChangeText={setContent}
            multiline
            style={{
              flex: 1,
              color: "#fff",
              fontSize: 16,
              fontWeight: "600",
              backgroundColor: SOFT_PURPLE,
              borderRadius: 5,
            }}
          ></TextInput>
          <TouchableWithoutFeedback onPress={toogleShowModal}>
            <View
              style={{
                borderRadius: 10,
                height: 150,
                width: "100%",
                backgroundColor: SOFT_PURPLE,
                marginVertical: 10,
                overflow: "hidden",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {image !== "" && (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: "100%", resizeMode: "cover" }}
                />
              )}
              {image === "" && (
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                >
                  Cliquer pour insérer une image
                </Text>
              )}
            </View>
          </TouchableWithoutFeedback>
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
        </View>
      </TouchableWithoutFeedback>
      {showModal && (
        <CarteEtudiantModal
          setShowModal={setShowModal}
          setSelectedImage={setImage}
          title="Image"
        />
      )}
    </Layout>
  );
};

export default Create;
