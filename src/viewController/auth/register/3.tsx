import { memo, useEffect, useState } from "react";
import Navigate from "../../../components/auth/Navigate";
import { View, Text, StyleSheet } from "react-native";
import InputBirthday from "../../../components/auth/input/Birthday";
import BottomSheetDate from "../../../components/auth/input/BottomSheetDate";
import { router } from "expo-router";
import global from "../../../constants/Global";
import { useDispatch } from "react-redux";
import { updateBirthday } from "../../../store/register/register";

const RegisterThreeController = () => {
  /* Variables */
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const today = new Date();
  const dispatch = useDispatch();

  /* Logique */

  //regarde pour chaque date si elle est valide / oui => on l'enregistre / non => on affiche l'erreur
  useEffect(() => {
    if (birthday) {
      let differenceYear = today.getFullYear() - birthday.getFullYear();
      //La date est valide
      if (differenceYear >= 16) {
        //on enregistre dans le store
        setShowError(false);
        setDisabled(false);
      } else {
          setDisabled(true);
          setShowError(true);   
      }
    }
  }, [birthday]);

  const onClick = () => {
    if(birthday) {
        router.push("/(auth)/register/4");
        dispatch(updateBirthday(birthday.getTime()))
    } 
  }

  return (
    <>
      <View style={global.body}>
        <View>
          <Text style={global.title}>Date de naissance</Text>
          <InputBirthdayController
            birthday={birthday}
            setDate={setBirthday}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
          />
          {showError && (
            <Text style={global.error}>Date de naissance invalide</Text>
          )}
        </View>
        <ButtonNext onClick={onClick} setShowError={setShowError} disabled={disabled} />
      </View>

      {showPicker && (
        <BottomSheetDateController
          date={birthday}
          setDate={setBirthday}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
        />
      )}
    </>
  );
};

interface InputBirthdayControllerProps {
  birthday: Date | null;
  showPicker: boolean;
  setShowPicker: (arg0: boolean) => void;
  setDate: (arg0: Date) => void;
}

const InputBirthdayController: React.FC<InputBirthdayControllerProps> = ({
  birthday,
  setDate,
  showPicker,
  setShowPicker,
}) => {

  /* Style */
  const styles = StyleSheet.create({
    input: {
      marginVertical: 10,
    },
  });

  return (
    <InputBirthday
      date={birthday}
      setDate={setDate}
      showPicker={showPicker}
      setShowPicker={setShowPicker}
      style={styles.input}
    />
  );
};

interface BottomSheetDateControllerProps {
  showPicker: boolean;
  setShowPicker: (arg0: boolean) => void;
  date: Date | null;
  setDate: (arg0: Date) => void;
}

const BottomSheetDateController: React.FC<BottomSheetDateControllerProps> = ({
  date,
  setDate,
  showPicker,
  setShowPicker,
}) => {
  return (
    <BottomSheetDate
      date={date}
      setDate={setDate}
      showPicker={showPicker}
      setShowPicker={setShowPicker}
    />
  );
};

/* Interface Button pour aller a la page suivante */
interface ButtonNextProps {
  disabled: boolean;
  setShowError: (arg0: boolean) => void;
  onClick: () => void;
}


const ButtonNext: React.FC<ButtonNextProps> = memo(({ disabled, setShowError, onClick }) => (
  <Navigate disabled={disabled} onClick={onClick} setShowError={setShowError}>
    Continuer
  </Navigate>
));

export default RegisterThreeController;
