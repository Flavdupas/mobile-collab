import { View, Text, StyleSheet } from "react-native";
import Navigate from "../../../components/auth/Navigate";
import { memo, useEffect, useState } from "react";
import InputEmail from "../../../components/auth/input/Email";
import { useDispatch } from "react-redux";
import {
  updateEmail,
  updateThemesData,
} from "../../../store/register/register";
import global from "../../../constants/Global";
import { router } from "expo-router";
import RegisterViewModel from "../../../viewModel/auth/Register";
import LottieView from "lottie-react-native";

const RegisterOneController = () => {
  /* Variables */
  const [disabled, setDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const viewModel = new RegisterViewModel();
  const dispatch = useDispatch();

  //Chargement en avance des donnees du screen register 6
  useEffect(() => {
    const preLoad = async () => {
      const data = await viewModel.getThemes();
      if (data) {
        const transformedData = data.map((theme) => ({
          id: theme.id_theme,
          title: theme.libelle_theme,
        }));
        dispatch(updateThemesData(transformedData));
      }
    };
    preLoad();
  }, []);

  const onClick = async () => {
    if (email) {
      setIsLoading(true);
      setDisabled(true);
      const reponse = await viewModel.emailExists(email); //requette si email existe / oui = true / false = Message erreur a mettre dans var error soit compte existe pas ou deja cree
      if (reponse.exists) {
        router.push("/register/2");
        dispatch(updateEmail(email));
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(
          reponse.message ?? "L'adresse mail fournie ne peut pas être inscrite"
        );
        setShowError(true);
      }
    }
  };

  /* Style */
  const styles = StyleSheet.create({
    text: {
      marginBottom: 15,
    },
    lottie: {
      height: 40,
      alignSelf: "center",
    },
  });

  /* Composant */
  return (
    <>
      <View>
        <Text style={[global.title, styles.text]}>Adresse email</Text>
        <Text style={[global.subtitle, styles.text]}>
          Vous allez recevoir un email avec un code valable 30 minutes.
        </Text>
        <InputEmailController
          setError={setError}
          setShowError={setShowError}
          setDisabled={setDisabled}
          setEmail={setEmail}
        />
        {showError && <Text style={global.error}>{error}</Text>}
        {isLoading && (
          <LottieView
            autoPlay
            loop
            style={styles.lottie}
            source={require("../../../assets/animations/Loading.json")}
          />
        )}
      </View>
      <ButtonNext
        disabled={disabled}
        setShowError={setShowError}
        onClick={onClick}
      />
    </>
  );
};

/* Interface InputEmail */
interface InputEmailControllerProps {
  setEmail: (arg0: string) => void;
  setDisabled: (arg0: boolean) => void;
  setShowError: (arg0: boolean) => void;
  setError: (arg0: string) => void;
}

const InputEmailController: React.FC<InputEmailControllerProps> = ({
  setEmail,
  setDisabled,
  setShowError,
  setError,
}) => {
  const REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [value, setValue] = useState<string>("");

  //A chaque changement, il vérifie si la valeur est un email valide, si oui autorise d'aller vers l'autre page
  useEffect(() => {
    if (REGEX.test(value)) {
      setEmail(value);
      setDisabled(false);
      setShowError(false);
    } else {
      setDisabled(true);
      setError("L'adresse mail est invalide");
    }
  }, [value]);

  return <InputEmail value={value} onChangeText={setValue} />;
};

/* Interface Button pour aller a la page suivante */
interface ButtonNextProps {
  disabled: boolean;
  setShowError: (arg0: boolean) => void;
  onClick: () => void;
}

const ButtonNext: React.FC<ButtonNextProps> = memo(
  ({ disabled, setShowError, onClick }) => (
    <Navigate disabled={disabled} onClick={onClick} setShowError={setShowError}>
      Continuer
    </Navigate>
  )
);

export default RegisterOneController;
