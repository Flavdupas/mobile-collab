import { Image, View, Text, TouchableOpacity } from "react-native";
import Layout from "../../../src/components/connected/Layout";
import MessageModel from "../../../src/model/data/Message";
import { useEffect, useState } from "react";
import { UserInterface } from "../../../src/data/interface/User";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import { router } from "expo-router";
import { updateDirect } from "../../../src/store/connected/connected";
import LottieView from "lottie-react-native";

const Create = () => {
  const model = new MessageModel();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const token = useSelector((state: RootState) => state.login.token);
  const [contact, setContact] = useState<UserInterface[]>([]);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handle = async () => {
      if (token) {
        const data = await model.getContact(token);
        setContact(data);
        setIsLoading(false);
      }
    };
    handle();
  }, []);

  const handleClick = (id: number) => {
    dispatch(
      updateDirect({
        commentaire_refus: null,
        credit: 0,
        date_demande: "",
        date_naissance: "",
        date_refus: null,
        date_traitement: null,
        date_validation: "",
        id_admin_refuser: null,
        id_admin_valider: -1,
        id_utilisateur: id,
        nom: "",
        path_carteetu: "",
        prenom: "",
        rencontre: 0,
        telephone: "",
      })
    );
    router.replace("/message/direct");
  };

  return (
    <Layout>
      {isLoading && (
        <LottieView
          autoPlay
          loop
          style={{ height: 40, alignSelf: "center", marginTop: 150 }}
          source={require("../../../src/assets/animations/Loading.json")}
        />
      )}
      {!isLoading && (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingTop: 150,
            paddingHorizontal: 10,
            gap: 15,
            flexWrap: "wrap",
          }}
        >
          {contact.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleClick(item.id_utilisateur)}
                key={index}
              >
                <View
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 10,
                    backgroundColor: SOFT_PURPLE,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: `${apiUrl}/post/pp/${item.id_utilisateur}` }}
                    style={{ height: 50, width: 50, borderRadius: 50 }}
                  />
                  <Text style={{ color: "#fff", opacity: 0.8 }}>
                    {item.prenom} {item.nom}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </Layout>
  );
};
export default Create;
