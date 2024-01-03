import { memo, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Navigate from "../../../components/auth/Navigate";
import global from "../../../constants/Global";
import InputPassword from "../../../components/auth/input/Password";
import { isCommom, validePassword } from "../../../utils/string";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../store/register/register";
import resetHistory from "../../../utils/router";
import RegisterViewModel from "../../../viewModel/auth/Register";
import { RootState } from "../../../store/store";

const RegisterHeightController = () => {
  /* Variables */
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const dispatch = useDispatch();
  //
  const viewModel = new RegisterViewModel();
  const token = useSelector((state: RootState) => state.register.token);
  const birthday = useSelector((state: RootState) => state.register.birthday);
  const phone = useSelector((state: RootState) => state.register.phone);
  const meet = useSelector((state: RootState) => state.register.meet);
  const themes = useSelector((state: RootState) => state.register.themes);
  const image = useSelector((state: RootState) => state.register.carteEtudiante);

  /* Style */
  const styles = StyleSheet.create({
    title: {
      marginBottom: 20,
    },
  });

  /* Logique */
  const onClick = () => {
    if ((token && birthday && phone && meet && themes && image && password)) {
      viewModel.register(token, birthday, phone, meet, themes, image, password);
    }
    /*if(password) {
      resetHistory();
      router.replace("/register/9");
      dispatch(updatePassword(password));
    }*/
  };

  return (
    <>
      <View>
        <Text style={[global.title, styles.title]}>Mot de passe</Text>
        <InputPasswordController
          setPassword={setPassword}
          setError={setError}
          setShowError={setShowError}
          setDisabled={setDisabled}
        />
        {showError && <Text style={global.error}>{error}</Text>}
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
    <>
      <InputPassword
        placeholder="Mot de passe"
        style={styles.inputPassword}
        value={passwordOne}
        setValue={setPasswordOne}
      />
      <InputPassword
        placeholder="Confirmation mot de passe"
        value={passwordTwo}
        setValue={setPasswordTwo}
      />
    </>
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

export default RegisterHeightController;
