import { View, Image, StyleSheet, Text, Platform } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import Round from "../../../src/components/auth/Round";
import Button from "../../../src/components/auth/Navigate";
import { useState } from "react";
import Toggle from "react-native-toggle-element/lib/toggle";

const RegisterFive = () => {
  const [toggleValue, setToggleValue] = useState<boolean | undefined>(false);
  return (
    <RegisterLayout>
      <View style={styles.body}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../src/assets/images/auth/slide-3.png")}
              style={styles.image}
            />
            <Round size={16} color="#FAAEAE" bottom={30} right={0} />
            <Round size={10} color="#FCE2D4" bottom={0} left={30} />
            <Round size={16} color="#D4FCF5" top={0} left={90} />
          </View>
          <Text style={styles.title}>Nouvelle rencontre</Text>
          <Text style={styles.subtitle}>
            Souhaitez-vous faire de nouvelles rencontres grâce au système de
            match de notre application ?
          </Text>
          <Toggle
            value={toggleValue}
            onPress={(value) => setToggleValue(value)}
            trackBar={{
              width: 200,
              height: 35,
            }}
            trackBarStyle={styles.toogle}
            thumbStyle={{
              height: 35,  
            }}
            thumbButton={{
              inActiveBackgroundColor: "#D3EFC6",
              activeBackgroundColor: "#FAAEAE",
            }}
          />
        </View>
        <Button canGoNext={true} href="/register/6" />
      </View>
    </RegisterLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
    flex: 1,
  },
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  image: {
    height: Platform.OS === "android" ? 250 : 300,
    resizeMode: "contain",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    textAlign: "center",
    fontWeight: "bold",
    marginTop:15,
  },
  subtitle: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "400",
    marginTop: 15,
  },
  container: {
    alignItems: "center",
  },
  toogle: {
    backgroundColor: "#715C98",
    marginTop: 15,
  },
});

export default RegisterFive;
