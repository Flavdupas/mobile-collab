import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ViewStyle,
} from "react-native";
import { croppedText } from "../../../../utils/string";
import Money from "../../../icons/Money";
import Circle from "../../../icons/Circle";
import {
  MAIN_COLOR,
  SOFT_PURPLE,
  SUPER_SOFT_PURPLE,
} from "../../../../constants/Color";
import { Skeleton } from "moti/skeleton";
import { updateCurrentService } from "../../../../store/connected/connected";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { ServiceInterface } from "../../../../data/interface/Service";
const { width } = Dimensions.get("window");
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface ServiceRectangleProps {
  data: ServiceInterface | null;
  token: string;
  disabled?:boolean;
  style:ViewStyle
}

const ServiceRectangle: React.FC<ServiceRectangleProps> = ({ data, token, disabled,style }) => {
  /* VARIABLES */
  const dispatch = useDispatch();
  /* STYLES */
  const styles = StyleSheet.create({
    card: {
      height: "100%",
      width: (width * 90) / 100,
      backgroundColor: SOFT_PURPLE,
      marginHorizontal: 20,
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      overflow: "hidden",
    },

    /* LEFT PART */
    leftPart: {
      width: "55%",
      padding: 15,
    },
    containerType: {
      backgroundColor: SUPER_SOFT_PURPLE,
      width: "auto",
      paddingVertical: 2,
      paddingHorizontal: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    type: {
      fontSize: 12,
      fontWeight: "500",
      color: "#fff",
    },
    containerTitle: {
      justifyContent: "space-evenly",
      flex: 1,
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
      backgroundColor: MAIN_COLOR,
      height: 40,
      width: 40,
      borderWidth: 1,
      borderColor: "#776C90",
      borderRadius: 25,
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

    /* RIGHT PART */
    firstCircle: {
      transform: [{ translateX: -18 }, { rotate: "-5deg" }],
      position: "absolute",
      bottom: 0,
    },
    secondCircle: {
      transform: [{ translateX: -10 }],
      position: "absolute",
      top: 20,
    },
    image: {
      borderRadius: 150,
      position:"absolute"
    },
    rightPart: {
      width: "45%",
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: 20,
    },
  });
  
const handleClick = (item?:ServiceInterface) => {
    if(item) {
      dispatch(updateCurrentService(item));
      router.push("/service/show");
    }
  }


  return (
    <>
      {data && (
        <TouchableOpacity disabled={disabled} style={[styles.card,style]} onPress={() => handleClick(data)}>
          <View style={styles.leftPart}>
            <View style={styles.containerType}>
              <Text style={styles.type}>{data.theme.libelle_theme}</Text>
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>{croppedText(data.titre, 30)}</Text>
              <View style={styles.containerInfo}>
                <View style={styles.circle}>
                  <Text style={styles.price}>{data.prix}</Text>
                  <Money height={15} />
                </View>
                <View style={styles.containerText}>
                  <Text style={styles.text}>
                    Publié par {data.etudiant.prenom}
                  </Text>
                  <Text style={styles.tinyText}>
                    le {new Date(data.created_at).toLocaleDateString("fr-FR")}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.rightPart}>
            <View>
              <Circle style={styles.firstCircle} />
              <Circle style={styles.secondCircle} reversed />
              
              <Skeleton height={200} width={200} radius={"round"} />
              <Image
                source={{
                  uri: `${apiUrl}/service/image/${data.photos[0].id_service}/${data.photos[0].id_photo}`,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }}
                style={styles.image}
                width={200}
                height={200}
              />
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ServiceRectangle;
