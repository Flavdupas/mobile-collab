import { ReactNode } from "react";
import { Keyboard, Pressable, StyleSheet, View } from "react-native";
import Header from "./register/Header";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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

export default AuthLayout;
