import { Route, router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ButtonProps {
  canGoNext: boolean;
  href: Route<"">;
}

const Button: React.FC<ButtonProps> = ({ canGoNext, href }) => {
  const styles = StyleSheet.create({
    body: {
      height: 40,
      width: 300,
      backgroundColor: canGoNext ? "#fff" : "#E3DFDF",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      shadowColor: canGoNext ? "#C3C3C3" : "#9B9999",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 8,
    },
    text: {
      fontSize: 20,
      color: canGoNext ? "#000" : "#4D4D4D",
      fontWeight: "bold",
    },
  });

  const onPress = () => {
    if (canGoNext) {
      router.push(href);
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.body}>
        <Text style={styles.text}>Continuer</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
