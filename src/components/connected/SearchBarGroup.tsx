import { StyleSheet, TextInput, View } from "react-native";
import { SOFT_PURPLE, SUPER_LIGHT_PURPLE } from "../../constants/Color";
import Search from "../icons/Search";

interface SearchbarProps {
  onChange: (arg0: string) => void;
}

const SearchBarGroup: React.FC<SearchbarProps> = ({ onChange }) => {
  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      backgroundColor: SOFT_PURPLE,
      height: 40,
      borderRadius: 50,
      paddingRight: 20,
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      marginTop:15,
    },
    textInput: {
      flex: 1,
      height: "100%",
      paddingLeft: 20,
      fontSize: 14,
      color: SUPER_LIGHT_PURPLE,
    },
  });

  return (
    <View style={styles.body}>
      <TextInput
        onChangeText={onChange}
        placeholder="Rechercher un contact ..."
        placeholderTextColor={SUPER_LIGHT_PURPLE}
        style={styles.textInput}
      />
      <Search />
    </View>
  );
};

export default SearchBarGroup;
