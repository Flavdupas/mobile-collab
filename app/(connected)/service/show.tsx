import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import Layout from "../../../src/components/connected/Layout";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  ScrollView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import { Skeleton } from "moti/skeleton";
import Paginator from "../../../src/components/connected/Paginator";
import { useRef, useState } from "react";
import Polygone from "../../../src/components/icons/Polygone";
import Money from "../../../src/components/icons/Money";
import ShowController from "../../../src/viewController/connected/service/show";
import { ServiceInterface } from "../../../src/data/interface/Service";
import { MAIN_COLOR, SOFT_PURPLE } from "../../../src/constants/Color";
import ServiceModel from "../../../src/model/data/Service";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;
const { width } = Dimensions.get("window");

const Show = () => {
  /* VARIABLES */
  const item = useSelector(
    (state: RootState) => state.connected.data.currentService
  );
  const token = useSelector((state: RootState) => state.login.token);
  const [showModal, setShowModal] = useState<boolean>(false);
  const model = new ServiceModel();
  const [reportMessage, setReportMessage] = useState<string>("");

  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginBottom: 0,
      flex: 1,
    },
    title: {
      fontSize: 20,
      color: "#fff",
      fontWeight: "600",
      marginVertical: 5,
    },
    info: {
      fontSize: 12,
      color: "#fff",
      opacity: 0.8,
    },
    description: {
      color: "#fff",
      fontSize: 14,
      marginBottom: 125,
    },
  });

  const toogleModal = () => {
    setShowModal(!showModal);
  };

  const handleReport = async () => {
    setShowModal(false);
    if (token && item) {
      model.report(token, item?.id_service, reportMessage);
    }
  };

  return (
    <Layout>
      <Modal transparent visible={showModal}>
        <TouchableWithoutFeedback onPress={() => setShowModal(!showModal)}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,.3)",
              padding: 20,
              paddingVertical: 100,
            }}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: MAIN_COLOR,
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <TextInput
                  value={reportMessage}
                  onChangeText={setReportMessage}
                  style={{
                    backgroundColor: SOFT_PURPLE,
                    flex: 1,
                    borderRadius: 10,
                    color: "#fff",
                  }}
                  multiline
                ></TextInput>
                <TouchableOpacity
                  onPress={handleReport}
                  style={{
                    height: 40,
                    width: "100%",
                    backgroundColor: "rgba(249,142,142,1)",
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>
                    Signaler
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TouchableOpacity
        onPress={toogleModal}
        style={{
          backgroundColor: "rgba(249,142,142,1)",
          height: 30,
          width: 30,
          borderRadius: 50,
          position: "absolute",
          top: 25,
          right: 30,
          zIndex: 9999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          !
        </Text>
      </TouchableOpacity>
      <Carouselle data={item} token={token ?? ""} />
      {item && (
        <>
          <Polygone
            background={`#${item.theme.color_hex}`}
            style={{
              position: "absolute",
              top: 250,
              transform: [{ translateY: -38 / 2 }],
              marginLeft: 20,
            }}
          >
            <Image
              source={{
                uri: `${apiUrl}/themes/${item.theme.libelle_theme}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }}
              width={25}
              height={25}
            />
          </Polygone>
          <View style={styles.body}>
            <Text style={styles.title}>{item.titre}</Text>
            <Text style={styles.info}>
              Publié par {item.etudiant.prenom} le{" "}
              {new Date(item.created_at).toLocaleDateString("fr-FR")}
            </Text>
            <View
              style={{ alignItems: "center", flexDirection: "row", gap: 5 }}
            >
              <Text style={styles.info}>
                {item.type_service.libelle_type === "Proposition"
                  ? "Prix"
                  : "Récompense"}{" "}
                : {item.prix}
              </Text>
              <Money />
            </View>
            <Text style={styles.title}>Description</Text>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              <Text style={styles.description}>{item.description}</Text>
            </ScrollView>
          </View>
          <ShowController item={item} />
        </>
      )}
    </Layout>
  );
};

interface CarouselleProps {
  data: ServiceInterface | null;
  token: string;
}
const Carouselle: React.FC<CarouselleProps> = ({ data, token }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const styles = StyleSheet.create({
    body: {
      height: 265,
      width: "100%",
      justifyContent: "space-between",
    },
    imageContainer: {
      height: 250,
      width: width,
      overflow: "hidden",
    },
    image: {
      height: "100%",
      width: "100%",
      position: "absolute",
    },
  });

  return (
    <>
      <View style={styles.body}>
        {data && (
          <FlatList
            data={data.photos}
            horizontal
            bounces={false}
            pagingEnabled
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Skeleton width={"100%"} height={"100%"} />
                <Image
                  style={styles.image}
                  source={{
                    uri: `${apiUrl}/service/image/${item.id_service}/${
                      item.id_photo
                    }?${new Date()}`,
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }}
                />
              </View>
            )}
          />
        )}
      </View>
      {data && <Paginator data={data.photos} scrollX={scrollX} />}
    </>
  );
};

export default Show;
