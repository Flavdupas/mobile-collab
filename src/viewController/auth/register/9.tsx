import { memo } from "react";
import Navigate from "../../../components/auth/Navigate";
import resetHistory from "../../../utils/router";
import { router } from "expo-router";

const RegisterNineController = () => {
  const onClick = () => {
    resetHistory();
    router.replace("/home");
    //recuperer le token a stocker dans le localstorage
  }
  return <ButtonNext onClick={onClick} />;
};
interface ButtonNextProps {
  onClick: () => void;
}
const ButtonNext: React.FC<ButtonNextProps> = memo(({onClick}) => (
  <Navigate disabled={false} onClick={onClick}>
    Continuer
  </Navigate>
));

export default RegisterNineController;
