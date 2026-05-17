import { TResponse } from "@/utils/trespone";
import { PickCreateCategory } from "@/@types/category.types";
import Api from "@/api/props.service";

export function createCategoryMutationOptions() {
  return {
    mutationFn: (payload: PickCreateCategory) => Api.Category.Create(payload),
  };
}

export function updateCategoryMutationOptions() {
  return {
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: PickCreateCategory;
    }) => Api.Category.Update(payload, id),
  };
}
