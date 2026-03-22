import Constants from "expo-constants";

import {
  AxiosClient,
  setBaseURLProvider,
  setTokenProvider,
} from "@repo/shared";
import { store } from "@/stores/store";

setBaseURLProvider(() => Constants.expoConfig?.extra?.BACKEND_URL);

setTokenProvider(() => store.getState().auth.token!);

export default AxiosClient;
