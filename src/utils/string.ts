import { forbiddenWords } from "../data/auth/forbiden";


export const validePassword = (password: string) => {
  const regex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
  if (regex.test(password)) {
    return true; // Mot de passe valide
  } else {
    return false; // Mot de passe invalide
  }
};

export const isCommom = (password: string) => {

  const lowercasePassword = password.toLowerCase();

  for (const word of forbiddenWords) {
    if (lowercasePassword.includes(word)) {
      return true;
    }
  }

  return false;
};
