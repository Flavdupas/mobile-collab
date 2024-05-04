import { StyleSheet, TextInput, View, ViewStyle } from "react-native";
import Phone from "../../icons/Phone";
import { GRAY, MAIN_COLOR } from "../../../constants/Color";

interface InputPhoneProps {
  value:string | null;
  setValue:(arg0:string) =>  void;
  style?: ViewStyle;
}

const InputPhone: React.FC<InputPhoneProps> = ({value, setValue,style}) => {
  return (
    <View style={[styles.body,style]}>
      <TextInput
        placeholder="Entrer votre numéro de téléphone"
        placeholderTextColor={"#A8A5AE"}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={10}
        value={value ?? undefined}
        onChangeText={setValue}
      />
      <Phone style={styles.email} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor:'#fff',
    borderWidth:1,
    borderRadius:10,
    paddingHorizontal:10,
    paddingVertical:5,
    shadowColor: GRAY,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation:5,
      backgroundColor:MAIN_COLOR
  },
  input: {
    color: "white",
    flex: 1,
    fontSize:14,
  },
  email: {
    width: 25,
    height: 25,
  },
});

export default InputPhone;
