import { View, Text, StyleSheet } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import InputEmail from "../../../src/components/auth/input/Email";
import Button from "../../../src/components/auth/Button";
import { useState } from "react";

const RegisterOne = () => {
  const [canGoNext, setCanGoNext] = useState(true);

  return (
    <RegisterLayout>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Adresse email</Text>
          <Text style={styles.subtitle}>Vous allez recevoir un email avec un code valable 30 minutes.</Text>
          <InputEmail />
        </View>
        <Button canGoNext={canGoNext} href="/register/2"/>
      </View>
    </RegisterLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom:40,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom:20,
  },
  subtitle: {
    color: "#fff",
    opacity:.8,
    fontWeight: "400",
    marginBottom:20,
  },
});
export default RegisterOne;
