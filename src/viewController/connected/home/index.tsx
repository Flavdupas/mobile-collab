import { useContext, useEffect, useState } from "react";
import IndexViewModel from "../../../viewModel/connected/home/Index";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import Chevron from "../../../components/icons/Chevron";
import { Route, router } from "expo-router";
import RecentService from "../../../components/connected/data/service/RecentService";
import ServiceRecommended from "../../../components/connected/data/service/RecommendedService";
import RecentPost from "../../../components/connected/data/post/RecentPost";
import ConnectedContext from "../../../components/connected/context/RouteContext";
import Themes from "../../../components/connected/Themes";
import { updateThemes } from "../../../store/connected/connected";

const IndexController = () => {
  /* VARIABLES */
  const context = useContext(ConnectedContext);
  const viewModel = new IndexViewModel();
  const dispatch = useDispatch();
  const [idTheme, setIdTheme] = useState<number | null>(null);
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

  const handleClick = async (href: Route<"">, index: number) => {
    if (context) {
      router.push(href);
      context.setCurrentIndexTabBar(index);
    }
  };

  return (
    <>
      <View>
        <Text style={[styles.title,{marginLeft:20,marginVertical:10}]}>Nouveautés</Text>
        <RecentService data={recentServices} token={token ?? ""} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Pour vous</Text>
          <TouchableOpacity
            onPress={() => handleClick("/home/service", 2)}
            style={styles.round}
          >
            <Chevron />
          </TouchableOpacity>
        </View>
        <ServiceRecommended data={serviceRecommended} token={token ?? ""} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Derniers posts</Text>
          <TouchableOpacity
            onPress={() => handleClick("/home/post", 3)}
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

export default IndexController;
