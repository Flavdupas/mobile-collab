import { View, Text } from "react-native";
import global from "../../../constants/Global";
import InputPhone from "../../../components/auth/input/Phone";
import { memo, useEffect, useState } from "react";
import Navigate from "../../../components/auth/Navigate";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { updatePhone } from "../../../store/register/register";

const RegisterFourController = () => {
  const [phone, setPhone] = useState<string | null>(null);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onClick = () => {
    if (phone) {
      router.push("/(auth)/register/5");
      dispatch(updatePhone(Number(phone)));
    }
  };

  return (
    <>
      <View>
        <Text style={global.title}>Numéro de téléphone</Text>
        <InputPhoneController setDisabled={setDisabled} setShowError={setShowError} setPhone={setPhone} />
        {showError && (
          <Text style={global.error}>
            Numéro de téléphone portable invalide
          </Text>
        )}
      </View>
      <ButtonNext
        disabled={disabled}
        onClick={onClick}
        setShowError={setShowError}
      />
    </>
  );
};

interface InputBirthdayControllerProps {
  setPhone: (arg0: string) => void;
  setShowError: (arg0: boolean) => void;
  setDisabled: (arg0: boolean) => void;
}

const InputPhoneController: React.FC<InputBirthdayControllerProps> = ({
  setPhone,
  setShowError,
  setDisabled,
}) => {
  const [value, setValue] = useState<string | null>(null);
  const REGEX = /^(0[679])(\d{8})$/;
  useEffect(() => {
    if (value) {
      if (REGEX.test(value)) {
        setPhone(value);
        setShowError(false);
        setDisabled(false);
      } else {
        setShowError(true);
        setDisabled(true);
      }
    }
  }, [value]);
  return <InputPhone value={value} setValue={setValue} />;
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

export default RegisterFourController;
