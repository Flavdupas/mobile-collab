import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Layout from "../../../src/components/connected/Layout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import Post from "../../../src/components/connected/data/post/Post";
import ArrowUp from "../../../src/components/icons/ArrowUp";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Comment } from "../../../src/data/interface/Comment";
import PostModel from "../../../src/model/data/Post";
import { updateLoadPost } from "../../../src/store/connected/connected";

const Show = () => {
  const data = useSelector((state: RootState) => state.connected.currentPost);
  const token = useSelector((state: RootState) => state.login.token);
  const [content, setContent] = useState<string>("");
  const [comment, setComment] = useState<Comment[]>([]);
  const dispatch = useDispatch();
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const model = new PostModel();
  const handleClick = async () => {
    if (token && content !== "" && data) {
      await model.createComment(token, content, data?.id_post);
      setContent("");
      setComment(await model.getComment(token, data?.id_post));
      dispatch(updateLoadPost(true));
    }
  };
  useEffect(() => {
    const handle = async () => {
      if (token && data) {
        setComment(await model.getComment(token, data?.id_post));
      }
    };
    handle();
  }, []);
  return (
    <Layout>
      <View style={{ paddingTop: 150, paddingHorizontal: 20, flex: 1 }}>
        {data && token && (
          <Post data={data} token={token} disabled={true} full />
        )}
        <View>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Commentaires
          </Text>
        </View>

        <ScrollView
          style={{ paddingTop: 20, marginBottom: 125 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {comment.length != 0 && comment.map((item, index) => {
            return (
              <View key={index} style={{ gap: 10, marginBottom: 20 }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Image
                    source={{ uri: `${apiUrl}/post/pp/${item.id_etudiant}` }}
                    style={{ height: 40, width: 40, borderRadius: 50 }}
                  />
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    {item.etudiant.prenom} {item.etudiant.nom}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: "#fff", opacity: 0.8 }}>
                    {item.contenu}
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "right",
                      opacity: 0.8,
                      marginTop: 5,
                      fontSize: 10,
                    }}
                  >
                    {new Date(item.created_at).toLocaleDateString("fr")}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{ position: "absolute", bottom: 20, width: "100%", left: 20 }}
        >
          <TextInput
            value={content}
            onChangeText={setContent}
            style={{
              marginBottom: 40,
              width: "100%",
              height: 40,
              backgroundColor: "#fff",
              borderRadius: 50,
              paddingHorizontal: 10,
            }}
            placeholder="Entrer votre message ..."
          ></TextInput>
          <TouchableOpacity
            style={{ position: "absolute", right: 15, top: 5 }}
            onPress={handleClick}
          >
            <LinearGradient
              colors={["#5894EF", "#8CB4F1"]}
              style={{
                height: 30,
                width: 30,

                borderRadius: 50,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ArrowUp />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};
export default Show;
