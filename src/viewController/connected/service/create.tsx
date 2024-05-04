import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Pressable,
} from "react-native";
import {
  LIGHT_PURPLE,
  SOFT_PURPLE,
  SUPER_LIGHT_PURPLE,
  SUPER_SOFT_PURPLE,
} from "../../../constants/Color";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateServiceCreate } from "../../../store/connected/connected";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const CreateViewController = () => {
  /* VARIABLES */
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<0 | 1>(0);
  const [description, setDescription] = useState<string>("");

  const handleClick = () => {
    dispatch(
      updateServiceCreate({
        title: title,
        description: description,
        type: type,
        price: null,
        id_theme: null,
        dateDebut: null,
        dateFin: null,
        image: null
      })
    );
    if (title !== "" && description !== "") {
      router.push("/service/createTwo");
    }
  };

  const handleToogle = (data: string) => {
    console.log(data);
    if (data === "Demande") {
      setType(0);
    } else {
      setType(1);
    }
  };

  return (
    <Pressable
      style={{ justifyContent: "space-between", flex: 1 }}
      onPress={Keyboard.dismiss}
    >
      <>
        <View style={{ flex: 1, paddingBottom: 20 }}>
          <ToogleController setToggle={handleToogle} />
          <Text style={{ fontSize: 18, color: "#fff", fontWeight: "bold" }}>
            Création d'une demande
          </Text>
          <TitleController setTitle={setTitle} />
          <DescriptionController setDescription={setDescription} />
        </View>
        <LinearGradient
          style={{
            height: 50,
            width: "100%",
            borderRadius: 35,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
            marginTop: 10,
          }}
          start={[1,0]} end={[0,1]}
          colors={[LIGHT_PURPLE, "rgba(161,152,218,1)"]}
        >
          <TouchableOpacity
            onPress={handleClick}
            style={{
              width:'100%',
              height:"100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Continuer
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </>
    </Pressable>
  );
};

interface DescriptionControllerProps {
  setDescription: (arg0: string) => void;
}

const DescriptionController: React.FC<DescriptionControllerProps> = ({
  setDescription,
}) => {
  return (
    <View style={{ gap: 5, flex: 1 }}>
      <Text
        style={{
          color: "#fff",
          marginLeft: 15,
          fontWeight: "bold",
          opacity: 0.9,
        }}
      >
        Description
      </Text>
      <TextInput
        placeholder="Écrivez ici une description de la demande ..."
        placeholderTextColor={"rgba(255,255,255,.8)"}
        onChangeText={setDescription}
        style={{
          flex: 1,
          backgroundColor: SOFT_PURPLE,
          borderRadius: 10,
          padding: 20,
          color: "#fff",
          textAlignVertical: "top",
        }}
        multiline
      />
    </View>
  );
};

interface TitleControllerProps {
  setTitle: (arg0: string) => void;
}

const TitleController: React.FC<TitleControllerProps> = ({ setTitle }) => {
  return (
    <View style={{ marginTop: 10, gap: 5, marginBottom: 15 }}>
      <Text
        style={{
          color: "#fff",
          marginLeft: 15,
          fontWeight: "bold",
          opacity: 0.9,
        }}
      >
        Titre de la demande
      </Text>
      <TextInput
        onChangeText={setTitle}
        style={{
          backgroundColor: SOFT_PURPLE,
          height: 45,
          fontSize: 14,
          color: "#fff",
          padding: 5,
          borderRadius: 10,
          borderColor: "#3F3655",
          borderWidth: 2,
        }}
      />
    </View>
  );
};

interface ToogleControllerProps {
  setToggle: (arg0: "Demande" | "Proposition") => void;
}

const ToogleController: React.FC<ToogleControllerProps> = ({ setToggle }) => {
  /* VARIABLES */
  const { width } = Dimensions.get("screen");
  const translateX = useSharedValue(0);
  const [type, setType] = useState<"Demande" | "Proposition">("Demande");
  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      marginVertical: 20,
      height: 35,
      width: "100%",
      backgroundColor: SOFT_PURPLE,
      borderRadius: 35,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
    },
    indicator: {
      position: "absolute",
      width: "50%",
      borderRadius: 25,
      height: "100%",
      backgroundColor: SUPER_LIGHT_PURPLE,
      left: 0,
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const toogle = () => {
    setType(type === "Demande" ? "Proposition" : "Demande");
  };

  useEffect(() => {
    setToggle(type);
    if (type === "Proposition") {
      translateX.value = withSpring(width / 2 - 20, {
        duration: 2000,
        dampingRatio: 0.5,
        stiffness: 100,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      });
    } else {
      translateX.value = withSpring(0, {
        duration: 2000,
        dampingRatio: 0.5,
        stiffness: 100,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 2,
      });
    }
  }, [type]);

  return (
    <TouchableWithoutFeedback onPress={toogle}>
      <View style={styles.body}>
        <Animated.View style={[styles.indicator, animatedStyle]} />
        <Text
          style={{
            color: type === "Demande" ? SOFT_PURPLE : SUPER_LIGHT_PURPLE,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Demande
        </Text>
        <Text
          style={{
            color: type === "Proposition" ? SOFT_PURPLE : SUPER_LIGHT_PURPLE,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Proposition
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateViewController;
