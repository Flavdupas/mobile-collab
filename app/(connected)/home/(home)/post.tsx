import { ScrollView, StyleSheet, View } from "react-native";
import PostModel from "../../../../src/model/data/Post";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../src/store/store";
import Post from "../../../../src/components/connected/data/post/Post";
import { MAIN_COLOR } from "../../../../src/constants/Color";
import CreateBtn from "../../../../src/components/connected/CreateBtn";
import LottieView from "lottie-react-native";
import { updateLoadPost } from "../../../../src/store/connected/connected";

const PostIndex = () => {
  const model = new PostModel();
  const token = useSelector((state: RootState) => state.login.token);
  const [data, setData] = useState<PostInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loadPost = useSelector((state: RootState) => state.connected.loadPost);
  const dispatch = useDispatch();

  useEffect(() => {
    const handle = async () => {
      if (token) {
        const tempData = await model.getAll(token);
        if (tempData) {
          setData(tempData);
          setIsLoading(false);
        }
        dispatch(updateLoadPost(false));
      }
    };
    handle();
  }, [loadPost]);

  const styles = StyleSheet.create({
    body: {
      backgroundColor: MAIN_COLOR,
      paddingBottom: 100,
      paddingHorizontal: 20,
      paddingTop: 30,
      minHeight: "100%",
    },
    lottie: {
      height: 40,
      alignSelf: "center",
    },
  });
  return (
    <View style={styles.body}>
      {isLoading && (
        <LottieView
          autoPlay
          loop
          style={styles.lottie}
          source={require("../../../../src/assets/animations/Loading.json")}
        />
      )}
      {!isLoading && (
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {data &&
            token &&
            data.map((item, _i) => {
              return (
                <View key={_i}>
                  <Post data={item} token={token} />
                </View>
              );
            })}
        </ScrollView>
      )}

      <CreateBtn href={"/post/create"} />
    </View>
  );
};

export default PostIndex;
