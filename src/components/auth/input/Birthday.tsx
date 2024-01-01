import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, Platform, StyleSheetProperties, ViewStyle } from "react-native";
import Birthday from "../../icons/Birthday";

import InputDate from "./Date";

interface InputBirthdayProps {
  showPicker: boolean;
  setShowPicker: (arg0: boolean) => void;
  date: Date | null;
  setDate: (arg0: Date) => void;
  style?: ViewStyle;
}

const InputBirthday: React.FC<InputBirthdayProps> = ({ showPicker, setShowPicker, date, setDate,style }) => {

  return (
    <>
      {Platform.OS === "ios" && (
        <>
          <View style={[styles.body,style]}>
            <Pressable
              onPress={() => setShowPicker(!showPicker)}
              style={styles.containerValue}
            >
              <Text style={styles.input}>
              {!date && "Choisissez votre date de naissance"}
                {date?.toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
              <Birthday style={styles.birthday} />
            </Pressable>
          </View>
        </>
      )}
      {Platform.OS === "android" && (
        <View style={[styles.body,style]}>
          <InputDate setDate={setDate}/>
          <Birthday style={styles.birthday} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#C3C3C3",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    backgroundColor: "#261E35",
  },
  input: {
    color: "white",
    fontSize: 14,
  },
  containerValue: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  birthday: {
    width: 20,
    height: 20,
  },
});

export default InputBirthday;
