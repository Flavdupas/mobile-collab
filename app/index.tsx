import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import slideData from "../src/data/auth/slideData";
import OnBoarding from "../src/components/auth/OnBoarding";
import Paginator from "../src/components/auth/Paginator";
import { Link, Redirect, router } from "expo-router";
import { useRef } from "react";
const Index = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  /*return (
    <Redirect href={"/register/8"} />
  )*/
  return (
    <View style={styles.body}>
      <View>
        <View style={styles.containerItems}>
          <FlatList
            data={slideData}
            renderItem={({ item }) => <OnBoarding item={item} />}
            horizontal
            bounces={false}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
          />
        </View>
        <Paginator data={slideData} scrollX={scrollX}/>
      </View>

      <View style={styles.containerBtn}>
        <TouchableOpacity style={styles.btnRegister} onPress={() => router.push("/register/1")}>
          <Text style={styles.registerTxt}>Commencer</Text>
        </TouchableOpacity>
        <Text style={styles.txtLogin}>
          Déjà un compte ? <Link href={"/login/"}>connecte-toi</Link>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#261E35",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  containerBtn: {
    alignItems: "center",
  },
  containerItems: {
    marginBottom:15
  },
  btnRegister: {
    height: 50,
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  registerTxt: {
    fontSize: 20,
    fontWeight: "bold",
  },
  txtLogin: {
    color: "white",
    fontWeight: "bold",
    marginTop:5,
  },
});

export default Index;
