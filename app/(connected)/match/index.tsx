import { Image, Text, TouchableOpacity, View } from "react-native";
import { LIGHT_PURPLE, MAIN_COLOR } from "../../../src/constants/Color";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Match = () => {
  const match = useSelector((state: RootState) => state.connected.currentMatch);
  const user = useSelector((state: RootState) => state.connected.utilisateur);
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: MAIN_COLOR,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >
      {match && (
        <>
          <View style={{ flexDirection: "row", height: 175 }}>
            <Image
              style={{
                height: 110,
                width: 110,
                borderRadius: 110,
                left: 20,
                zIndex: 1,
              }}
              source={{ uri: `${apiUrl}/post/pp/${match[0].id_utilisateur}` }}
            />
            <Image
              style={{ height: 110, width: 110, borderRadius: 110, top: 40 }}
              source={{ uri: `${apiUrl}/post/pp/${user.id_utilisateur}` }}
            />
          </View>
          <Text style={{ fontSize: 36, color: "#fff", fontWeight: "bold" }}>
            Match !
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              fontWeight: "bold",
              opacity: 0.8,
            }}
          >
            Une nouvelle rencontre vous attend !
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#fff",
              fontWeight: "bold",
              opacity: 0.8,
              textAlign: "center",
            }}
          >
            {match[0].prenom} {match[0].nom} a hâte de commencer à échanger avec
            vous
          </Text>
          <TouchableOpacity
            onPress={() => router.replace("/home/message")}
            style={{
              height: 50,
              width: "100%",
              borderRadius: 50,
              zIndex: 1,
              position: "absolute",
              bottom: 110,
              overflow: "hidden",
            }}
          >
            <LinearGradient
              start={[1, 0]}
              end={[0, 1]}
              colors={[LIGHT_PURPLE, "rgba(161,152,218,1)"]}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Envoyer un message
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              height: 45,
              width: "100%",
              borderRadius: 10,
              zIndex: 1,
              position: "absolute",
              bottom: 50,
              overflow: "hidden",
              borderColor: LIGHT_PURPLE,
              borderWidth: 2,
              backgroundColor: "rgba(255,255,255,.2)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 14 }}>
              Retourner à l'accueil
            </Text>
          </TouchableOpacity>
        </>
      )}
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["transparent", "rgba(100,86,133,1)"]}
        style={{
          borderRadius: 250,
          position: "absolute",
          top: -100,
          right: -75,
        }}
      >
        <View style={{ height: 250, width: 250, borderRadius: 250 }}></View>
      </LinearGradient>
      <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={["rgba(100,86,133,1)", "transparent"]}
        style={{
          borderRadius: 250,
          position: "absolute",
          bottom: -100,
          left: -75,
        }}
      >
        <View style={{ height: 250, width: 250, borderRadius: 250 }}></View>
      </LinearGradient>
    </View>
  );
};

export default Match;
