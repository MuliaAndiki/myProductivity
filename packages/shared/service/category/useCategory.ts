import { useCreate } from "./state/mutation";

export function useCategory() {
  return {
    mutation: {
      create: useCreate,
    },
    query: {
      //
    },
  };
}
