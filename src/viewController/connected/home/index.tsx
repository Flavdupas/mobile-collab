import { useEffect, useState } from "react";
import IndexViewModel from "../../../viewModel/connected/home/Index";
import { FlatList, Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Skeleton } from "moti/skeleton";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { SOFT_PURPLE } from "../../../constants/Color";
import { BlurView } from "expo-blur";
import { croppedText } from "../../../utils/string";
import Polygone from "../../../components/icons/Polygone";
import Chevron from "../../../components/icons/Chevron";
import { router } from "expo-router";
import Money from "../../../components/icons/Money";
import Circle from "../../../components/icons/Circle";
const { width } = Dimensions.get("window");

const IndexController = () => {
  /* VARIABLES */
  const viewModel = new IndexViewModel();
  const token = useSelector((state: RootState) => state.login.token);
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
      id_theme: number;
      libelle_theme: string;
      path_logo: string;
      color_hex: string;
      photos: {
        id_service: number;
        id_photo: number;
        path: string;
        created_at: Date | null;
        updated_at: Date | null;
      }[];
      definir_themes: {
        id_service: 5;
        id_theme: 15;
      }[];
    }[]
    | null
  >(null);

  /* STYLES */
  const styles = StyleSheet.create({
    containerTitle: {
      flexDirection: "row",
      justifyContent: "space-between",
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
    }
  });

  /* LOGIQUE */
  useEffect(() => {
    const fetchData = async () => {
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
      if (token) {
        const recentServicesData = await viewModel.getRecentService(token);
        //console.log(recentServicesData);
        if (recentServicesData) {
          setRecentServices(recentServicesData);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <View>
        <Themes data={themes} />
        <RecentServices data={recentServices} />
        <View style={styles.containerTitle}>
          <Text style={styles.title}>Pour vous</Text>
          <TouchableOpacity onPress={() => router.push("/home/")} style={styles.round}><Chevron /></TouchableOpacity>
        </View>
        <ServiceForYou />
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
    id_theme: number;
    libelle_theme: string;
    path_logo: string;
    color_hex: string;
    photos: {
      id_service: number;
      id_photo: number;
      path: string;
      created_at: Date | null;
      updated_at: Date | null;
    }[];
    definir_themes: {
      id_service: number;
      id_theme: number;
    }[];
  }[]
  | null;
}

const RecentServices: React.FC<RecentServicesProps> = ({ data }) => {
  /* VARIABLES */
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  /* STYLES */
  const styles = StyleSheet.create({
    containerItems: {
      flexDirection: "row",
      gap: 20,
    },
    card: {
      width: 150,
      height: 160,
      backgroundColor: SOFT_PURPLE,
      borderRadius: 10,
      overflow: "hidden",
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
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.card}>
                <View style={styles.containerImage}>
                  <Image
                    style={styles.image}
                    width={50}
                    height={50}
                    source={{
                      uri: `${apiUrl}/service/image/${item.photos[0].id_service}/${item.photos[0].id_photo}`,
                    }}
                  />
                  <BlurView intensity={5} style={styles.blur} />
                </View>
                <View style={styles.bottomContainer}>
                  <Text style={styles.title}>{croppedText(item.titre)}</Text>
                </View>
                <Polygone
                  background={`#${item.color_hex}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    transform: [{ translateY: -38 / 2 }],
                    marginLeft: 20,
                  }}
                >
                  <Image
                    source={{ uri: `${apiUrl}/themes/${item.libelle_theme}` }}
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
        <View style={styles.containerItems}>
          <Skeleton width={150} height={160} />
          <Skeleton width={150} height={160} />
          <Skeleton width={150} height={160} />
        </View>
      )}
    </>
  );
};

const ServiceForYou = () => {

  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      height: 150,
      width: "100%",
    },
    card: {
      height: "100%",
      width: width * 90 / 100,
      backgroundColor: SOFT_PURPLE,
      marginHorizontal: 20,
      borderRadius: 15,
      flexDirection: "row",
      justifyContent: "space-between"
    },

    /* LEFT PART */
    leftPart: {
      width:"55%"
    },

    /* RIGHT PART */
    firstCircle: {
      transform: [{translateX:-18},{rotate:'-5deg'}], position:"absolute", bottom:0
    },
    secondCircle: {
      transform: [{translateX:-10}], position:"absolute", top:20
    },
    image: {
      borderRadius:150
    },
    rightPart: {
      width:"45%", overflow: "hidden", justifyContent: "center", alignItems: "flex-start", paddingLeft:20
    }
  });

  return (
    <>
      <View style={styles.body}>
        <FlatList showsHorizontalScrollIndicator={false} pagingEnabled horizontal data={[1, 2, 3, 4]} renderItem={({ item }) => (
          <View style={styles.card}>
       
              <View style={styles.leftPart}>
                <Text>Informatiques</Text>
                <Text>Création d'un site</Text>
                <View>
                    <View>
                      <Text>20</Text>
                      <Money />
                    </View>
                    <View>
                      <Text>Publié par Louison</Text>
                      <Text>le 22 / 12 /2023</Text>
                    </View>
                </View>
              </View>
            
              <View style={styles.rightPart}>
                <View>
                  <Circle style={styles.firstCircle}/>
                  <Circle style={styles.secondCircle} reversed/>
                  <Image source={{ uri : "https://static.vecteezy.com/system/resources/previews/025/938/762/non_2x/night-scene-of-after-rain-city-in-cyberpunk-style-futuristic-nostalgic-80s-90s-neon-lights-vibrant-colorsrealistic-horizontal-illustration-ai-generated-free-photo.jpg"}} style={styles.image} width={200} height={200}/>
                </View>
              </View>
          </View>)} />
      </View>
    </>
  )
}

export default IndexController;
