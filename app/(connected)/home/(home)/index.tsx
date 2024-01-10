import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import { MAIN_COLOR } from "../../../../src/constants/Color";
import connectedStyle from "../../../../src/constants/ConnectedStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../../../src/store/store";
import IndexController from "../../../../src/viewController/connected/home";

const Index = () => {
  /* VARIABLES */
  const etudiant = useSelector((state: RootState) => state.connected.etudiant);
  /* STYLES */
  const styles = StyleSheet.create({});
  return (
    <View style={connectedStyle.body}>
      <Text style={connectedStyle.title}>Bonjour</Text>
      <Text style={connectedStyle.title}>
        {etudiant.prenom} {etudiant.nom}
      </Text>
      <IndexController />
    </View>
  );
};

export default Index;
