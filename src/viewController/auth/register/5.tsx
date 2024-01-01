import { View, Image, Text, Platform, StyleSheet } from "react-native";
import Round from "../../../components/auth/Round";
import Toggle from "react-native-toggle-element/lib/toggle";
import { memo, useState } from "react";
import Navigate from "../../../components/auth/Navigate";
import global from "../../../constants/Global";
import { LIGHT_PURPLE } from "../../../constants/Color";
import { useDispatch } from "react-redux";
import { router } from "expo-router";
import { updateMeet } from "../../../store/register/register";

const RegisterFiveController = () => {
  /* Variables */
  const [meet, setMeet] = useState<boolean | undefined>(true);
  const dispatch = useDispatch();

  /* Style */
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    imageContainer: {
      alignItems: "center",
      paddingVertical: 20,
    },
    image: {
      height: Platform.OS === "android" ? 250 : 300,
      resizeMode: "contain",
    },
    title: {
      marginVertical: 10,
    },
  });

  /* Logique */
  const onClick = () => {
    if (typeof meet === "boolean") {
      router.push("/register/6");
      dispatch(updateMeet(meet));
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/auth/slide-3.png")}
            style={styles.image}
          />
          <Round size={16} color="#FAAEAE" bottom={30} right={0} />
          <Round size={10} color="#FCE2D4" bottom={0} left={30} />
          <Round size={16} color="#D4FCF5" top={0} left={90} />
        </View>
        <Text style={[global.title, styles.title]}>Nouvelle rencontre</Text>
        <Text style={global.subtitle}>
          Souhaitez-vous faire de nouvelles rencontres grâce au système de match
          de notre application ?
        </Text>
        <ToogleController meet={meet} setMeet={setMeet} />
      </View>
      <ButtonNext disabled={false} onClick={onClick} />
    </>
  );
};

interface ToogleControllerProps {
  meet: boolean | undefined;
  setMeet: (arg0: boolean | undefined) => void;
}

const ToogleController: React.FC<ToogleControllerProps> = ({
  meet,
  setMeet,
}) => {
  const styles = StyleSheet.create({
    toogle: {
      backgroundColor: LIGHT_PURPLE,
      marginTop: 15,
    },
  });

  return (
    <Toggle
      value={!meet}
      onPress={(value) => setMeet(!value)}
      trackBar={{
        width: 200,
        height: 35,
      }}
      trackBarStyle={styles.toogle}
      thumbStyle={{
        height: 35,
      }}
      thumbButton={{
        inActiveBackgroundColor: "#D3EFC6",
        activeBackgroundColor: "#FAAEAE",
      }}
    />
  );
};

/* Interface Button pour aller a la page suivante */
interface ButtonNextProps {
  disabled: boolean;
  onClick: () => void;
}

const ButtonNext: React.FC<ButtonNextProps> = memo(({ disabled, onClick }) => (
  <Navigate disabled={disabled} onClick={onClick}>
    Continuer
  </Navigate>
));

export default RegisterFiveController;
