import {
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
  } from "react-native";
  import Layout from "../../../src/components/connected/Layout";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "../../../src/store/store";
  import { SOFT_PURPLE } from "../../../src/constants/Color";
  import { router } from "expo-router";
  import { updateLoadPost } from "../../../src/store/connected/connected";
  import ServiceModel from "../../../src/model/data/Service";
  import { ServiceInterface } from "../../../src/data/interface/Service";
  import ServiceRectangle from "../../../src/components/connected/data/service/ServiceRectangle";
  import LottieView from "lottie-react-native";
import { AnswerService } from "../../../src/data/interface/ServiceAnswer";
  
  const UserPost = () => {
    const model = new ServiceModel();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<AnswerService[]>([]);
    const token = useSelector((state: RootState) => state.login.token);
    const [selected, setSelected] = useState<number[]>([]);
    const dispatch = useDispatch();
  
    useEffect(() => {
      const handle = async () => {
        if (token) {
          const tempData = await model.getUserAnswerService(token);
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
        router.back();
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
        {!isLoading && (<><ScrollView
          style={{ paddingTop: 150 }}
          contentContainerStyle={{
            justifyContent: "space-between",
            minHeight: "100%",
            width: "100%",
            paddingBottom: 150,
          }}
          bounces={false}
        >
          <View>
            {token &&
              data.map((item, index) => {
                console.log(item)
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleClick(item.id_service)}
                    style={{
                      height: 150,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      marginBottom: 10,
                    }}
                  >
                    <ServiceRectangle
                      key={index}
                      token={token}
                      data={item.service[0]}
                      style={{}} />
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView></>)}
      </Layout>
    );
  };
  
  export default UserPost;
  