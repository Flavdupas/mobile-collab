import { useEffect, useState } from "react";
import { TextInput, Text } from "react-native";

const InputDate = () => {
  const [value, setValue] = useState("");
  const [displayValue, setDisplayValue] = useState<string>();

  const handleChange = (value: string) => {
    setValue(value);
  };

  useEffect(() => {
    if (value.length === 0) {
      setDisplayValue(`jj / mm / yyyy`);
    }
    if (value.length === 1) {
      setDisplayValue(`${value}j / mm / yyyy`);
    } else if (value.length === 2) {
      setDisplayValue(`${value} / mm / yyyy`);
    } else if (value.length === 3) {
      setDisplayValue(`${value.slice(0, 2)} / ${value.charAt(2)}m / yyyy`);
    } else if (value.length === 4) {
      setDisplayValue(`${value.slice(0, 2)} / ${value.slice(2, 4)} / yyyy`);
    } else if (value.length === 5) {
      setDisplayValue(
        `${value.slice(0, 2)} / ${value.slice(2, 4)} / ${value.slice(4, 5)}yyy`
      );
    } else if (value.length === 6) {
      setDisplayValue(
        `${value.slice(0, 2)} / ${value.slice(2, 4)} / ${value.slice(4, 6)}yy`
      );
    } else if (value.length === 7) {
      setDisplayValue(
        `${value.slice(0, 2)} / ${value.slice(2, 4)} / ${value.slice(4, 7)}y`
      );
    } else if (value.length === 8) {
      setDisplayValue(
        `${value.slice(0, 2)} / ${value.slice(2, 4)} / ${value.slice(4, 8)}`
      );
    }
  }, [value]);

  return (
    <>
      <Text style={{ color: "white", flex: 1 }}>{displayValue}</Text>
      <TextInput
        placeholder="jj / mm / yyyy"
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={8}
        style={{
          flex: 1,
          position:'absolute',
          width:"100%",
          opacity:0
        }}
        placeholderTextColor={"#fff"}
      />
    </>
  );
};

export default InputDate;
