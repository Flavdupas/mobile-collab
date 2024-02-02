import { LinearGradient } from "expo-linear-gradient";
import { LIGHT_PURPLE } from "../../constants/Color";
import { TouchableOpacity, StyleSheet } from "react-native";
import Plus from "../icons/Plus";
import { Route, router } from "expo-router";

interface CreateBtnProps {
  href?: Route<"">;
  onPress?: () => void;
}

const CreateBtn: React.FC<CreateBtnProps> = ({ href, onPress }) => {
  const styles = StyleSheet.create({
    gradient: {
      height: 50,
      width: 50,
      position: "absolute",
      bottom: 140,
      right: 20,
      borderRadius: 25,
      zIndex: 1,
    },
    createBtn: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  });

  /* LOGIQUE */
  const handleClick = () => {
    if (onPress) {
      onPress();
    }
    if(href) {
        router.push(href);
    }
  };

  return (
    <LinearGradient
      style={styles.gradient}
      colors={[LIGHT_PURPLE, "rgba(161,152,218,1)"]}
    >
      <TouchableOpacity style={styles.createBtn} onPress={handleClick}>
        <Plus />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CreateBtn;
