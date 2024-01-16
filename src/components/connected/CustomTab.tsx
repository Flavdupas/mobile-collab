import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View, Platform, Dimensions } from "react-native";
import { MAIN_COLOR } from "../../constants/Color";
import { Link, Route, router } from "expo-router";
import Home from "../icons/Home";
import Document from "../icons/Document";
import Post from "../icons/Post";
import Heart from "../icons/Heart";
import Chat from "../icons/Chat";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useContext, useEffect } from "react";
import ConnectedContext from "./context/RouteContext";

const CustomTabs = () => {
  /* VARIABLES */
  const { width } = Dimensions.get("window");
  const tabWidth = width > 430 ? 432.5 : width;
  const nbElement = 5;
  const spaceBetweenElements = tabWidth / (nbElement + 1);
  const context = useContext(ConnectedContext);
  const translateX = useSharedValue(spaceBetweenElements * (1 - 0.5));
  const icons: { component: React.FC<any>; route: Route<""> }[] = [
    { component: Home, route: "/home/" },
    { component: Document, route: "/home/service" },
    { component: Post, route: "/home/post" },
    { component: Heart, route: "/home/match" },
    { component: Chat, route: "/home/message" },
  ];

  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      height: Platform.OS === "ios" ? 125 : 110,
      position: "absolute",
      width: "100%",
      bottom: 0,
      paddingHorizontal: 15,
      paddingTop: 10,
    },
    tabs: {
      backgroundColor: "#fff",
      width: "100%",
      maxWidth: 400,
      height: 55,
      borderRadius: 50,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      alignSelf: "center",
    },
    active: {
      position: "absolute",
      backgroundColor: MAIN_COLOR,
      height: 40,
      width: 40,
      borderRadius: 25,
      left: -50.065822 / (1 + 0.01733031 * Math.exp(-(-0.0171112) * tabWidth)), //calcule de la fonction logisitque  c / (1 + a * Math.exp(-b * x));
    },
    item: {
      width: 35,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  /* LOGIQUE */
  if (context) {
    const handleClick = (href: Route<"">, currentIndexTabBar: number) => {
      context.setCurrentIndexTabBar(currentIndexTabBar);
      router.push(href);
    };

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });

    useEffect(() => {
      translateX.value = withSpring(
        spaceBetweenElements * (context.currentIndexTabBar - 0.5),
        {
          stiffness: 500,
          damping: 100,
        }
      );
    }, [context.currentIndexTabBar]);

    return (
      <LinearGradient
        style={styles.body}
        colors={["rgba(38,30,53,.4)", MAIN_COLOR]}
      >
        <View style={styles.tabs}>
          <Animated.View style={[styles.active, animatedStyle]} />
          {icons.map(({ component: Icon, route }, index) => (
            <TouchableOpacity
              onPress={() => handleClick(route, index + 1)}
              style={styles.item}
              key={index}
            >
              <Icon
                key={index}
                color={
                  context.currentIndexTabBar === index + 1 ? "#fff" : MAIN_COLOR
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    );
  }
};

export default CustomTabs;
