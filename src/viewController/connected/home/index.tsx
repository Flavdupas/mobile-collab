import { useEffect, useRef, useState } from "react";
import IndexViewModel from "../../../viewModel/connected/home/Index";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  LIGHT_PURPLE,
  MAIN_COLOR,
  SOFT_PURPLE,
  SUPER_SOFT_PURPLE,
} from "../../../constants/Color";
import { BlurView } from "expo-blur";
import { croppedText } from "../../../utils/string";
import Polygone from "../../../components/icons/Polygone";
import Chevron from "../../../components/icons/Chevron";
import { router } from "expo-router";
import Money from "../../../components/icons/Money";
import Circle from "../../../components/icons/Circle";
import Paginator from "../../../components/connected/Paginator";
import Verify from "../../../components/icons/Verify";
import Logo from "../../../components/icons/Logo";
const { width } = Dimensions.get("window");
const apiUrl = process.env.EXPO_PUBLIC_API_URL;

interface Service {
  created_at: Date;
  date_debut: Date | null;
  date_fin: Date | null;
  description: string;
  id_etudiant: number;
  id_service: number;
  id_statutservice: number;
  id_theme: number;
  id_typeservice: number;
  prix: number;
  titre: string;
  updated_at: Date | null;
  etudiant: {
    commentaire_refus: string | null;
    credit: number;
    date_demande: Date;
    date_naissance: Date;
    date_refus: Date | null;
    date_traitement: Date;
    date_validation: Date;
    id_admin_refuser: number | null;
    id_admin_valider: number;
    id_utilisateur: number;
    nom: string;
    path_carteetu: string;
    prenom: string;
    rencontre: boolean;
    telephone: string;
  };
  photos: {
    id_service: number;
    id_photo: number;
    path: string;
    created_at: Date | null;
    updated_at: Date | null;
  }[];
  theme: {
    color_hex: string;
    created_at: Date;
    id_theme: number;
    libelle_theme: string;
    path_logo: string;
    updated_at: Date | null;
  };
}

