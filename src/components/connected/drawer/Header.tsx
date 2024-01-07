import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import Plus from "../../icons/PlusPurple";
import Verify from "../../icons/Verify";
import Money from "../../icons/Money";
import { router } from "expo-router";

const HeaderDrawer = () => {
  const styles = StyleSheet.create({
    /* HEADER */
    header: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    logo: {
      height: 60,
      width: 60,
      borderRadius: 50,
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    name: {
      color: "#fff",
      fontSize: 18,
    },
    verify: {
      transform: [{ translateY: 1.5 }],
    },
    birthday: {
      color: "#fff",
      fontWeight: "300",
      fontSize: 12,
    },
    /* CREDIT */
    creditContainer: {
      backgroundColor: "#3F3655",
      width: "100%",
      height: 50,
      borderRadius: 10,
      marginTop:20,
      padding: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    moneyContainer: {
      borderWidth: 1,
      borderColor: "#7D7199",
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
    },
    plusContainer: {
      backgroundColor: "#fff",
      width: 25,
      height: 25,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
    },
    headerTextContainer: {
      flex: 1,
      paddingHorizontal: 10,
    },
    textCredit: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "400",
    },
    credit: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
  });

  return (
    <View>
      <View style={styles.header}>
        <Image source={{ uri: "https://pic.re/image" }} style={styles.logo} />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>Gon Freecs</Text>
            <Verify style={styles.verify} />
          </View>
          <Text style={styles.birthday}>10 Octobre 2003</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.creditContainer}
        onPress={() => router.push("/home/")}
      >
        <View style={styles.moneyContainer}>
          <Money />
        </View>
        <View style={styles.headerTextContainer}>
          <Text style={styles.textCredit}>Mes crédits</Text>
          <Text style={styles.credit}>201.50</Text>
        </View>
        <View style={styles.plusContainer}>
          <Plus />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderDrawer;
