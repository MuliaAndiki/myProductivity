export interface ICategory {
  id: string;
  userId: string;
  title: string;
  desc: string;
  avatarCategoryUrl?: string;
}

export type PickCreateCategory = Pick<
  ICategory,
  "title" | "desc" | "avatarCategoryUrl"
>;
export type PickIDCategory = Pick<ICategory, "id">