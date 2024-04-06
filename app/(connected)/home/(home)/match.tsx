import { View } from "react-native";
import { MAIN_COLOR } from "../../../../src/constants/Color";
import { MatchModel } from "../../../../src/model/data/Match";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../src/store/store";
import { Match } from "../../../../src/data/interface/Match";
import { SwipeableCard } from "../../../../src/components/connected/Swipeable";
import { router } from "expo-router";
import { updateCurrentMatch, updateLoadMessage } from "../../../../src/store/connected/connected";

const MatchView = () => {
  const model = new MatchModel();
  const token = useSelector((state: RootState) => state.login.token);
  const [matchData, setMatchData] = useState<Match[]>([]);
  const [match, setMatch] = useState<{data:Match, like:boolean}>()
  const dispatch = useDispatch();

  useEffect(() => {
    const handle = async () => {
      if (token) {
        const data = await model.getStudentsToMatch(token);
        console.log(data);
        setMatchData(data);
      }
    };
    handle();
  }, []);

  useEffect(() => {
    if(match && match.like && token) {
      model.createMatch(token,match.data[0].id_utilisateur)
      if(match.data[0].aMatch) {
        router.push('/match/')
        dispatch(updateLoadMessage(true));
        dispatch(updateCurrentMatch(match.data));
      }
    }
  }, [match])

  return (
    <View style={{ flex: 1, backgroundColor: MAIN_COLOR }}>
      <View style={{ flex: 1, paddingHorizontal: 25, paddingBottom:125 }}>
        {matchData.map((item, index) => {
          return <SwipeableCard setMatch={setMatch}item={item} key={index}></SwipeableCard>;
        })}
      </View>
    </View>
  );
};

export default MatchView;
