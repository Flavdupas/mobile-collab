import { View, Text, StyleSheet } from "react-native";
import Navigate from "../../../components/auth/Navigate";
import { memo, useEffect, useState } from "react";
import InputEmail from "../../../components/auth/input/Email";
import { useDispatch } from "react-redux";
import global from "../../../constants/Global";
import { router } from "expo-router";
import Logo from "../../../components/icons/Logo";
import { updateEmail } from "../../../store/forgot/forgot";
import ForgotViewModel from "../../../viewModel/auth/Forgot";
import LottieView from "lottie-react-native";

const ForgotPasswordOneController = () => {
  /* Variables */
  const [disabled, setDisabled] = useState<boolean>(true);
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const viewModel = new ForgotViewModel();

  const onClick = async () => {
    if (email) {
      setIsLoading(true);
      setDisabled(true);
      const reponse = await viewModel.emailExists(email); //requette si email existe / oui = true / false = Message erreur a mettre dans var error soit compte existe pas ou deja cree
      if (reponse.exists) {
        router.push("/forgot/2");
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
      <View style={global.container}>
        <Logo style={global.logo} />
        <Text style={[global.title, styles.text]}>Mot de passe oublié</Text>
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

export default ForgotPasswordOneController;
