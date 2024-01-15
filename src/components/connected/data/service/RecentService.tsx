import { FlatList, View, StyleSheet } from "react-native";
import { SOFT_PURPLE } from "../../../../constants/Color";
import { Skeleton } from "moti/skeleton";
import ServicesCube from "./ServiceCube";

interface RecentServiceProps {
  data: ServiceInterface[] | null;
  token: string;
}

const RecentService: React.FC<RecentServiceProps> = ({ data, token }) => {
  /* STYLES */
  const styles = StyleSheet.create({
    containerItems: {
      flexDirection: "row",
      width: "100%",
      marginBottom: 10,
      height: 160,
    },
    card: {
      width: 150,
      height: 160,
      backgroundColor: SOFT_PURPLE,
      borderRadius: 10,
      overflow: "hidden",
      marginLeft: 20,
    },
    containerImage: {
      width: "100%",
      height: "50%",
      backgroundColor: "#fff",
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
  return (
    <>
      {data && (
        <View style={styles.containerItems}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <ServicesCube data={item} token={token} />
            )}
          />
        </View>
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

export default RecentService;
