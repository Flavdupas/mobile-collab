import { View, Text } from "react-native";
import Layout from "../../../src/components/connected/Layout";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import { useEffect } from "react";
import AuthModel from "../../../src/model/auth/Auth";

const Index = () => {
  const notif = useSelector(
    (state: RootState) => state.connected.notifications
  );
  const token = useSelector((state: RootState) => state.login.token);
  const model = new AuthModel();

  useEffect(() => {
    const handle = async () => {
      if (notif && token) {
        const idNotifications = notif.map(
          (notification) => notification.id_notification
        );
        model.watchNotif(token, idNotifications);
      }
    };
    handle();
  }, []);
  return (
    <Layout>
      <View style={{ flex: 1, paddingTop: 150, paddingHorizontal: 20, gap:10 }}>
        {notif &&
          notif.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: SOFT_PURPLE,
                  width: "100%",
                  paddingVertical: 20,
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "#fff" }}>{item.titre}</Text>
              </View>
            );
          })}
      </View>
    </Layout>
  );
};

export default Index;
