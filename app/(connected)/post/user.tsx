import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Layout from "../../../src/components/connected/Layout";
import PostModel from "../../../src/model/data/Post";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import Post from "../../../src/components/connected/data/post/Post";
import { SOFT_PURPLE } from "../../../src/constants/Color";
import { router } from "expo-router";
import { updateLoadPost } from "../../../src/store/connected/connected";
import LottieView from "lottie-react-native";

const UserPost = () => {
  const model = new PostModel();
  const [data, setData] = useState<PostInterface[]>([]);
  const token = useSelector((state: RootState) => state.login.token);
  const [selected, setSelected] = useState<number[]>([]);
  const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const handle = async () => {
      if (token) {
        const tempData = await model.getUserPost(token);
        if (tempData) {
          console.log(tempData);
          setData(tempData);
          setIsLoading(false)
        }
      }
    };
    handle();
  }, []);

  const handleClick = (id: number) => {
    const temp = [...selected];
    if (temp.includes(id)) {
      temp.splice(temp.indexOf(id), 1);
    } else {
      temp.push(id);
    }
    setSelected(temp);
  };

  const handleDelete = async () => {
    if (token) {
      await model.delete(token, selected);
      router.back()
      dispatch(updateLoadPost(true));
    }
  };
  return (
    <Layout>
    {isLoading && (
        <LottieView
          autoPlay
          loop
          style={{ height: 40, alignSelf: "center", marginTop:150 }}
          source={require("../../../src/assets/animations/Loading.json")}
        />
      )}
      {!isLoading && (<ScrollView
        style={{ paddingHorizontal: 20, paddingTop: 150, }}
        contentContainerStyle={{justifyContent:"space-between", flex:1}}
        bounces={false}
      >
        <View>
          {token &&
            data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleClick(item.id_post)}
                >
                  <Post
                    disabled
                    key={index}
                    token={token}
                    data={item}
                    style={{
                      borderWidth: 1,
                      borderColor: selected.includes(item.id_post)
                        ? "#63DF7F"
                        : "transparent",
                    }}
                  />
                </TouchableOpacity>
              );
            })}
        </View>
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            backgroundColor: SOFT_PURPLE,
            width: "100%",
            height: 50,
            marginBottom: 50,
            marginHorizontal: 20,
            alignSelf: "center",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>
            Supprimer
          </Text>
        </TouchableOpacity>
      </ScrollView>)} 
    </Layout>
  );
};

export default UserPost;
