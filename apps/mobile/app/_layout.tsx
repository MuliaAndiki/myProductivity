import "@/styles/global.css";
import "@/utils/Axios.client";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AppProviders } from "./provinder";
import { RootLayoutContent } from "./screen.stack";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProviders>
        <RootLayoutContent />
      </AppProviders>
    </GestureHandlerRootView>
  );
}
