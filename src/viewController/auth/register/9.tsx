import { memo } from "react";
import Navigate from "../../../components/auth/Navigate";

const RegisterNineController = () => {
  return <ButtonNext />;
};

const ButtonNext: React.FC<ButtonNextProps> = memo(() => (
  <Navigate disabled={false} href="/">
    Continuer
  </Navigate>
));

export default RegisterNineController;
