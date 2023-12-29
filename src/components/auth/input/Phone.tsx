import { StyleSheet, TextInput, View } from "react-native";
import Phone from "../../icons/Phone";

const InputPhone = () => {
  return (
    <View style={styles.body}>
      <TextInput
        placeholder="Entrer votre numéro de téléphone"
        placeholderTextColor={"#A8A5AE"}
        style={styles.input}
        keyboardType="number-pad"
        maxLength={10}
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
    shadowColor: "#C3C3C3",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation:5,
      backgroundColor:'#261E35'
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
