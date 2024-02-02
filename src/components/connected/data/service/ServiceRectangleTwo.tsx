import { BlurView } from "expo-blur";
import { Skeleton } from "moti/skeleton";
import {
  View,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { croppedText } from "../../../../utils/string";
import Money from "../../../icons/Money";
import Polygone from "../../../icons/Polygone";
import { SOFT_PURPLE } from "../../../../constants/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { updateCurrentService } from "../../../../store/connected/connected";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface ServiceRectangeTwoProps {
  data: ServiceInterface;
  token: string;
  
}

const ServiceRectangeTwo: React.FC<ServiceRectangeTwoProps> = ({ data, token }) => {
  const dispatch = useDispatch();
  const styles = StyleSheet.create({
    containerImage: {
      width: "100%",
      height: "50%",
      backgroundColor: "#fff",
      overflow: "hidden",
    },
    blur: {
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0,
    },
    image: {
      width: "100%",
      height: "100%",
      position: "absolute",
    },
    containerTitle: {
      justifyContent: "flex-end",
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    title: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "600",
    },
    containerInfo: {
      flexDirection: "row",
      gap: 8,
    },
    circle: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    price: {
      fontSize: 11,
      color: "#fff",
      fontWeight: "500",
    },
    containerText: {
      justifyContent: "center",
    },
    text: {
      color: "#fff",
      fontSize: 10,
    },
    tinyText: {
      color: "#fff",
      fontSize: 8,
    },
  });
const handleClick = (item?:ServiceInterface) => {
    if(item) {
      dispatch(updateCurrentService(item));
      router.push("/service/show");
    }
  }
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 160,
        backgroundColor: SOFT_PURPLE,
        borderRadius: 10,
        overflow: "hidden",
      }}
      onPress={() => handleClick(data)}
    >
      <View style={styles.containerImage}>
        <Skeleton width={"100%"} height={"100%"} />
        <Image
          style={styles.image}
          source={{
            uri: `${apiUrl}/service/image/${data.photos[0].id_service}/${
              data.photos[0].id_photo
            }?${new Date()}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
        />
        <BlurView intensity={1} style={styles.blur} />
      </View>
      <View style={styles.containerTitle}>
        <Text style={styles.title}>{croppedText(data.titre, 30)}</Text>
        <View style={styles.containerInfo}>
          <View style={styles.circle}>
            <Text style={styles.price}>{data.prix}</Text>
            <Money height={15} />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>Publié par {data.etudiant.prenom}</Text>
            <Text style={styles.tinyText}>
              le {new Date(data.created_at).toLocaleDateString("fr-FR")}
            </Text>
          </View>
        </View>
      </View>
      <Polygone
        background={`#${data.theme.color_hex}`}
        style={{
          position: "absolute",
          top: "50%",
          transform: [{ translateY: -38 / 2 }],
          marginLeft: 20,
        }}
      >
        <Image
          source={{
            uri: `${apiUrl}/themes/${data.theme.libelle_theme}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }}
          width={25}
          height={25}
        />
      </Polygone>
    </TouchableOpacity>
  );
};

export default ServiceRectangeTwo