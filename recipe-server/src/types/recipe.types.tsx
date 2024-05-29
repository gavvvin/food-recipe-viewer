type Ingredient = {
  ingredient: String;
  amount: Number;
  unit: String;
};

export type Review = {
  id?: string;
  author: string;
  rating: number;
  comment: string;
};

enum DietType {
  VEGETARIAN,
  VEGAN,
  GLUTEN_FREE,
  DIARY_FREE,
  HIGH_PROTEIN,
  LOW_FAT,
  NUT_FREE,
  EGG_FREE,
}

export type Recipe = {
  author?: String;
  authorId: string;
  title: String;
  subtitle: String;
  image?: String;
  cookingTimeInMins: Number;
  ingredients: Ingredient[];
  instructions: String[];
  dietTypes: DietType[];
  reviews?: Review[];
};

export type ReviewInput = {
  review: Review & {
    id: string;
  };
};
