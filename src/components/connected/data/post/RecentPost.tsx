import { Skeleton } from "moti/skeleton";
import Post from "./Post";
import { View, StyleSheet } from "react-native";
import { SOFT_PURPLE } from "../../../../constants/Color";

interface RecentPostProps {
  recentPosts: PostInterface[] | null;
  token: string;
}

const RecentPost: React.FC<RecentPostProps> = ({ recentPosts, token }) => {
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
      <View style={styles.body}>
        {!recentPosts && <Skeleton height={125} width={"100%"} />}
        {recentPosts &&
          recentPosts.map((item, _i) => {
            return (
              <View key={_i}>
                <Post data={item} token={token} disabled={false} />
              </View>
            );
          })}
      </View>
    </>
  );
};

export default RecentPost;