import { useEffect, useState } from "react";
import { updateThemes } from "../../../store/connected/connected";
import { useDispatch, useSelector } from "react-redux";
import ServiceViewModel from "../../../viewModel/connected/home/Service";
import { RootState } from "../../../store/store";
import Themes from "../../../components/connected/Themes";
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  MAIN_COLOR,
  SOFT_PURPLE,
  SUPER_LIGHT_PURPLE,
  SUPER_SOFT_PURPLE,
} from "../../../constants/Color";
import DatePicker from "react-native-modern-datepicker";
import { BasicService } from "../../../data/interface/Service";
import ServiceCrud from "../../../viewModel/connected/service/Crud";

const CreateTwoViewController = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.connected.serviceCreate);
  const viewModel = new ServiceViewModel();
  const token = useSelector((state: RootState) => state.login.token);
  const [dateBegin, setDateBegin] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [showDateBegin, setShowDateBegin] = useState<boolean>(false);
  const [showDateEnd, setShowDateEnd] = useState<boolean>(false);
  const [price, setPrice] = useState<number>(0);
  const [index, setIndex] = useState<0 | 1>(0);
  const viewModelCrud = new ServiceCrud();

  /* VARIABLES */
  const themes = useSelector(
    (state: RootState) => state.connected.fetchData.themes
  );
  const [idTheme, setIdTheme] = useState<number | null>(null);

  /* LOGIQUE */
  useEffect(() => {
    const fetchData = async () => {
      const themes = await viewModel.getThemes();
      if (themes) {
        const data = [
          {
            id_theme: -1,
            libelle_theme: "Tout",
            path_logo: "",
            path_background: "",
            color_hex: "",
            created_at: "",
            updated_at: null,
          },
          ...themes,
        ];

        dispatch(updateThemes(data));
      }
    };
    fetchData();
  }, [token]);

  const onChange = (selectedDate: string) => {
    let parts = selectedDate.split("/");
    let dateObject = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );
    console.log(dateObject.toDateString());
    if (index === 0) {
      setDateBegin(dateObject);
    } else {
      setDateEnd(dateObject);
    }
    setShowDateBegin(false);
    setShowDateEnd(false);
  };

  const handleDateOpen = (index: 0 | 1, start: Boolean) => {
    setIndex(index);
    if (start) {
      setShowDateBegin(true);
    } else {
      setShowDateEnd(true);
    }
  };
  const handlePrice = (price: string) => {
    setPrice(Number(price));
  };
  const handleCreate = () => {
    if (dateBegin && dateEnd) {
      const createData: BasicService = {
        title: data.title,
        description: data.title,
        type: data.type,
        price: price,
        id_theme: idTheme,
        dateDebut: dateBegin?.getTime() / 1000 ?? 0,
        dateFin: dateEnd?.getTime() / 1000 ?? 0,
      };
      viewModelCrud.createService(createData);
    }
  };

  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <Modal transparent visible={showDateBegin || showDateEnd}>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowDateBegin(false);
            setShowDateEnd(false);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              padding: 20,
              backgroundColor: "rgba(0,0,0,.4)",
            }}
          >
            <DatePicker
              mode="calendar"
              style={{ borderRadius: 10 }}
              onSelectedChange={(date) => onChange(date)}
              options={{
                backgroundColor: MAIN_COLOR,
                textHeaderColor: "#fff",
                textDefaultColor: SUPER_SOFT_PURPLE,
                selectedTextColor: "#fff",
                mainColor: SUPER_SOFT_PURPLE,
                textSecondaryColor: "#fff",
                borderColor: "rgba(122, 146, 165, 0.1)",
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View>
        <View>
          <Themes data={themes} onClick={setIdTheme} />
        </View>

        <View style={{ gap: 5 }}>
          {data && (
            <>
              <Text style={{ color: "#fff", fontSize: 18 }}>
                {data.type === 0
                  ? "Prix de la demande"
                  : "Prix de la proposition"}
              </Text>
              <TextInput
                keyboardType="decimal-pad"
                style={{
                  backgroundColor: SOFT_PURPLE,
                  height: 50,
                  borderRadius: 10,
                  padding: 10,
                  fontSize: 18,
                  color: "#fff",
                }}
                onChangeText={handlePrice}
              />
              <Text style={{ color: "#fff", fontSize: 18 }}>Date de début</Text>
              <TouchableOpacity
                onPress={() => handleDateOpen(0, true)}
                style={[
                  {
                    backgroundColor: SOFT_PURPLE,
                    height: 50,
                    borderRadius: 10,
                    padding: 10,
                  },
                ]}
              >
                <Text style={{ color: "#fff" }}>
                  {dateBegin?.toDateString()}
                </Text>
              </TouchableOpacity>
              <Text style={{ color: "#fff", fontSize: 18 }}>Date de fin</Text>
              <TouchableOpacity
                onPress={() => handleDateOpen(1, false)}
                style={[
                  {
                    backgroundColor: SOFT_PURPLE,
                    height: 50,
                    borderRadius: 10,
                    padding: 10,
                  },
                ]}
              >
                <Text style={{ color: "#fff" }}>{dateEnd?.toDateString()}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: SUPER_LIGHT_PURPLE,
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          borderRadius: 35,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Créer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateTwoViewController;
