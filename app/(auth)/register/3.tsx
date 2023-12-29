import { View, Text, StyleSheet } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import InputBirthday from "../../../src/components/auth/input/Birthday";
import Button from "../../../src/components/auth/Button";
import { useState } from "react";

const RegisterThree = () => {
  const [canGoNext, setCanGoNext] = useState(true);

  return (
    <RegisterLayout>
      <Text style={styles.title}>Date de naissance</Text>
      <View style={styles.body}>
        <InputBirthday />
        <Button canGoNext={canGoNext} href="/register/4" />
      </View>
    </RegisterLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 40,
    //paddingHorizontal:20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    marginHorizontal:20,
  },
});

export default RegisterThree;
