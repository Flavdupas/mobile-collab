import { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigate from "../../../components/auth/Navigate";
import global from "../../../constants/Global";
import InputPassword from "../../../components/auth/input/Password";
import { isCommom, validePassword } from "../../../utils/string";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import resetHistory from "../../../utils/router";
import Logo from "../../../components/icons/Logo";
import ForgotViewModel from "../../../viewModel/auth/Forgot";
import { RootState } from "../../../store/store";
import LottieView from "lottie-react-native";

const ForgotPasswordThreeController = () => {
  /* Variables */
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const viewModel = new ForgotViewModel();
  const token = useSelector((state: RootState) => state.forgot.token);
  /* Logique */
  const onClick = async () => {
    if (password && token) {
      setIsLoading(true);
      const response = await viewModel.resetPassword(token, password);
      if (response.changed) {
        setIsLoading(false);
        resetHistory().then(() => {
          router.replace("/forgot/4");
        });
      } else {
        setIsLoading(false);
        if (response.message) {
          setError(response.message);
        }
        setShowError(true);
      }
    }
  };

  const styles = StyleSheet.create({
    lottie: {
      height: 40,
      alignSelf: "center",
    },
  });

  return (
    <>
      <View style={global.container}>
        <Logo style={global.logo} />
        <Text style={global.title}>Mot de passe oublié</Text>
        <InputPasswordController
          setPassword={setPassword}
          setError={setError}
          setShowError={setShowError}
          setDisabled={setDisabled}
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
        setError={setError}
      />
    </>
  );
};

interface InputPasswordControllerProps {
  setPassword: (arg0: string) => void;
  setShowError: (arg0: boolean) => void;
  setError: (arg0: string) => void;
  setDisabled: (arg0: boolean) => void;
}

const InputPasswordController: React.FC<InputPasswordControllerProps> = ({
  setPassword,
  setError,
  setShowError,
  setDisabled,
}) => {
  const [passwordOne, setPasswordOne] = useState<string | null>(null);
  const [passwordTwo, setPasswordTwo] = useState<string | null>(null);

  const styles = StyleSheet.create({
    inputPassword: {
      marginBottom: 20,
    },
    containerInput: {
      width: "100%",
    },
  });

  useEffect(() => {
    if (passwordOne) {
      if (validePassword(passwordOne)) {
        if (passwordOne === passwordTwo) {
          if (isCommom(passwordOne)) {
            setError("Le mot de passe est trop générique");
            setShowError(true);
            setDisabled(true);
          } else {
            setPassword(passwordTwo);
            setShowError(false);
            setDisabled(false);
          }
        } else {
          setError("Les mots de passe fournis sont différents");
          setShowError(true);
          setDisabled(true);
        }
      } else {
        setError(
          "Le mot de passe doit contenir : 1 majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial et faire au moins 8 caractères."
        );
        setShowError(true);
        setDisabled(true);
      }
    }
  }, [passwordOne, passwordTwo]);

  return (
    <View style={styles.containerInput}>
      <InputPassword
        placeholder="Nouveau mot de passe"
        style={styles.inputPassword}
        value={passwordOne}
        setValue={setPasswordOne}
      />
      <InputPassword
        placeholder="Confirmation mot de passe"
        value={passwordTwo}
        setValue={setPasswordTwo}
      />
    </View>
  );
};

/* Interface Button pour aller a la page suivante */
interface ButtonNextProps {
  disabled: boolean;
  onClick: () => void;
  setShowError: (arg0: boolean) => void;
  setError: (arg0: string) => void;
}

const ButtonNext: React.FC<ButtonNextProps> = memo(
  ({ disabled, onClick, setShowError, setError }) => (
    <Navigate
      disabled={disabled}
      onClick={onClick}
      setShowError={setShowError}
      defaultError="Vous devez fournir un mot de passe"
      setError={setError}
    >
      Continuer
    </Navigate>
  )
);

export default ForgotPasswordThreeController;
