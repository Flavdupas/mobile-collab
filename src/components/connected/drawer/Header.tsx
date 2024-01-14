import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import Plus from "../../icons/PlusPurple";
import Verify from "../../icons/Verify";
import Money from "../../icons/Money";
import { router } from "expo-router";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Skeleton } from "moti/skeleton";

const HeaderDrawer = () => {
  /* VARIABLES */
  const etudiant = useSelector((state: RootState) => state.connected.etudiant);
  const birthday = etudiant.date_naissance
    ? new Date(etudiant.date_naissance)
    : new Date();
  const urlPersonnalPhoto = useSelector(
    (state: RootState) => state.connected.fetchData.pp
  );

  /* STYLES */
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
      resizeMode: "cover",
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
      marginTop: 20,
      padding: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    creditContainerSkeleton: {
      width: "100%",
      height: 50,
      borderRadius: 10,
      marginTop: 20,
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
        {urlPersonnalPhoto && (
          <Image source={{ uri: urlPersonnalPhoto }} style={styles.logo} />
        )}
        {!urlPersonnalPhoto && (
          <Skeleton radius={"round"} height={60} width={60} />
        )}
        {etudiant.prenom && etudiant.nom && (
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>
                {etudiant.prenom} {etudiant.nom}
              </Text>
              <Verify style={styles.verify} />
            </View>
            <Text style={styles.birthday}>
              {birthday.toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </Text>
          </View>
        )}
        {(!etudiant.prenom || !etudiant.nom) && (
          <Skeleton width={"86%"} height={45} />
        )}
      </View>
      {!etudiant.credit && (
        <View style={styles.creditContainerSkeleton}>
          <Skeleton width={"100%"} height={"100%"} />
        </View>
      )}
      {etudiant.credit && (
        <TouchableOpacity
          style={styles.creditContainer}
          onPress={() => router.push("/home/")}
        >
          <View style={styles.moneyContainer}>
            <Money />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.textCredit}>Mes crédits</Text>
            <Text style={styles.credit}>{etudiant.credit}</Text>
          </View>
          <View style={styles.plusContainer}>
            <Plus />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderDrawer;
