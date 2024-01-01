import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

interface CarteEtudiantModalProps {
  setShowModal: (arg0: boolean) => void;
  setSelectedImage: (arg0: string) => void;
  title:string;
}

const CarteEtudiantModal: React.FC<CarteEtudiantModalProps> = ({
  setShowModal,
  setSelectedImage,
  title,
}) => {
  const handleCamera = async () => {
    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.back,
        allowsEditing: false,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {}
  };
  const handleGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

    const handleDelete = () => {
        setSelectedImage("");
    }

  return (
    <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
      <View style={styles.body}>
        <TouchableWithoutFeedback onPress={() => console.log("hey")}>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.containerOptions}>
              <TouchableWithoutFeedback onPress={handleCamera}>
                <View style={styles.option}>
                  <Image
                    style={styles.image}
                    source={require("../../../assets/images/auth/register/camera.png")}
                  />
                  <Text style={styles.text}>Caméra</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleGallery}>
                <View style={styles.option}>
                  <Image
                    style={styles.image}
                    source={require("../../../assets/images/auth/register/gallery.png")}
                  />
                  <Text style={styles.text}>Gallerie</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={handleDelete}>
                <View style={styles.option}>
                  <Image
                    style={styles.image}
                    source={require("../../../assets/images/auth/register/trash.png")}
                  />
                  <Text style={styles.text}>Supprimer</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.3)",
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    rowGap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#261E35",
  },
  option: {
    backgroundColor: "#EAEAEA",
    height: 75,
    width: 75,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 45,
    width: 45,
  },
  text: {
    color: "#261E35",
    fontWeight: "600",
    fontSize: 12,
  },
  containerOptions: {
    flexDirection: "row",
    gap: 30,
  },
});
export default CarteEtudiantModal;
