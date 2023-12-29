import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Dimensions,
  Platform,
  TextInput,
} from "react-native";
import Birthday from "../../icons/Birthday";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import InputDate from "./Date";

const InputBirthday = () => {
  const offset = useSharedValue(0);
  const OVERDRAG = 20;
  const HEIGHT = (Dimensions.get("window").height * 25) / 100;

  const TODAY = new Date();
  const MIN_DATE = new Date(1900, 0, 2);
  const [birthDay, setBirthDay] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const tooglePicker = () => {
    setShowPicker(!showPicker);
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < HEIGHT / 1.5) {
        //don't toogle, keep show on screen
        offset.value = withSpring(0);
      } else {
        //hide from screen
        offset.value = withTiming(HEIGHT, {}, () => {
          runOnJS(tooglePicker)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const onChange = (
    { type }: { type: string },
    selectedDate: Date | undefined
  ) => {
    tooglePicker();
    if (
      selectedDate &&
      type != "dismissed" &&
      selectedDate <= TODAY &&
      selectedDate >= MIN_DATE
    ) {
      setBirthDay(selectedDate);
    }
  };

  return (
    <>
      {Platform.OS === "ios" && (
        <>
          <View style={styles.body}>
            <Pressable
              onPress={() => tooglePicker()}
              style={styles.containerValue}
            >
              <Text style={styles.input}>{birthDay?.toLocaleDateString('fr-FR',{day:"numeric",month:"long",year:"numeric"})}</Text>
              <Birthday style={styles.birthday} />
            </Pressable>
          </View>
          {showPicker && (
            <GestureDetector gesture={pan}>
              <Animated.View
                style={[styles.sheet, translateY]}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}
              >
                <Text style={styles.birthdayTxtInstruction}>
                  Date de naissance
                </Text>
                <DateTimePicker
                  locale="fr"
                  value={birthDay}
                  mode="date"
                  display={"spinner"}
                  onChange={onChange}
                  minimumDate={MIN_DATE}
                  maximumDate={TODAY}
                />
              </Animated.View>
            </GestureDetector>
          )}
        </>
      )}
      {Platform.OS === "android" && (
        <View style={styles.body}>
          <InputDate />
          <Birthday style={styles.birthday} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    height: 50,
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#C3C3C3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    backgroundColor: "#261E35",
  },
  input: {
    color: "white",
    fontSize: 14,
  },
  containerValue: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  birthday: {
    width: 20,
    height: 20,
  },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: "55%",
    width: "100%",
    position: "absolute",
    bottom: -20 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  birthdayTxtInstruction: {
    fontSize: 28,
    marginBottom: 10,
  },
});

export default InputBirthday;
