import { View, Text, StyleSheet } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import InputPhone from "../../../src/components/auth/input/Phone";
import Button from "../../../src/components/auth/Button";
import { useState } from "react";
const RegisterFour = () => {
  const [canGoNext, setCanGoNext] = useState(true);

  return (
    <RegisterLayout>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Numéro de téléphone</Text>
          <InputPhone />
        </View>
        <Button canGoNext={canGoNext} href="/register/5" />
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
    fontWeight: "bold",
    marginBottom: 15,
  },
});

export default RegisterFour;
