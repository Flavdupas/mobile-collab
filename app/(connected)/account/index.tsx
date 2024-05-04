import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import Layout from "../../../src/components/connected/Layout";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import AuthModel from "../../../src/model/auth/Auth";
import {
  updateEtudiant,
  updateUtilisateur,
} from "../../../src/store/connected/connected";
import { updateToken } from "../../../src/store/login/login";
import { router } from "expo-router";
import resetHistory from "../../../src/utils/router";
import { useEffect, useState } from "react";
import { isValidEmail, isValidPhoneNumber } from "../../../src/utils/string";

const Index = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const model = new AuthModel();
  const etudiant = useSelector((state: RootState) => state.connected.etudiant);
  const user = useSelector((state: RootState) => state.connected.utilisateur);
  const [surname, setSurname] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (etudiant && user) {
      setFirstname(etudiant.prenom ?? "");
      setSurname(etudiant.nom ?? "");
      setPhone(etudiant.telephone ?? "");
      setEmail(user.email ?? "");
    }
  }, []);

  const handleDelete = async () => {
    if (token) {
      model.closeAccount(token);
      dispatch(updateToken(null));
      resetHistory().then(() => {
        router.replace("/");
      });
    }
  };

  const handleModify = async () => {
    if (token) {
      const tempEtudiant = { ...etudiant };
      const tempUser = { ...user };
      if (isValidEmail(email)) {
        tempUser.email = email;
      }
      if (isValidPhoneNumber(phone)) {
        etudiant.telephone = phone;
      }
      if (firstname) {
        tempEtudiant.prenom = firstname;
      }
      if (surname) {
        tempEtudiant.nom = surname;
      }
      dispatch(updateUtilisateur(tempUser));
      dispatch(updateEtudiant(tempEtudiant));
      model.modifyAccount(token, firstname, surname, phone,email, password);
    }
  };
  const styles = StyleSheet.create({
    input: {
      flex: 1,
      borderColor: SOFT_PURPLE,
      borderWidth: 1,
      borderRadius: 10,
      color: "#fff",
      padding: 5,
    },
    inputFull: {
      height: 50,
      width: "100%",
      borderColor: SOFT_PURPLE,
      borderWidth: 1,
      borderRadius: 10,
      color: "#fff",
      padding: 5,
    },
  });
  return (
    <Layout>
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
          paddingTop: 150,
          alignItems: "center",
        }}
      >
        <View
          style={{ flex: 1, width: "100%", paddingHorizontal: 10, gap: 20 }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
              height: 50,
            }}
          >
            <TextInput
              style={styles.input}
              onChangeText={setFirstname}
              value={firstname}
            ></TextInput>
            <TextInput
              style={styles.input}
              onChangeText={setSurname}
              value={surname}
            ></TextInput>
          </View>
          <TextInput
            style={styles.inputFull}
            onChangeText={setPhone}
            value={phone}
          ></TextInput>
          <TextInput
            style={styles.inputFull}
            onChangeText={setEmail}
            value={email}
          ></TextInput>
          <TextInput
            onChangeText={setPassword}
            placeholder="Insérer un mot de passe"
            style={styles.inputFull}
            value={password}
            placeholderTextColor={"rgba(255,255,255,.5)"}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={handleModify}
          style={{
            height: 50,
            width: "90%",
            borderRadius: 50,
            marginTop: 20,
            backgroundColor: SOFT_PURPLE,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Modifier son compte
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            height: 50,
            width: "90%",
            borderRadius: 50,
            marginBottom: 50,
            marginTop: 20,
            backgroundColor: SOFT_PURPLE,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
            Supprimer son compte
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default Index;
