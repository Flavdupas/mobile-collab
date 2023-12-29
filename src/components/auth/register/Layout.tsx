import { ReactNode } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import Header from "./Header";

interface RegisterLayoutProps {
  children: ReactNode;
}

const RegisterLayout: React.FC<RegisterLayoutProps> = ({ children }) => {
  const styles = StyleSheet.create({
    body: {
      backgroundColor: "#261E35",
      flex: 1,
    },
  });

  return (
      <Pressable style={[styles.body]} onPress={Keyboard.dismiss}>
        <Header />
        {children}
      </Pressable>
  );
};

export default RegisterLayout;
