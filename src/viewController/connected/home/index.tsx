import { useEffect, useState } from "react";
import IndexViewModel from "../../../viewModel/connected/home/Index";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Chevron from "../../../components/icons/Chevron";
import { router } from "expo-router";
import RecentService from "../../../components/connected/data/service/RecentService";
import ServiceRecommended from "../../../components/connected/data/service/RecommendedService";
import RecentPost from "../../../components/connected/data/post/RecentPost";

const IndexController = () => {
  /* VARIABLES */
  const viewModel = new IndexViewModel();
  const token = useSelector((state: RootState) => state.login.token);
  const [serviceRecommended, setServiceRecommened] = useState<
    ServiceInterface[] | null
  >(null);
  const [recentPosts, setRecentPosts] = useState<PostInterface[] | null>(null);
  const [themes, setThemes] = useState<ThemeInterface[] | null>(null);
  const [recentServices, setRecentServices] = useState<
    ServiceInterface[] | null
  >(null);

  /* STYLES */
  const styles = StyleSheet.create({
    containerTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      marginVertical: 10,
    },
    round: {
      backgroundColor: "#893E76",
      height: 25,
      width: 25,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 24,
      color: "#fff",
      fontWeight: "bold",
    },
  });

  /* LOGIQUE */
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const themes = await viewModel.getThemes();
        if (themes) {
          setThemes([
            {
              id_theme: -1,
              libelle_theme: "Tout",
              path_logo: "",
              color_hex: "",
              created_at: new Date(),
              updated_at: null,
            },
            ...themes,
          ]);
        }
        const recentServicesData = await viewModel.getRecentService(token);
        if (recentServicesData) {
          setRecentServices(recentServicesData);
        }

        const serviceRecommended = await viewModel.serviceRecommended(token);
        if (serviceRecommended) {
          setServiceRecommened(serviceRecommended);
        }

        const recentPosts = await viewModel.getRecentPost(token);
        if (recentPosts) {
          setRecentPosts(recentPosts);
        }
      }
    };
    fetchData();
  }, [token]);
  return (
    <>
      <View>
        <Themes data={themes} />
        <RecentService data={recentServices} token={token ?? ""} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Pour vous</Text>
          <TouchableOpacity
            onPress={() => router.push("/home/")}
            style={styles.round}
          >
            <Chevron />
          </TouchableOpacity>
        </View>
        <ServiceRecommended data={serviceRecommended} token={token ?? ""} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Derniers posts</Text>
          <TouchableOpacity
            onPress={() => router.push("/home/")}
            style={styles.round}
          >
            <Chevron />
          </TouchableOpacity>
        </View>
        <RecentPost recentPosts={recentPosts} token={token ?? ""} />
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
      {!data && (
        <View style={styles.container}>
          <Skeleton height={20} width={"100%"} />
        </View>
      )}
    </>
  );
};

export default IndexController;
