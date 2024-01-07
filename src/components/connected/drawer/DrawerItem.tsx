import { Route, router } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import Chevron from "../../icons/ChevromPurple";
import Person from "../../icons/Person";
import { SOFT_PURPLE } from "../../../constants/Color";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DrawerItemProps {
  href: Route<"">;
  title: string;
  icon: any;
  iconWidth?:number;
  iconHeight?:number;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ href, title, icon, iconHeight, iconWidth }) => {
  const styles = StyleSheet.create({
    /* ROUTE */
    route: {
      flexDirection: "row",
      height: 40,
      alignItems: "center",
      justifyContent: "space-between",
      marginTop:10,
    },
    containerLogo: {
      height: 40,
      width: 40,
      backgroundColor: SOFT_PURPLE,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    containerRouteText: {
      flex: 1,
      marginLeft: 10,
      fontWeight: "800",
    },
    routeTitle: {
      color: "#fff",
    },
    image: {
        height:iconWidth ?? 20,
        width:iconHeight ?? 20,
    }
  });

  return (
    <TouchableOpacity style={styles.route} onPress={() => router.push(href)}>
      <View style={styles.containerLogo}>
         <Image source={icon} style={styles.image}/>
      </View>
      <View style={styles.containerRouteText}>
        <Text style={styles.routeTitle}>{title}</Text>
      </View>
      <Chevron />
    </TouchableOpacity>
  );
};

export default DrawerItem;
