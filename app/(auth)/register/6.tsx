import { StyleSheet, Text, View, Platform } from "react-native";
import RegisterLayout from "../../../src/components/auth/register/Layout";
import themeData from "../../../src/data/auth/themeData";
import Button from "../../../src/components/auth/Button";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const RegisterSix = () => {
  const [idItemChosen, setIdItemChosen] = useState<number[]>([]);

  const handleClick = (item: { id: number; title: string }) => {
    if (idItemChosen.includes(item.id)) {
      const updatedIdItemChosen = [...idItemChosen];
      const indexToRemove = updatedIdItemChosen.indexOf(item.id);
      updatedIdItemChosen.splice(indexToRemove, 1);
      setIdItemChosen(updatedIdItemChosen);
    } else {
      if (idItemChosen.length < 3) {
        setIdItemChosen([...idItemChosen, item.id]);
      }
    }
  };

  return (
    <RegisterLayout>
      <View style={styles.body}>
        <View>
          <Text style={styles.title}>Passions</Text>
          <Text style={styles.subtitle}>
            Choisissez 3 thèmes qui vous correspondent, en les ajoutant à votre
            profil
          </Text>
          <View style={styles.containerItem}>
            {themeData.map((item) => {
              return (
                <TouchableWithoutFeedback onPress={() => handleClick(item)} key={item.id}>
                  <View
                    style={[
                      styles.item,
                      {
                        backgroundColor: idItemChosen.includes(item.id)
                          ? "#fff"
                          : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.textItem,
                        {
                          color: idItemChosen.includes(item.id)
                            ? "#000"
                            : "#fff",
                          fontWeight: idItemChosen.includes(item.id)
                            ? "bold"
                            : "600",
                        },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </View>
        <Button href="/register/7" canGoNext={true} />
      </View>
    </RegisterLayout>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: "space-between",
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 15,
  },
  subtitle: {
    color: "#fff",
    fontWeight: "400",
    marginTop: 15,
  },
  containerItem: {
    paddingTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: Platform.OS === "android" ? 10 : 15,
    columnGap: 20,
  },
  item: {
    borderColor: "#fff",
    borderWidth: 1,
    paddingHorizontal: 40,
    paddingVertical: 5,
    borderRadius: 25,
  },
  textItem: {
    fontSize: Platform.OS === "android" ? 14 : 16,
  },
});

export default RegisterSix;
