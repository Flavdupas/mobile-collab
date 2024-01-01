import { Route, router } from "expo-router";
import { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface NavigateProps {
  disabled: boolean;
  href?: Route<"">;
  children?: ReactNode;
  setShowError?: (arg0: boolean) => void;
  onClick?: () => void;
  defaultError?:string;
  setError?: (arg0:string) => void;
}

const Navigate: React.FC<NavigateProps> = ({
  disabled,
  href,
  children,
  setShowError,
  onClick,
  defaultError,
  setError,
}) => {
  /* LOGIQUE */
  const onPress = async () => {
    if (!disabled) {
      if (href) {
        router.push(href);
      } else if (onClick) {
        onClick();
      }
    } else {
      if (setShowError) {
        if(defaultError && setError) {
          setError(defaultError);
        }
        setShowError(true);
      }
    }
  };

  /* STYLE */
  const styles = StyleSheet.create({
    body: {
      height: 40,
      width: 300,
      backgroundColor: !disabled ? "#fff" : "#E3DFDF",
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      shadowColor: !disabled ? "#C3C3C3" : "#9B9999",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 0,
      elevation: 8,
    },
    text: {
      fontSize: 20,
      color: !disabled ? "#000" : "#4D4D4D",
      fontWeight: "bold",
    },
  });

  /* COMPOSANT */
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.body}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Navigate;
