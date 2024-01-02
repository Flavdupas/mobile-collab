import { memo, useEffect, useState } from "react";
import Navigate from "../../../components/auth/Navigate";
import CarteEtudiantModal from "../../../components/auth/register/CarteEtudiantModal";
import { Pressable, View, Image, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Plus from "../../../components/icons/Plus";
import global from "../../../constants/Global";
import AuthLayout from "../../../components/auth/Layout";
import { useDispatch } from "react-redux";
import { updateCarteEtudiante } from "../../../store/register/register";
import { router } from "expo-router";

const RegisterSevenController = () => {
  /* Variables */
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const dispatch = useDispatch();

  /* Style */
  const styles = StyleSheet.create({
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
  });

  /* Logique */
  const onClick = () => {
    if (image) {
      dispatch(updateCarteEtudiante(image));
      router.push("/register/8");
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (image) {
      setShowError(false);
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [image]);

  /* Composants */
  return (
    <>
      <AuthLayout>
        <View style={global.body}>
          <View style={{ flex: 1, paddingBottom: 20 }}>
            <Text style={global.title}>Carte étudiante</Text>
            {showError && (
              <Text style={global.error}>
                Vous devez founir votre carte étudiante pour valider votre
                compte
              </Text>
            )}
            <View style={styles.containerImageNotUpload}>
                <ImageController image={image} setShowModal={setShowModal} showModal={showModal}/>
            </View>
          </View>
          <ButtonNext
            disabled={disabled}
            onClick={onClick}
            setShowError={setShowError}
          />
        </View>
      </AuthLayout>
      {showModal && (
        <CarteEtudiantModalController
          setShowModal={setShowModal}
          setSelectedImage={setImage}
        />
      )}
    </>
  );
};

interface ImageControllerProps {
    image:string | null;
    setShowModal: (arg0:boolean) => void;
    showModal: boolean;
}

const ImageController: React.FC<ImageControllerProps> = ({ image, setShowModal, showModal }) => {
  const styles = StyleSheet.create({
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
  });

  return (
    <>
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
    </>
  );
};

interface CarteEtudiantModalControllerProps {
  setShowModal: (arg0: boolean) => void;
  setSelectedImage: (arg0: string) => void;
}

const CarteEtudiantModalController: React.FC<
  CarteEtudiantModalControllerProps
> = ({ setShowModal, setSelectedImage }) => {
  return (
    <CarteEtudiantModal
      title="Carte étudiante"
      setShowModal={setShowModal}
      setSelectedImage={setSelectedImage}
    />
  );
};

/* Interface Button pour aller a la page suivante */
interface ButtonNextProps {
  disabled: boolean;
  onClick: () => void;
  setShowError: (arg0: boolean) => void;
}

const ButtonNext: React.FC<ButtonNextProps> = memo(
  ({ disabled, onClick, setShowError }) => (
    <Navigate disabled={disabled} onClick={onClick} setShowError={setShowError}>
      Continuer
    </Navigate>
  )
);

export default RegisterSevenController;
