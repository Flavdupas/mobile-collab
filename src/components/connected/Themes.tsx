import { Skeleton } from "moti/skeleton";
import { useState } from "react";
import { FlatList, TouchableOpacity, View, StyleSheet, Text } from "react-native";

interface ThemesProps {
  data:ThemeInterface[] | null;
  onClick: (arg0:number) => void;
}
const Themes: React.FC<ThemesProps> = ({ data, onClick }) => {
  /* VARIABLES */
    const [idActive, setIdActive] = useState<number>(-1);
  /* STYLES */
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      paddingHorizontal: 0,
      transform: [{ translateX: 20 }],
      marginVertical: 10,
    },
    title: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      paddingVertical: 4,
      opacity: 0.6,
    },
  });
  /* LOGIQUE */
  const handleClick = (id:number) => {
    onClick(id);
    setIdActive(id);
  }

  return (
    <>
      {data && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.container} onPress={() => handleClick(item.id_theme)}>
              <Text style={[styles.title, idActive === item.id_theme ? {opacity:1} : null]}>{item.libelle_theme}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {!data && (
        <View style={styles.container}>
          <Skeleton height={20} width={"100%"} />
        </View>
      )}
    </>
  );
};

export default Themes;