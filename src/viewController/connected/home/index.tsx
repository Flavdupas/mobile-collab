import { useEffect, useState } from "react";
import IndexViewModel from "../../../viewModel/connected/home/Index";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";

const IndexController = () => {
  /* VARIABLES */
  const viewModel = new IndexViewModel();
  const [data, setData] = useState<
    | {
        id_theme: number;
        libelle_theme: string;
        path_logo: string;
        color_hex: string;
        created_at: Date;
        updated_at: Date | null;
      }[]
    | null
  >(null);
  /* LOGIQUE */
  useEffect(() => {
    const test = async () => {
      const data = await viewModel.getThemes();
      if (data) {
        setData([
          {
            id_theme: -1,
            libelle_theme: "Tout",
            path_logo: "",
            color_hex: "",
            created_at: new Date(),
            updated_at: null,
          },
          ...data,
        ]);
      }
    };
    test();
  }, []);
  return (
    <>
      <View>
        <Themes data={data} />
      </View>
    </>
  );
};

interface ThemesProps {
  data:
    | {
        id_theme: number;
        libelle_theme: string;
        path_logo: string;
        color_hex: string;
        created_at: Date;
        updated_at: Date | null;
      }[]
    | null;
}
const Themes: React.FC<ThemesProps> = ({ data }) => {
  /* VARIABLES */

  /* STYLES */
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      paddingHorizontal: 0,
    },
    title: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
      paddingVertical: 4,
      opacity: 0.6,
    },
  });

  return (
    <>
      {data && (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.container}>
              <Text style={styles.title}>{item.libelle_theme}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      {!data && <Skeleton height={20} width={"100%"} />}
    </>
  );
};

export default IndexController;
