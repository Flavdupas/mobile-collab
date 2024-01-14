import { View, StyleSheet, useWindowDimensions, Animated } from "react-native";
import { LIGHT_PURPLE, SUPER_LIGHT_PURPLE } from "../../constants/Color";

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

interface PaginatorProps {
  data: Service[];
  scrollX: any;
}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles.containerDot}>
      {(data && data.length > 0 ) && data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const color = scrollX.interpolate({
          inputRange,
          outputRange: ["#fff", SUPER_LIGHT_PURPLE, "#fff"],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { backgroundColor: color }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerDot: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

export default Paginator;
