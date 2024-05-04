import { MotiView } from "moti";
import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Dimensions, StyleSheet } from "react-native";
import { GRAY, MAIN_COLOR, SOFT_PURPLE } from "../../../constants/Color";

const { width } = Dimensions.get("window");

const pinLength = 4;
const pinContainerSize = width / 2;
const pinSize = (pinContainerSize / pinLength) * 1.25;

const _spacing = 20;

interface InputCodeProps {
  code: number[];
  setCode: (arg0:number[]) => void;
} 

const InputCode:React.FC<InputCodeProps> = ({code,setCode}) => {

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = Array(pinLength)
    .fill(null)
    .map(() => useRef<TextInput>(null));

  const handleChange = (value: string, index: number) => {
    const updatedCode = [...code];
    if (value === "" || value === null) {
      updatedCode[index] = -1;
      const nextIndex = index - 1;
      if (!(code[index + 1] >= 0)) {
        if (nextIndex >= 0 && inputRefs[nextIndex]) {
          inputRefs[nextIndex]?.current?.focus();
        }
      }
    } else {
      if (!isNaN(Number(value))) {
        updatedCode[index] = parseInt(value, 10);
        const nextIndex = index + 1;
        if (!(code[index - 1] >= 0 && code[nextIndex] >= 0)) {
          if (nextIndex < pinLength && inputRefs[nextIndex]) {
            inputRefs[nextIndex]?.current?.focus();
          }
        }
      }
    }

    setCode(updatedCode);
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(null);
  };
  const [backgroundColor, setBackgroundColor] = useState<string>(MAIN_COLOR);

  useEffect(() => {
    const intervalid = setInterval(() => {
      setBackgroundColor((prevColor) =>
        prevColor === MAIN_COLOR ? GRAY : MAIN_COLOR
      );
    }, 1000);
    return () => clearInterval(intervalid);
  }, []);

  return (
    <View style={styles.containerInput}>
      {[...Array(pinLength).keys()].map((i) => {
        const isSelected = code[i] >= 0;
        const isFocused = focusedIndex === i;

        return (
          <MotiView
            key={`pin-${i}`}
            style={styles.bubble}
            transition={{
              type: "timing",
              duration: 300,
            }}
            animate={{
              height: isSelected ? pinSize : 2,
            }}
          >
            <Text style={styles.value}>{code[i] >= 0 && code[i]}</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              onChangeText={(value) => handleChange(value, i)}
              onFocus={() => handleFocus(i)}
              onBlur={handleBlur}
              ref={inputRefs[i]}
              maxLength={1}
              value={code[i] >= 0 ? code[i].toString() : ""}
            />
            {isFocused && (
              <View
                style={[
                  styles.indicator,
                  {
                    left: code[i] >= 0 ? pinSize : 0,
                    backgroundColor: backgroundColor,
                  },
                ]}
              />
            )}
          </MotiView>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  containerInput: {
    flexDirection: "row",
    gap: _spacing / 1.5,
    marginBottom: _spacing * 2,
    height: pinSize + 25,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  bubble: {
    width: pinSize,
    borderRadius: pinSize,
    backgroundColor: SOFT_PURPLE,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    position: "absolute",
    bottom: 0,
    width: pinSize,
    height: pinSize,
    opacity: 0,
  },
  indicator: {
    position: "absolute",
    bottom: (pinSize - pinSize / 1.5) / 2,
    width: 1,
    height: pinSize / 1.5,
    opacity: 1,
  },
});

export default InputCode;
