import { StyleSheet, TextInput, View } from "react-native";
import Email from "../../icons/Email";

interface InputEmailProps {
  value: string;
  onChangeText: (arg0:string) =>  void;
}

const InputEmail:React.FC<InputEmailProps> = ({value, onChangeText}) => {

  return (
    <View style={styles.body}>
      <TextInput
        placeholder="Entrer votre email"
        placeholderTextColor={"#A8A5AE"}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
      <Email style={styles.email} />
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
    height:"100%",
  },
  email: {
    width: 25,
    height: 25,
  },
});

export default InputEmail;
