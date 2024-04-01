import { DrawerContentComponentProps, DrawerContentScrollView} from "@react-navigation/drawer";
import { View, Text, StyleSheet } from "react-native";
import ButtonDrawer from "./drawer/Button";
import HeaderDrawer from "./drawer/Header";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { MAIN_COLOR } from "../../constants/Color";
import DrawerItem from "./drawer/DrawerItem";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface CustomDrawerProps {
    props: DrawerContentComponentProps;
}

const CustomDrawer:React.FC<CustomDrawerProps> = ({props}) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  const styles = StyleSheet.create({
    body: {
      backgroundColor: MAIN_COLOR,
      paddingHorizontal: 25,
      paddingTop: 25,
      paddingBottom:40,
    },

    /* SECTION */
    titleSection: {
      color: "#fff",
      fontWeight: "600",
      marginTop: 40,
      fontSize: 14,
    },
  });

  return (
    <DrawerContentScrollView
      {...props}
      style={styles.body}
      contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
    >
      <View>
        <HeaderDrawer />
        <View>
          <Text style={styles.titleSection}>Paramètres</Text>
          <DrawerItem
            title="Mon compte"
            href="/account/"
            icon={require("../../../src/assets/images/connected/drawer/person.png")}
          />
          <Text style={styles.titleSection}>Compte</Text>
          <DrawerItem
            title="Mes services"
            href="/service/user"
            icon={require("../../../src/assets/images/connected/drawer/service.png")}
          />
          <DrawerItem
            title="Mes posts"
            href="/post/user"
            icon={require("../../../src/assets/images/connected/drawer/proposition.png")}
          />
          <Text style={styles.titleSection}>Support</Text>
          <DrawerItem
            title="Nous contacter"
            href="/contact/"
            icon={require("../../../src/assets/images/connected/drawer/contact.png")}
            iconHeight={25}
            iconWidth={25}
          />
        </View>
      </View>
      <ButtonDrawer />
    </DrawerContentScrollView>
  );
}

export default CustomDrawer;