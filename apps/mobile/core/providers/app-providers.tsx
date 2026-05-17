import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { ThemeProvider } from "@/core/providers/theme.provinder";
import { AlertProvinder } from "@/hooks/useAlert/costum-alert";
import { ReactQueryClientProvider } from "@/pkg/react-query/query-client.pkg";
import { persistor, store } from "@/stores/store";

type ProviderProps = { children: React.ReactNode };
type ProviderComponent = React.ComponentType<ProviderProps>;

function composeProviders(providers: ProviderComponent[]) {
  return ({ children }: ProviderProps) =>
    providers.reduceRight((acc, ProviderComponent) => {
      return <ProviderComponent>{acc}</ProviderComponent>;
    }, children);
}

const Providers = composeProviders([
  ({ children }) => <Provider store={store}>{children}</Provider>,
  ({ children }) => <PersistGate persistor={persistor}>{children}</PersistGate>,
  ReactQueryClientProvider,
  ThemeProvider,
  AlertProvinder,
]);

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
