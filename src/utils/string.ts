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

export const isValidDate = (year:number, month:number, day:number) => {
    const proposedDate = new Date(year, month, day);
    return (
        proposedDate.getFullYear() === year &&
        proposedDate.getMonth() === month &&
        proposedDate.getDate() === day
    );
}

export const croppedText = (text: string, length:number): string => {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + '...';
  }
};

export function getFirstLetter(inputString: string): string {
    if (inputString.length > 0) {
        return inputString.charAt(0);
    } else {
        return ''; 
    }
}

export function isValidEmail(email:string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function isValidPhoneNumber(phoneNumber:string) {
    const regex = /^(0|\+33)[1-9]\d{8}$/;
    return regex.test(phoneNumber);
}