import { TouchableOpacity, View, Text } from "react-native";
import Layout from "../../../src/components/connected/Layout";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import AuthModel from "../../../src/model/auth/Auth";
import { updateUtilisateur } from "../../../src/store/connected/connected";
import { updateToken } from "../../../src/store/login/login";
import { router } from "expo-router";
import resetHistory from "../../../src/utils/router";

const Index = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const model = new AuthModel();
  const dispatch = useDispatch();
  const handleDelete = async () => {
    if (token) {
      model.closeAccount(token);
      dispatch(updateToken(null));
      resetHistory().then(() => {
        router.replace("/");
      });
    }
  };
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
        <View style={{ flex: 1 }}></View>
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
