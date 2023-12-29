import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import Button from "../../../src/components/auth/Button";
import InputCode from "../../../src/components/auth/input/Code";

const RegisterTwo = () => {

  const [canGoNext, setCanGoNext] = useState(true);

  return (
    <RegisterLayout>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Nous vous avons envoyé un code</Text>
          <Text style={styles.subtitle}>
            Vous avez reçu un code valable 30 minutes pour vérifier votre email.
            N'oubliez pas de regarder dans votre boite email d'indésirables ou
            de spam.
          </Text>
          <InputCode />
        </View>

        <Button canGoNext={canGoNext} href="/register/3" />
      </View>
    </RegisterLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom:15,
  },
  subtitle: {
    textAlign: "center",
    color: "#fff",
    opacity:.8,
    fontWeight: "400",
  },
});

export default RegisterTwo;
