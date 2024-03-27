import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../src/store/store";
import { useEffect, useState } from "react";
import { GroupModel } from "../../../../src/model/data/Group";
import connectedStyle from "../../../../src/constants/ConnectedStyle";
import SearchBarGroup from "../../../../src/components/connected/SearchBarGroup";
import {
  Direct,
  GroupMessage,
  Groupe,
} from "../../../../src/data/interface/Group";
import LottieView from "lottie-react-native";
import { getFirstLetter } from "../../../../src/utils/string";
import {
  updateDirect,
  updateGroupe,
} from "../../../../src/store/connected/connected";
import { router } from "expo-router";
import CreateBtn from "../../../../src/components/connected/CreateBtn";

const Message = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const model = new GroupModel();
  const dispatch = useDispatch();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const [data, setData] = useState<GroupMessage | null>(null);
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handle = async () => {
      if (token) {
        setData(await model.getGroup(token, search));
        setIsLoading(false);
      }
    };
    handle();
  }, [search]);

  const styles = StyleSheet.create({
    body: {
      paddingHorizontal: 15,
    },
    title: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 30,
      marginBottom: 15,
    },
    pp: {
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    btn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      marginBottom: 15,
    },
    btnTitle: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "600",
    },
    containerPP: {
      borderWidth: 1,
      borderColor: "#3F3655",
      justifyContent: "center",
      alignItems: "center",
    },
    letterPP: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    lottie: {
      height: 40,
      alignSelf: "center",
    },
  });

  const handleDirect = (item: Direct) => {
    dispatch(updateDirect(item));
    dispatch(updateGroupe(null));
    router.push("/message/direct");
  };
  const handleGroup = (item: Groupe) => {
    dispatch(updateDirect(null));
    dispatch(updateGroupe(item));
    router.push("/message/group");
  };

  return (
    <View style={[connectedStyle.body, styles.body]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <SearchBarGroup onChange={setSearch} />
        <Text style={styles.title}>Messages</Text>
        {isLoading && (
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={require("../../../../src/assets/animations/Loading.json")}
          />
        )}
        {data?.direct &&
          data.direct.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.btn}
                onPress={() => handleDirect(item)}
              >
                <Image
                  style={styles.pp}
                  source={{ uri: `${apiUrl}/post/pp/${item.id_utilisateur}` }}
                />
                <Text style={styles.btnTitle}>
                  {item.prenom} {item.nom}
                </Text>
              </TouchableOpacity>
            );
          })}
        {data?.groupes &&
          data.groupes.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.btn}
                onPress={() => handleGroup(item)}
              >
                <View style={[styles.pp, styles.containerPP]}>
                  <Text style={styles.letterPP}>
                    {getFirstLetter(item.nom_groupe)}
                  </Text>
                </View>
                <Text style={styles.btnTitle}>{item.nom_groupe}</Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <CreateBtn href={"/service/create"} />
    </View>
  );
};

export default Message;
