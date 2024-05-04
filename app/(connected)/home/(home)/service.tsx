import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import connectedStyle from "../../../../src/constants/ConnectedStyle";
import ServiceController from "../../../../src/viewController/connected/home/service";
import CreateBtn from "../../../../src/components/connected/CreateBtn";

const Service = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={connectedStyle.body}>
        <Text
          style={[connectedStyle.title, { marginLeft: 20, marginBottom: 20 }]}
        >
          Services
        </Text>
        <ServiceController />
        <CreateBtn href={"/service/create"}/>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Service;
