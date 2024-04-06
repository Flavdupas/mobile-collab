import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  View,
  Image,
  ImageBackground,
} from "react-native";
import { Match } from "../../data/interface/Match";
import { MAIN_COLOR } from "../../constants/Color";
const { width } = Dimensions.get("screen");

interface SwipeableCardProps {
  item: Match;
  setMatch: (arg0: { data: Match; like: boolean }) => void;
}
export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  item,
  setMatch,
}) => {
  // let xPosition = new Animated.Value(0);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [swipeDirection, setSwipeDirection] = useState<string>("left");
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  let cardOpacity = new Animated.Value(1);
  let rotateCard = xPosition.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < width - 250 && gestureState.dx > -width + 250) {
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > width - 250) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: width,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setMatch({ data: item, like: true });
        });
      } else if (gestureState.dx < -width + 250) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -width,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setMatch({ data: item, like: false });
        });
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        style.container,
        {
          opacity: cardOpacity,
          transform: [{ translateX: xPosition }, { rotate: rotateCard }],
        },
      ]}
    >
      <ImageBackground
        resizeMode="cover"
        style={style.image}
        source={{
          uri: `${apiUrl}/post/pp/${item[0].id_utilisateur}`,
        }}
      />
      <LinearGradient
        colors={["transparent", MAIN_COLOR]}
        style={style.gradient}
        start={[0, 0.2]}
      >
        <View style={style.ressourceContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={style.title}>
              {item[0].prenom} {item[0].nom}
            </Text>
            <Image
              style={{ height: 25, width: 25 }}
              source={require("../../assets/images/connected/common/verify.png")}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 5 }}>
            {item.themes.map((item, index) => [
              <View
                key={index}
                style={{
                  borderColor: MAIN_COLOR,
                  borderWidth: 3,
                  backgroundColor: "#fff",
                  padding: 3,
                  paddingHorizontal: 10,
                  borderRadius: 50,
                }}
              >
                <Text style={{ color: MAIN_COLOR, fontWeight: "bold" }}>
                  {item.libelle_theme}
                </Text>
              </View>,
            ])}
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    height: "100%",
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    bottom: 20,
    alignSelf: "center",
    borderColor: "rgba(255,255,255,.4)",
    borderWidth: 1,
  },
  image: {
    flex: 1,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  ressourceContainer: {
    position: "absolute",
    bottom: 24,
    left: 24,
  },
  title: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
