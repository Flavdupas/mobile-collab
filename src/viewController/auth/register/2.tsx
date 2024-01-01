import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import global from "../../../constants/Global";
import InputCode from "../../../components/auth/input/Code";
import { router } from "expo-router";
import resetHistory from "../../../utils/router";

const RegisterTwoController = () => {
  /* Variables */
  const PWD = 5648; //requete pour recuperer le PWD;
  const [code, setCode] = useState<number | null>(null);
  const [error, setError] = useState<string | null>();
  const [showError, setShowError] = useState<boolean>(false);

  /* Logique */
  useEffect(() => {
    if (code !== null) {
      if (code === PWD) {
        //efface l'historique de navigation
        resetHistory().then(() => {
          //j'ajoute la route '/' a l'historique pour que le user puisse go back sans revenir au screen du code
          router.push("/");
          router.push("/register/3");
        });
        //requete pour valider le compte en async
      } else {
        setError("Code incorrect");
        setShowError(true);
      }
    }
  }, [code]);

  /* Style */
  const styles = StyleSheet.create({
    text: {
      marginBottom: 15,
      textAlign: "center",
    },
  });

  return (
    <>
      <View>
        <Text style={[global.title, styles.text]}>
          Nous vous avons envoyé un code
        </Text>
        <Text style={[global.subtitle, styles.text]}>
          Vous avez reçu un code valable 30 minutes pour vérifier votre email.
          N'oubliez pas de regarder dans votre boite email d'indésirables ou de
          spam.
        </Text>
        <InputCodeController setShowError={setShowError} setCode={setCode} />
        {showError && <Text style={global.error}>{error}</Text>}
      </View>
    </>
  );
};

interface InputCodeControllerProps {
  setCode: (arg0: number) => void;
  setShowError:(arg0:boolean) => void;
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

export default RegisterTwoController;
