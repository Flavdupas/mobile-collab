import { Text, StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import connectedStyle from "../../../../src/constants/ConnectedStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/store/store";
import IndexController from "../../../../src/viewController/connected/home";
import { Skeleton } from "moti/skeleton";

const Index = () => {
  /* VARIABLES */
  const etudiant = useSelector((state: RootState) => state.connected.etudiant);
  /* STYLES */
  const styles = StyleSheet.create({
    title: {
      marginLeft: 20,
    },
    skeletonContainer: {
      paddingHorizontal: 20,
    },
  });

  return (
    <ScrollView style={connectedStyle.body}>
      <Text style={[connectedStyle.title, styles.title]}>Bonjour</Text>
      {etudiant.nom && etudiant.prenom && (
        <Text style={[connectedStyle.title, styles.title]}>
          {etudiant.prenom} {etudiant.nom}
        </Text>
      )}
      {(!etudiant.nom || !etudiant.prenom) && (
        <View style={styles.skeletonContainer}>
          <Skeleton height={40} width={"100%"} />
        </View>
      )}
      <IndexController />
    </ScrollView>
  );
};

export default Index;
