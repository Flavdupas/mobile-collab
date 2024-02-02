import { FlatList, View, StyleSheet } from "react-native";
import ServicesCube from "./ServiceCube";
import LottieView from "lottie-react-native";
import ServiceRectangeTwo from "./ServiceRectangleTwo";

interface AllServiceProps {
  isLoading: boolean;
  token: string;
  data: ServiceInterface[][] | null;
}

const AllService: React.FC<AllServiceProps> = ({ isLoading, token, data }) => {
  const styles = StyleSheet.create({
    lottie: {
      height: 40,
      alignSelf: "center",
    },
    stack: {
      minHeight: 150,
      width: "100%",
      marginBottom: 15,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: 15,
    },
  });
  return (
    <>
      {isLoading && (
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          source={require("../../../../assets/animations/Loading.json")}
        />
      )}
      {!isLoading && (
        <View style={{ width: "90%", alignSelf: "center" }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.stack,
                    { paddingBottom: index + 1 === data?.length ? 375 : 0 },
                  ]}
                >
                  {item.map((item, index) => {
                    return (
                      <View key={index}>
                        {index === 0 && (
                          <ServiceRectangeTwo data={item} token={token} />
                        )}
                        {index !== 0 && (
                          <ServicesCube data={item} token={token ?? ""} />
                        )}
                      </View>
                    );
                  })}
                </View>
              );
            }}
          />
        </View>
      )}
    </>
  );
};

export default AllService;
