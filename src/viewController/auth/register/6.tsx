import { memo, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
} from "react-native";
import Navigate from "../../../components/auth/Navigate";
import global from "../../../constants/Global";
import themeData from "../../../data/auth/themeData";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { updateThemes } from "../../../store/register/register";
import Item from "../../../components/auth/register/Item";
import RegisterViewModel from "../../../viewModel/auth/Register";

const RegisterSixController = () => {
  /* Variables */
  const [disabled, setDisabled] = useState<boolean>(true);
  const [listId, setListId] = useState<number[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const viewModel = new RegisterViewModel();
  const [themes, setThemes] = useState<{ id: number; title: string }[]>([
    { id: 0, title: "" },
  ]);
  console.log(themes);
  useEffect(() => {
    const fetchData = async () => {
      const data = await viewModel.getThemes();
      if (data) {
        const transformedData = data.map((theme) => ({
          id: theme.id_theme,
          title: theme.libelle_theme,
        }));
        setThemes(transformedData);
      }
    };
    fetchData();
  }, []);

  /* Style */
  const styles = StyleSheet.create({
    containerItem: {
      paddingTop: 20,
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: Platform.OS === "android" ? 10 : 15,
      columnGap: 20,
    },
  });

  /* Logique */
  const handleClick = (item: { id: number; title: string }) => {
    if (listId.includes(item.id)) {
      const updatedIdItemChosen = [...listId];
      const indexToRemove = updatedIdItemChosen.indexOf(item.id);
      updatedIdItemChosen.splice(indexToRemove, 1);
      setListId(updatedIdItemChosen);
    } else {
      if (listId.length < 3) {
        setListId([...listId, item.id]);
      }
    }
  };

  const onClick = () => {
    if (listId.length === 3) {
      router.push("/register/7");
      dispatch(updateThemes(listId));
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (listId.length === 3) {
      setDisabled(false);
      setShowError(false);
    } else {
      setDisabled(true);
    }
  }, [listId]);

  return (
    <>
      <View>
        <Text style={global.title}>Passions</Text>
        <Text style={global.subtitle}>
          Choisissez 3 thèmes qui vous correspondent, en les ajoutant à votre
          profil
        </Text>
        <View style={styles.containerItem}>
          <ItemController
            data={themes}
            currentList={listId}
            handleClick={handleClick}
          />
        </View>
        {showError && (
          <Text style={global.error}>Vous devez choisir 3 thèmes</Text>
        )}
      </View>
      <ButtonNext
        setShowError={setShowError}
        onClick={onClick}
        disabled={disabled}
      />
    </>
  );
};

interface ItemControllerProps {
  data: { id: number; title: string }[];
  currentList: number[];
  handleClick: (arg0: { id: number; title: string }) => void;
}

const ItemController: React.FC<ItemControllerProps> = ({
  data,
  currentList,
  handleClick,
}) => {
  return (
    <>
      {data.map((item) => {
        return (
          <Item
            key={item.id}
            handleClick={handleClick}
            item={item}
            currentList={currentList}
          />
        );
      })}
    </>
  );
};

/* Interface Button pour aller a la page suivante */
interface ButtonNextProps {
  disabled: boolean;
  onClick: () => void;
  setShowError: (arg0: boolean) => void;
}

const ButtonNext: React.FC<ButtonNextProps> = memo(
  ({ disabled, onClick, setShowError }) => (
    <Navigate disabled={disabled} onClick={onClick} setShowError={setShowError}>
      Continuer
    </Navigate>
  )
);

export default RegisterSixController;
