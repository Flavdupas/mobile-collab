import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";
import global from "../../src/constants/Global";
import { MAIN_COLOR } from "../../src/constants/Color";
import LottieView from "lottie-react-native";

const Register = () => {
  return (
    <View style={[styles.body]}>
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop
          style={styles.lottieOne}
          source={require("../../src/assets/animations/Computer.json")}
        />
        <Text style={global.title}>Inscription en cours</Text>
        <Text style={[global.subtitle, styles.subtitle]}>
          Votre inscription est en cours, merci de ne pas quitter l'application
        </Text>
        <LottieView
          autoPlay
          loop
          style={styles.lottieTwo}
          source={require("../../src/assets/animations/Loading.json")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: MAIN_COLOR,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal:20
  },
  lottieOne: {
    width: 300,
    height: 300,
  },
  lottieTwo: {
    height: 75,
    width: 300,
  },
  subtitle: {
    textAlign: "center",
  },
  container: {
    paddingBottom:100,
    alignItems:"center",
  }
});

export default Register;
