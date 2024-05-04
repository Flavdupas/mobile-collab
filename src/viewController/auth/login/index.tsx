import { memo, useEffect, useState } from "react";
import Navigate from "../../../components/auth/Navigate";
import { View, Text, StyleSheet } from "react-native";
import Logo from "../../../components/icons/Logo";
import InputEmail from "../../../components/auth/input/Email";
import InputPassword from "../../../components/auth/input/Password";
import { Link, router } from "expo-router";
import global from "../../../constants/Global";
import resetHistory from "../../../utils/router";
import LoginViewModel from "../../../viewModel/auth/Login";
import LottieView from "lottie-react-native";
import { useDispatch } from "react-redux";
import { updateToken } from "../../../store/login/login";
import { updateEtudiant, updateNotifications, updateUtilisateur } from "../../../store/connected/connected";
import ConnectedViewModel from "../../../viewModel/connected/Connected";

const IndexController = () => {
  /* Variables */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const viewModel = new LoginViewModel();
  const connectedViewModel = new ConnectedViewModel();
  const dispatch = useDispatch();

  /* Style */
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      gap: 15,
    },
    txtLogin: {
      color: "white",
      fontWeight: "bold",
      marginTop: 5,
    },
    lottie: {
      height: 40,
      alignSelf: "center",
    },
  });

  useEffect(() => {
    const REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (email !== "") {
      if (REGEX.test(email)) {
        setShowError(false);
        if (password !== "") {
          setDisabled(false);
        } else {
          setDisabled(true);
          setError("Mot de passe invalide");
          setShowError(true);
        }
      } else {
        setError("Adresse email invalide");
        setShowError(true);
        setDisabled(true);
      }
    }
  }, [email, password]);

  /* Logique */
  const onClick = async () => {
    if (email && password) {
      setDisabled(true);
      setIsloading(true);
      const response = await viewModel.login(email, password); //requette bdd pour se connecter / true => on recupere le token pour le stocker dans le localstorage / false => on affiche une erreur
      if (response.login) {
        setIsloading(false);
        resetHistory();
        router.replace("/home/");
        if(response.token) {
          console.log(response.token);
          dispatch(updateToken(response.token));
          for (let attempt = 0; attempt <= 100; attempt++) {
            const data = await connectedViewModel.getUser(response.token);
            if (data) {
              dispatch(updateUtilisateur(data.utilisateur));
              dispatch(updateEtudiant(data.etudiant));
              dispatch(updateNotifications(data.notifications));
              break;
            }
            console.log("Nouvelle tentative de chargement ...")
          }
        }
      } else {
        setIsloading(false);
        if (response.message) {
          setError(response.message);
        }
        setShowError(true);
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Logo style={global.logo} />
        <Text style={global.title}>Connexion</Text>
        <InputEmailController email={email} setEmail={setEmail} />
        <InputPasswordController
          password={password}
          setPassword={setPassword}
        />
        <Text style={styles.txtLogin}>
          Mot de passe oublié ? <Link href={"/forgot/1"}>cliquer ici</Link>
        </Text>
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
        onClick={onClick}
        setError={setError}
        setShowError={setShowError}
      />
    </>
  );
};

/* Interface InputPassword */
interface InputPasswordControllerProps {
  setPassword: (arg0: string) => void;
  password: string;
}
const InputPasswordController: React.FC<InputPasswordControllerProps> = ({
  setPassword,
  password,
}) => {
  return (
    <InputPassword
      value={password}
      setValue={setPassword}
      placeholder="Votre mot de passe"
    />
  );
};

/* Interface InputEmail */
interface InputEmailControllerProps {
  setEmail: (arg0: string) => void;
  email: string;
}
const InputEmailController: React.FC<InputEmailControllerProps> = ({
  setEmail,
  email,
}) => {
  return <InputEmail value={email} onChangeText={setEmail} />;
};

interface ButtonNextProps {
  onClick: () => void;
  disabled: boolean;
  setShowError: (arg0: boolean) => void;
  setError: (arg0: string) => void;
}
const ButtonNext: React.FC<ButtonNextProps> = memo(
  ({ onClick, disabled, setShowError, setError }) => (
    <Navigate
      disabled={disabled}
      onClick={onClick}
      setShowError={setShowError}
      defaultError="Vous devez insérer vos identifiants"
      setError={setError}
    >
      Se connecter
    </Navigate>
  )
);

export default IndexController;
