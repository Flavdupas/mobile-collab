import { Skeleton } from "moti/skeleton";
import Paginator from "../../Paginator";
import ServiceRectangle from "./ServiceRectangle";
import { FlatList, View, Animated, StyleSheet } from "react-native";
import { useRef } from "react";

interface ServiceRecommendedProps {
  data: ServiceInterface[] | null;
  token: string;
}

const ServiceRecommended: React.FC<ServiceRecommendedProps> = ({
  data,
  token,
}) => {
  /* VARIABLES */
  const scrollX = useRef(new Animated.Value(0)).current;

  /* STYLES */
  const styles = StyleSheet.create({
    section: {
      gap: 10,
    },
    body: {
      height: 150,
      width: "100%",
    },
    bodySkeleton: {
      paddingHorizontal: 20,
      height: 150,
      width: "100%",
      overflow: "hidden",
      borderRadius: 15,
    },
  });

  return (
    <>
      {data && (
        <View style={styles.section}>
          <View style={styles.body}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              scrollEventThrottle={32}
              data={data}
              renderItem={({ item }) => (
                <ServiceRectangle data={item} token={token} />
              )}
            />
          </View>
          <Paginator data={data} scrollX={scrollX} />
        </View>
      )}

      {!data && (
        <View style={styles.bodySkeleton}>
          <Skeleton width={"100%"} height={"100%"} />
        </View>
      )}
      {!data && (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Skeleton width={"40%"} height={10} />
        </View>
      )}
    </>
  );
};

export default ServiceRecommended;