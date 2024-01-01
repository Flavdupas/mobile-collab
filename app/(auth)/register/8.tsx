import Button from "../../../src/components/auth/Navigate";
import InputPassword from "../../../src/components/auth/input/Password";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import { StyleSheet, Text, View } from "react-native";

const RegisterHeight = () => {
  return (
    <RegisterLayout>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Mot de passe</Text>
          <InputPassword
            placeholder="Mot de passe"
            style={styles.inputPassword}
          />
          <InputPassword placeholder="Confirmation mot de passe" />
        </View>
        <Button canGoNext={true} href="/register/9" />
      </View>
    </RegisterLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 15,
  },
  inputPassword: {
    marginBottom: 20,
  },
});

export default RegisterHeight;
