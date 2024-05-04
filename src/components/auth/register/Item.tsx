import { memo } from "react";
import {
  TouchableWithoutFeedback,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";

interface ItemProps {
  item: { id: number; title: string };
  currentList: number[];
  handleClick: (arg0: { id: number; title: string }) => void;
}

const Item: React.FC<ItemProps> = ({ item, handleClick, currentList }) => {
  const styles = StyleSheet.create({
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

  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View
        style={[
          styles.item,
          {
            backgroundColor: currentList.includes(item.id)
              ? "#fff"
              : "transparent",
          },
        ]}
      >
        <Text
          style={[
            styles.textItem,
            {
              color: currentList.includes(item.id) ? "#000" : "#fff",
              fontWeight: currentList.includes(item.id) ? "bold" : "600",
            },
          ]}
        >
          {item.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default memo(Item);
