import { View, Text, Image, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface InputImageProps {
  setShowModal: (arg0: boolean) => void;
  selectedImage: string | undefined;
}

const InputImage: React.FC<InputImageProps> = ({
  setShowModal,
  selectedImage,
}) => {
  const handlePress = () => {
    setShowModal(true);
  };
  return (
    <View style={styles.containerPP}>
      {!selectedImage && (
        <TouchableWithoutFeedback onPress={handlePress} style={styles.containerPP}>
          <Text style={styles.name}>FD</Text>
          <View style={styles.containerImage}>
            <Image
              style={styles.image}
              source={require("../../../../assets/images/auth/register/camera-purple.png")}
            />
          </View>
        </TouchableWithoutFeedback>
      )}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.pp} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerPP: {
    backgroundColor: "#60B7FF",
    width: 75,
    height: 75,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
  },
  image: {
    width: 30,
    height: 30,
  },
  containerImage: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.3)",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pp: {
    width: 75,
    height: 75,
  },
});

export default InputImage;
