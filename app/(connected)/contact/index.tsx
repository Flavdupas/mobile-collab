import { ScrollView, Text, View } from "react-native";
import Layout from "../../../src/components/connected/Layout";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Requete } from "../../../src/data/interface/Requete";
import ServiceModel from "../../../src/model/data/Service";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import CreateBtn from "../../../src/components/connected/CreateBtn";

const Index = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Requete[]>([]);
  const model = new ServiceModel();
  const token = useSelector((state: RootState) => state.login.token);

  useEffect(() => {
    const handle = async () => {
      if (token) {
        const data = await model.getRequest(token);
        setData(data);
        setIsLoading(false);
      }
    };
    handle();
  }, []);
  return (
    <Layout>
      <View style={{flex:1}}>
        {isLoading && (
          <LottieView
            autoPlay
            loop
            style={{ height: 40, alignSelf: "center", marginTop: 150 }}
            source={require("../../../src/assets/animations/Loading.json")}
          />
        )}
        {!isLoading && (
          <ScrollView
            contentContainerStyle={{ paddingTop: 150, paddingHorizontal: 20, minHeight:"100%" }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {data.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginBottom: 20,
                    borderBottomColor: "#fff",
                    borderWidth: 1,
                    paddingBottom: 20,
                    borderColor: "transparent",
                  }}
                >
                  <Text style={{ color: "#fff" }}>
                    Votre demande : {item.contenu}
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    Réponse : {item.reponse ?? "Aucune réponse pour le moment"}
                  </Text>
                  <Text style={{ color: "#fff" }}>
                    Demande du :{" "}
                    {new Date(item.created_at).toLocaleDateString("fr")}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        )}
        <CreateBtn href={"/contact/create"} />
      </View>
    </Layout>
  );
};

export default Index;
