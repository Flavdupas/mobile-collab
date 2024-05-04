import {
    Keyboard,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MAIN_COLOR } from "../../../src/constants/Color";
import CreateTwoViewController from "../../../src/viewController/connected/service/createTwo";
import Chevron from "../../../src/components/icons/ChevronWhite";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";

const CreateTwo = () => {
  /* STYLES */
  const styles = StyleSheet.create({
    body: {
      flex: 1,
      backgroundColor: MAIN_COLOR,
      padding: 20,
      paddingTop: 65,
    },
  });
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.body}>
        <TouchableOpacity>
          <Chevron />
        </TouchableOpacity>
        <CreateTwoViewController />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateTwo;
