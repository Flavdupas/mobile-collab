import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import Button from "../../../src/components/auth/Button";
import Plus from "../../../src/components/icons/Plus";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { router } from "expo-router";
import CarteEtudiantModal from "../../../src/components/auth/register/CarteEtudiantModal";
import { useEffect, useState } from "react";

const RegisterSeven = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setSelectedImage] = useState<string>();

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <>
      <RegisterLayout>
        <View style={styles.body}>
          <View style={{ flex: 1, paddingBottom: 20 }}>
            <Text style={styles.title}>Carte étudiante</Text>

            <View style={styles.containerImageNotUpload}>
              {!image && (
                <LinearGradient
                  colors={["#fff", "transparent"]}
                  style={styles.linear}
                />
              )}
              {image && <Image source={{ uri: image }} style={styles.linear} />}
              <Pressable
                style={styles.plusContainer}
                onPress={() => setShowModal(!showModal)}
              >
                <Plus />
              </Pressable>
            </View>
          </View>
          <Button canGoNext={false} href="/" />
        </View>
      </RegisterLayout>
      {showModal && (
        <CarteEtudiantModal setShowModal={setShowModal} setSelectedImage={setSelectedImage} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 15,
  },
  containerImageNotUpload: {
    flex: 1,
    backgroundColor: "transparent",
    borderRadius: 30,
    marginHorizontal: 10,
    marginTop: 10,
    borderStyle: "dashed",
    borderColor: "#fff",
    borderWidth: 1,
  },
  linear: {
    flex: 1,
    borderRadius: 30,
  },
  plusContainer: {
    backgroundColor: "#E6374E",
    width: 50,
    height: 50,
    borderRadius: 30,
    bottom: -10,
    right: -10,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  plus: {
    fontSize: 32,
    color: "#fff",
    borderRadius: 5,
  },
});

export default RegisterSeven;
