import { router } from "expo-router";

const resetHistory = async () => {
  while (router.canGoBack()) {
    router.back();
  }
};


export default resetHistory;