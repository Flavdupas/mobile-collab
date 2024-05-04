import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MAIN_COLOR } from "../../constants/Color";
import Chevron from "../icons/ChevronWhite";
import { router } from "expo-router";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      backgroundColor: MAIN_COLOR,
      flex: 1,
    },
    goBackBtn: {
      position: "absolute",
      top: 80,
      left: 30,
      zIndex: 9999,
      width:40,
      height:40,
      justifyContent:"center",
      alignItems:"center",
      borderRadius:25,
      backgroundColor :"rgba(38,30,53,.4)"
    },
  });

  /* LOGIQUE */
  const handleClick = () => {
    router.back();
  };

  return (
    <View style={styles.body}>
      <TouchableOpacity style={styles.goBackBtn} onPress={handleClick}>
        <Chevron imageStyle={{width:10,height:20, transform: [{translateX:-2}]}}/>
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default Layout;
