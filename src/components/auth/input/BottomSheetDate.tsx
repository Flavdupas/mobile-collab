import React, { useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Animated, {
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

interface BottomSheetDateProps {
    showPicker:boolean;
    setShowPicker: (arg0: boolean) => void;
    date:Date | null;
    setDate: (arg0: Date) => void;
}

const BottomSheetDate:React.FC<BottomSheetDateProps> = ({showPicker,setShowPicker,date, setDate}) => {
  const offset = useSharedValue(0);
  const OVERDRAG = 20;
  const HEIGHT = (Dimensions.get("window").height * 25) / 100;

  const TODAY = new Date();
  const MIN_DATE = new Date(1900, 0, 2);

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
      setDate(selectedDate);
    }
  };
  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={[styles.sheet, translateY]}
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown}
      >
        <Text style={styles.birthdayTxtInstruction}>Date de naissance</Text>
        <DateTimePicker
          locale="fr"
          value={date ?? new Date()}
          mode="date"
          display={"spinner"}
          onChange={onChange}
          minimumDate={MIN_DATE}
          maximumDate={TODAY}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: "45%",
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

export default BottomSheetDate;
