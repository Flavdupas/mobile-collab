import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useState } from "react";
import Searchbar from "../../../components/connected/Searchbar";
import ServiceViewModel from "../../../viewModel/connected/home/Service";
import Themes from "../../../components/connected/Themes";
import { View } from "react-native";
import AllService from "../../../components/connected/data/service/AllService";
import { updateThemes } from "../../../store/connected/connected";
import { ServiceInterface } from "../../../data/interface/Service";
const ServiceController = () => {
  /* VARIABLES */
  const token = useSelector((state: RootState) => state.login.token);
  const themes = useSelector(
    (state: RootState) => state.connected.fetchData.themes
  );
  const [keyword, setKeyword] = useState<string | null>(null);
  const [idTheme, setIdTheme] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<ServiceInterface[][] | null>(null);
  const viewModel = new ServiceViewModel();
  const dispatch = useDispatch();

  /* STYLES */

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
  },[token]);
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (token) {
        setData(await viewModel.search(token, idTheme, keyword));
        setIsLoading(false);
      }
    };
    fetchData();
  }, [keyword, idTheme]);

  return (
    <>
      <View>
        <View>
          <Searchbar onChange={setKeyword} />
          <Themes data={themes} onClick={setIdTheme} />
        </View>
        <AllService token={token ?? ""} data={data} isLoading={isLoading} />
      </View>
    </>
  );
};

export default ServiceController;
