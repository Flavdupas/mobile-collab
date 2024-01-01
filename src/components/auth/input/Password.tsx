import { useState } from "react";
import { Image, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

interface InputPasswordProps {
    placeholder?:string,
    style?:ViewStyle | TextStyle;
}

const InputPassword:React.FC<InputPasswordProps> = ({placeholder,style}) => {
  const [show, setShow] = useState(false);

  return (
    <View style={[styles.body,style]}>
      <TextInput style={styles.text} placeholder={placeholder} secureTextEntry={!show} placeholderTextColor={"#A8A5AE"}/>
      <TouchableWithoutFeedback onPress={() => setShow(!show)}>
        <Image
          source={
            show
              ? require("../../../assets/images/auth/register/eye-open.png")
              : require("../../../assets/images/auth/register/eye-closed.png")
          }
          style={styles.image}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  text: {
    color: "#fff",
    flex:1,
    height:"100%"
  },
  image: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
});

export default InputPassword;
