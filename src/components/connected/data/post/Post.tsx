import { Skeleton } from "moti/skeleton";
import { SOFT_PURPLE } from "../../../../constants/Color";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ViewStyle,
} from "react-native";
import Verify from "../../../icons/Verify";
import { croppedText } from "../../../../utils/string";
import Logo from "../../../icons/Logo";
import { useDispatch } from "react-redux";
import { updateCurrentPost } from "../../../../store/connected/connected";
import { router } from "expo-router";
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface PostProps {
  data: PostInterface | null;
  token: string;
  style?: ViewStyle;
  disabled: boolean;
  full?:boolean
}

const Post: React.FC<PostProps> = ({ data, token, style, disabled, full }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log(true)
    if (data && disabled == false) {
      dispatch(updateCurrentPost(data));
      router.push("/post/show")
    }
  };

  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      marginTop: 10,
      marginBottom: 125,
      paddingHorizontal: 15,
    },
    /* CARD */
    postContainer: {
      backgroundColor: SOFT_PURPLE,
      //height: 200,
      marginBottom: 30,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    /* LOGO APPLICATION */
    logoApp: {
      position: "absolute",
      width: 13.7,
      height: 15,
      right: 0,
      top: 5,
    },
    /* HEADER */
    header: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    pp: {
      height: 40,
      width: 40,
      borderRadius: 50,
      resizeMode: "cover",
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    name: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
    verify: {
      transform: [{ translateY: 1.5 }],
    },
    class: {
      color: "#fff",
      fontWeight: "300",
      fontSize: 10,
    },
    /* CONTENT */
    textContent: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 10,
    },
    imageContent: {
      width: "100%",
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    /* FOOTER */
    footer: {
      flexDirection: "row",
      gap: 15,
      marginBottom: 5,
    },
    textFooter: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 10,
      opacity: 0.7,
    },
  });

  return (
    <>
      {data && (
        <TouchableOpacity
          disabled={disabled}
          style={[styles.postContainer, style]}
          onPress={handleClick}
        >
          <Logo style={styles.logoApp} />
          <View style={styles.header}>
            <Image
              style={styles.pp}
              source={{
                uri: `${apiUrl}/post/pp/${data.id_etudiant}`,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }}
            />
            {true && (
              <View>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>
                    {data.prenom} {data.nom}
                  </Text>
                  <Verify style={styles.verify} />
                </View>
                <Text style={styles.class}>@{data.libelle_section}</Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.textContent}>
              {full ? data.contenu : croppedText(data.contenu, 150)}
            </Text>
            {data.path_image && (
              <Image
                source={{
                  uri: `${apiUrl}/post/image/${data.id_post}`,
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }}
                style={styles.imageContent}
              />
            )}
            <View style={styles.footer}>
              <Text style={styles.textFooter}>
                {new Date(data.created_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <Text style={styles.textFooter}>{data.like_count} likes</Text>
              <Text style={styles.textFooter}>
                {data.comment_count} commentaires
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Post;
