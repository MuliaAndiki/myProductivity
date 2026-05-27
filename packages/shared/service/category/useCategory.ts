import {
  createCategoryMutationOptions,
  updateCategoryMutationOptions,
} from "./state/mutation";

export function useCategory() {
  return {
    mutation: {
      create: createCategoryMutationOptions,
      update: updateCategoryMutationOptions,
    },
    query: {
      //
    },
  };
}
