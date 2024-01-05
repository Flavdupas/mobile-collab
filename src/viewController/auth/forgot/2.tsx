import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import global from "../../../constants/Global";
import InputCode from "../../../components/auth/input/Code";
import { router } from "expo-router";
import resetHistory from "../../../utils/router";
import Logo from "../../../components/icons/Logo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import ForgotViewModel from "../../../viewModel/auth/Forgot";
import { updateToken } from "../../../store/forgot/forgot";
import LottieView from "lottie-react-native";

const ForgotTwoController = () => {
  /* Variables */
  const email = useSelector((state: RootState) => state.forgot.email);
  const [code, setCode] = useState<number | null>(null);
  const [error, setError] = useState<string | null>();
  const [showError, setShowError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const viewModel = new ForgotViewModel();
  const dispatch = useDispatch();

  /* Logique */
  useEffect(() => {
    const fetchData = async () => {
      //on regarde si le code est pas null et qu'on a bien recupere le mail du store
      if (code !== null && email) {
        setIsLoading(true);
        Keyboard.dismiss();
        const response = await viewModel.verifyCode(email, code);
        if (response.correct) {
          //efface l'historique de navigation
          resetHistory().then(() => {
            //j'ajoute la route '/' a l'historique pour que le user puisse go back sans revenir au screen du code
            router.push("/");
            router.push("/forgot/3");
            if (response.token) {
              console.log(response.token)
              dispatch(updateToken(response.token));
            }
            setIsLoading(false);
          });
        } else {
          setIsLoading(false);
          setError(response.message);
          setShowError(true);
        }
      }
    };
    fetchData();
  }, [code]);

  /* Style */
  const styles = StyleSheet.create({
    text: {
      marginBottom: 15,
      textAlign: "center",
    },
    lottie: {
      height: 40,
      alignSelf: "center",
    },
  });

  return (
    <>
      <View style={global.container}>
        <Logo style={global.logo} />
        <Text style={[global.title, styles.text]}>
          Mot de passe oublié
        </Text>
        <Text style={[global.subtitle, styles.text]}>
          Vous avez reçu un code valable 30 minutes pour vérifier votre email.
          N'oubliez pas de regarder dans votre boite email d'indésirables ou de
          spam.
        </Text>
        <InputCodeController setShowError={setShowError} setCode={setCode} />
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
    </>
  );
};

interface InputCodeControllerProps {
  setCode: (arg0: number) => void;
  setShowError: (arg0: boolean) => void;
}
const InputCodeController: React.FC<InputCodeControllerProps> = ({
  setCode,
  setShowError,
}) => {
  const [value, setValue] = useState<number[]>(Array(4).fill(-1));

  useEffect(() => {
    if (!value.includes(-1)) {
      setCode(parseInt(value.join(""), 10));
    } else {
      setShowError(false);
    }
  }, [value]);

  return <InputCode setCode={setValue} code={value} />;
};

export default ForgotTwoController;
