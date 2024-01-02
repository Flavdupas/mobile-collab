import { memo, useEffect, useState } from "react";
import Navigate from "../../../components/auth/Navigate";
import { View, Text, StyleSheet } from "react-native";
import Logo from "../../../components/icons/Logo";
import InputEmail from "../../../components/auth/input/Email";
import InputPassword from "../../../components/auth/input/Password";
import { Link, router } from "expo-router";
import global from "../../../constants/Global";
import resetHistory from "../../../utils/router";

const IndexController = () => {
  /* Variables */
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  /* Style */
  const styles = StyleSheet.create({
    container: {
        alignItems:"center",
        gap:15
    },
    image: {
      width: 73.04,
      height: 80,
    },
    txtLogin: {
      color: "white",
      fontWeight: "bold",
      marginTop: 5,
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
  const onClick = () => {
    const correctCredential = true; //requette bdd pour se connecter / true => on recupere le token pour le stocker dans le localstorage / false => on affiche une erreur
    if(correctCredential) {
        resetHistory();
        router.replace("/home");
    } else {
        setError("Indentifiants incorrect");
        setShowError(true);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Logo style={styles.image} />
        <Text style={global.title}>Connexion</Text>
        <InputEmailController email={email} setEmail={setEmail} />
        <InputPasswordController
          password={password}
          setPassword={setPassword}
        />
        <Text style={styles.txtLogin}>
          Mot de passe oublié ? <Link href={"/"}>cliquer ici</Link>
        </Text>
        {showError && <Text style={global.error}>{error}</Text>}
      </View>
      <ButtonNext disabled={disabled} onClick={onClick} />
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
}
const ButtonNext: React.FC<ButtonNextProps> = memo(({ onClick, disabled }) => (
  <Navigate disabled={disabled} onClick={onClick}>
    Continuer
  </Navigate>
));

export default IndexController;
