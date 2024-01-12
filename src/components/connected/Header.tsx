import { memo, useEffect, useState } from "react";
import { Platform, StyleSheet, View, Image, Text } from "react-native";
import AuthModel from "../../model/auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { updatePersonnalPhoto } from "../../store/connected/connected";
import {
  LIGHT_PURPLE,
  MAIN_COLOR,
  SOFT_PURPLE,
  SUPER_LIGHT_PURPLE,
} from "../../constants/Color";
import Money from "../icons/Money";
import Notification from "../icons/Notification";
import { Skeleton } from "moti/skeleton";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  DrawerNavigationProp,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import { useNavigation } from "expo-router";
import { ParamListBase } from "@react-navigation/native";

const Header = () => {
  /* VARIABLES */
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const token = useSelector((state: RootState) => state.login.token);
  const credit = useSelector(
    (state: RootState) => state.connected.etudiant.credit
  );
  const model = new AuthModel();
  const notifications = useSelector(
    (state: RootState) => state.connected.notifications
  );
  const active = notifications ? notifications.length > 1 : false;
  const [url, setUrl] = useState<string | null>(null);
  const dispatch = useDispatch();

  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      height: Platform.OS === "ios" ? 115 : 85,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "flex-end",
      paddingBottom: 10,
      backgroundColor: MAIN_COLOR,
    },
    containerIcons: {
      flexDirection: "row",
      gap: 20,
    },
    logo: {
      height: 50,
      width: 50,
      borderRadius: 50,
      resizeMode: "cover",
    },
    notificationContainer: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: SOFT_PURPLE,
      borderWidth: 1,
      borderColor: "rgba(217,203,255,.4)",
      justifyContent: "center",
      alignItems: "center",
    },
    creditContainer: {
      width: 165,
      height: 30,
      backgroundColor: SOFT_PURPLE,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      paddingHorizontal: 5,
    },
    credit: {
      fontSize: 16,
      color: SUPER_LIGHT_PURPLE,
      fontWeight: "600",
    },
    libelle: {
      color: SUPER_LIGHT_PURPLE,
      fontWeight: "400",
    },
  });

  /* LOGIQUE */
  useEffect(() => {
    const fetchPP = async () => {
      if (token) {
        const tempUrl = await model.getPP(token);
        setUrl(tempUrl);
        if (tempUrl) {
          dispatch(updatePersonnalPhoto(tempUrl));
        }
      }
    };
    fetchPP();
  }, [token]);
  return (
    <View style={styles.body}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 15,
        }}
      >
        {credit && (
          <View style={styles.creditContainer}>
            <Money />
            <View
              style={{ flexDirection: "row", alignItems: "flex-end", gap: 3 }}
            >
              <Text style={styles.credit}>{credit}</Text>
              <Text style={styles.libelle}>crédits</Text>
            </View>
          </View>
        )}
        {!credit && <Skeleton width={165} height={30} radius={"round"} />}
        <View style={styles.containerIcons}>
          {notifications && (
            <TouchableOpacity style={styles.notificationContainer}>
              <Notification active={active} />
            </TouchableOpacity>
          )}
          {!notifications && (
            <Skeleton radius={"round"} height={50} width={50} />
          )}
          {url && (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={{ uri: url }} style={styles.logo} />
            </TouchableOpacity>
          )}
          {!url && <Skeleton radius={"round"} height={50} width={50} />}
        </View>
      </View>
    </View>
  );
};

export default memo(Header);