const IndexController = () => {
  /* VARIABLES */
  const viewModel = new IndexViewModel();
  const token = useSelector((state: RootState) => state.login.token);
  const [serviceRecommended, setServiceRecommened] = useState<Service[] | null>(
    null
  );
  const [themes, setThemes] = useState<
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
  const [recentServices, setRecentServices] = useState<
    | {
        id_service: number;
        id_statutservice: number;
        id_typeservice: number;
        id_etudiant: number;
        titre: string;
        description: string;
        date_debut: Date | null;
        date_fin: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        prix: number;
        theme: {
          id_theme: number;
          libelle_theme: string;
          path_logo: string;
          color_hex: string;
          created_at: Date;
          updated_at: Date | null;
        };
        photos: {
          id_service: number;
          id_photo: number;
          path: string;
          created_at: Date | null;
          updated_at: Date | null;
        }[];
      }[]
    | null
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
        console.log(recentServicesData);
        if (recentServicesData) {
          setRecentServices(recentServicesData);
        }

        const serviceRecommended = await viewModel.serviceRecommended(token);
        console.log(serviceRecommended);
        if (serviceRecommended) {
          setServiceRecommened(serviceRecommended);
        }
      }
    };
    fetchData();
  }, [token]);
  return (
    <>
      <View>
        <Themes data={themes} />
        <RecentServices data={recentServices} token={token ?? ""} />
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
        <RecentPost />
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

interface RecentServicesProps {
  data:
    | {
        id_service: number;
        id_statutservice: number;
        id_typeservice: number;
        id_etudiant: number;
        titre: string;
        description: string;
        date_debut: Date | null;
        date_fin: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
        prix: number;
        theme: {
          id_theme: number;
          libelle_theme: string;
          path_logo: string;
          color_hex: string;
          created_at: Date;
          updated_at: Date | null;
        };
        photos: {
          id_service: number;
          id_photo: number;
          path: string;
          created_at: Date | null;
          updated_at: Date | null;
        }[];
      }[]
    | null;
  token: string;
}

const RecentServices: React.FC<RecentServicesProps> = ({ data, token }) => {
  /* STYLES */
  const styles = StyleSheet.create({
    containerItems: {
      flexDirection: "row",
      width: "100%",
      marginBottom: 10,
    },
    card: {
      width: 150,
      height: 160,
      backgroundColor: SOFT_PURPLE,
      borderRadius: 10,
      overflow: "hidden",
      marginLeft: 20,
    },
    containerImage: {
      width: "100%",
      height: "50%",
      backgroundColor: "#fff",
    },
    blur: {
      width: "100%",
      height: "100%",
      position: "absolute",
      left: 0,
      top: 0,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    bottomContainer: {
      width: "100%",
      height: "50%",
      justifyContent: "center",
      paddingHorizontal: 15,
      paddingTop: 16,
    },
    title: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
  });
  return (
    <>
      {data && (
        <View style={styles.containerItems}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <View style={styles.containerImage}>
                  <Image
                    style={styles.image}
                    width={50}
                    height={50}
                    source={{
                      uri: `${apiUrl}/service/image/${
                        item.photos[0].id_service
                      }/${item.photos[0].id_photo}?${new Date()}`,
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }}
                  />
                  <BlurView intensity={1} style={styles.blur} />
                </View>
                <View style={styles.bottomContainer}>
                  <Text style={styles.title}>
                    {croppedText(item.titre, 20)}
                  </Text>
                </View>
                <Polygone
                  background={`#${item.theme.color_hex}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: [{ translateY: -38 / 2 }],
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={{
                      uri: `${apiUrl}/themes/${item.theme.libelle_theme}`,
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }}
                    width={25}
                    height={25}
                  />
                </Polygone>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      {!data && (
        <View style={[styles.containerItems, { paddingLeft: 20, gap: 20 }]}>
          <Skeleton width={150} height={160} />
          <Skeleton width={150} height={160} />
          <Skeleton width={150} height={160} />
        </View>
      )}
    </>
  );
};

interface ServiceRecommendedProps {
  data: Service[] | null;
  token: string;
}

const ServiceRecommended: React.FC<ServiceRecommendedProps> = ({
  data,
  token,
}) => {
  /* VARIABLES */
  const scrollX = useRef(new Animated.Value(0)).current;

  /* STYLES */
  const styles = StyleSheet.create({
    section: {
      gap: 10,
    },
    body: {
      height: 150,
      width: "100%",
    },
    bodySkeleton: {
      paddingHorizontal: 20,
      height: 150,
      width: "100%",
      overflow: "hidden",
      borderRadius: 15,
    },
    card: {
      height: "100%",
      width: (width * 90) / 100,
      backgroundColor: SOFT_PURPLE,
      marginHorizontal: 20,
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      overflow: "hidden",
    },

    /* LEFT PART */
    leftPart: {
      width: "55%",
      padding: 15,
    },
    containerType: {
      backgroundColor: SUPER_SOFT_PURPLE,
      width: 125,
      paddingVertical: 2,
      paddingHorizontal: 10,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    type: {
      fontSize: 12,
      fontWeight: "500",
      color: "#fff",
    },
    containerTitle: {
      justifyContent: "space-evenly",
      flex: 1,
    },
    title: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "600",
    },
    containerInfo: {
      flexDirection: "row",
      gap: 8,
    },
    circle: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: MAIN_COLOR,
      height: 40,
      width: 40,
      borderWidth: 1,
      borderColor: "#776C90",
      borderRadius: 25,
    },
    price: {
      fontSize: 11,
      color: "#fff",
      fontWeight: "500",
    },
    containerText: {
      justifyContent: "center",
    },
    text: {
      color: "#fff",
      fontSize: 10,
    },
    tinyText: {
      color: "#fff",
      fontSize: 8,
    },

    /* RIGHT PART */
    firstCircle: {
      transform: [{ translateX: -18 }, { rotate: "-5deg" }],
      position: "absolute",
      bottom: 0,
    },
    secondCircle: {
      transform: [{ translateX: -10 }],
      position: "absolute",
      top: 20,
    },
    image: {
      borderRadius: 150,
    },
    rightPart: {
      width: "45%",
      overflow: "hidden",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingLeft: 20,
    },
  });

  console.log("Les données : " + data);

  return (
    <>
      {data && (
        <View style={styles.section}>
          <View style={styles.body}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              horizontal
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              scrollEventThrottle={32}
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.card}>
                  <View style={styles.leftPart}>
                    <View style={styles.containerType}>
                      <Text style={styles.type}>{item.theme.libelle_theme}</Text>
                    </View>
                    <View style={styles.containerTitle}>
                      <Text style={styles.title}>
                        {croppedText(item.titre, 30)}
                      </Text>
                      <View style={styles.containerInfo}>
                        <View style={styles.circle}>
                          <Text style={styles.price}>{item.prix}</Text>
                          <Money height={15} />
                        </View>
                        <View style={styles.containerText}>
                          <Text style={styles.text}>
                            Publié par {item.etudiant.prenom}
                          </Text>
                          <Text style={styles.tinyText}>
                            le{" "}
                            {new Date(item.created_at).toLocaleDateString(
                              "fr-FR"
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  <View style={styles.rightPart}>
                    <View>
                      <Circle style={styles.firstCircle} />
                      <Circle style={styles.secondCircle} reversed />
                      <Image
                        source={{
                          uri: `${apiUrl}/service/image/${item.photos[0].id_service}/${item.photos[0].id_photo}`,
                          headers: {
                            Authorization: `Bearer ${token}`,
                          },
                        }}
                        style={styles.image}
                        width={200}
                        height={200}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <Paginator data={data} scrollX={scrollX} />
        </View>
      )}

      {!data && (
        <View style={styles.bodySkeleton}>
          <Skeleton width={"100%"} height={"100%"} />
        </View>
      )}
      {!data && (
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <Skeleton width={"40%"} height={10} />
        </View>
      )}
    </>
  );
};

interface RecentPostProps {}

const RecentPost: React.FC<RecentPostProps> = () => {
  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      marginBottom: 125,
      paddingHorizontal: 15,
    },
    /* CARD */
    postContainer: {
      backgroundColor: SOFT_PURPLE,
      //height: 200,
      marginBottom: 30,
      borderRadius: 15,
      paddingHorizontal: 20,
      paddingVertical: 5,
    },
    /* LOGO APPLICATION */
    logoApp: {
      position: "absolute",
      width: 13.7,
      height: 15,
      right: 0,
      top: 5,
    },
    /* HEADER */
    header: {
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
      marginBottom: 10,
    },
    pp: {
      height: 40,
      width: 40,
      borderRadius: 50,
      resizeMode: "cover",
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },
    name: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
    verify: {
      transform: [{ translateY: 1.5 }],
    },
    class: {
      color: "#fff",
      fontWeight: "300",
      fontSize: 10,
    },
    /* CONTENT */
    textContent: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 12,
      marginBottom: 10,
    },
    imageContent: {
      width: "100%",
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    /* FOOTER */
    footer: {
      flexDirection: "row",
      gap: 15,
      marginBottom: 5,
    },
    textFooter: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 10,
      opacity: 0.7,
    },
  });

  return (
    <></> /*
    <>
      <View style={styles.body}>
        {[
          { image: false },
          { image: true },
          { image: false },
          { image: true },
        ].map((item, _i) => {
          return (
            <TouchableOpacity style={styles.postContainer} key={_i}>
              <Logo style={styles.logoApp} />
              <View style={styles.header}>
                <Image
                  style={styles.pp}
                  source={{
                    uri: "https://c4.wallpaperflare.com/wallpaper/332/915/762/one-piece-roronoa-zoro-hd-wallpaper-preview.jpg",
                  }}
                />
                {true && (
                  <View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.name}>Mathis Perrault</Text>
                      <Verify style={styles.verify} />
                    </View>
                    <Text style={styles.class}>@BTS SIO</Text>
                  </View>
                )}
              </View>
              <View>
                <Text style={styles.textContent}>
                  Je viens de commencer à regarder One Piece et je suis déjà
                  accro ! Je suis à l'épisode 20 et je ne peux pas m'arrêter.
                </Text>
                {item.image && (
                  <Image
                    source={{
                      uri: "https://r4.wallpaperflare.com/wallpaper/412/63/634/anime-one-piece-going-merry-one-piece-wallpaper-132a732a18457c5d4812eed34128c221.jpg",
                    }}
                    style={styles.imageContent}
                  />
                )}
                <View style={styles.footer}>
                  <Text style={styles.textFooter}>12 décembre 2023</Text>
                  <Text style={styles.textFooter}>12 likes</Text>
                  <Text style={styles.textFooter}>3 commentaires</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>*/
  );
};

export default IndexController;
