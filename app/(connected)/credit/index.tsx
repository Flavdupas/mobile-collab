import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Layout from "../../../src/components/connected/Layout";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import { useState } from "react";
import AuthModel from "../../../src/model/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { router } from "expo-router";
import { updateEtudiant } from "../../../src/store/connected/connected";

const Index = () => {
  const [amount, setAmount] = useState<number>(0);
  const model = new AuthModel();
  const token = useSelector((state: RootState) => state.login.token);
  const user = useSelector((state: RootState) => state.connected.etudiant);
  const dispatch = useDispatch();

  const handleClick = async () => {
    const temp = { ...user };
    if (token && temp.credit) {
      temp.credit = temp.credit + amount;
      model.addCredit(token, amount);
      dispatch(updateEtudiant(temp));
      router.back();
    }
  };
  return (
    <Layout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 150,
            justifyContent: "space-between",
          }}
        >
          <TextInput
            onChangeText={(amount) => setAmount(Number(amount))}
            keyboardType="numeric"
            style={{
              width: "100%",
              height: 50,
              borderRadius: 10,
              backgroundColor: SOFT_PURPLE,
              color: "#fff",
              fontWeight: "500",
            }}
          ></TextInput>
          <TouchableOpacity
            onPress={handleClick}
            style={{
              height: 50,
              width: "100%",
              backgroundColor: SOFT_PURPLE,
              borderRadius: 10,
              marginBottom: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Ajouter
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Layout>
  );
};

export default Index;
