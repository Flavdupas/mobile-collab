import {
  TouchableOpacity,
  View,
  Text,
  Image,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { SOFT_PURPLE } from "../../../../constants/Color";
import { BlurView } from "expo-blur";
import { croppedText } from "../../../../utils/string";
import Polygone from "../../../icons/Polygone";
import { Skeleton } from "moti/skeleton";
import { updateCurrentService } from "../../../../store/connected/connected";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface ServicesCubeProps {
  data: ServiceInterface | null;
  token: string;
  style?: ViewStyle;
}

const ServicesCube: React.FC<ServicesCubeProps> = ({ data, token, style }) => {
  /* VARIABLES */
  const dispatch = useDispatch();
  /* STYLES */
  const styles = StyleSheet.create({
    containerItems: {
      flexDirection: "row",
      width: "100%",
      //marginBottom: 10,
      height: 160,
    },
    card: {
      width: 150,
      height: 160,
      backgroundColor: SOFT_PURPLE,
      borderRadius: 10,
      overflow: "hidden",
    },
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
    bottomContainer: {
      width: "100%",
      height: "50%",
      justifyContent: "center",
      paddingHorizontal: 15,
      paddingTop: 16,
    },
    title: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
  });

  const handleClick = (item?: ServiceInterface) => {
    if (item) {
      dispatch(updateCurrentService(item));
      router.push("/service/show");
    }
  };
  return (
    <>
      {data && (
        <TouchableOpacity
          style={[styles.card, style]}
          onPress={() => handleClick(data)}
        >
          <View style={styles.containerImage}>
            <Skeleton height={"100%"} width={"100%"} />
            <Image
              style={styles.image}
              width={50}
              height={50}
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
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>{croppedText(data.titre, 20)}</Text>
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
      )}
      {!data && (
        <View style={[styles.containerItems, { paddingLeft: 20, gap: 20 }]}>
          <Skeleton width={150} height={160} />
          <Skeleton width={150} height={160} />
          <Skeleton width={150} height={160} />
        </View>
      )}
    </>
  );
};

export default ServicesCube;
