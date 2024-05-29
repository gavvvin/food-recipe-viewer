type Ingredient = {
  ingredient: string;
  amount: number;
  unit: string;
};

type Recipe = {
  recipeId: string;
  author: string;
  authorId?: string;
  title: string;
  subtitle: string;
  image: string;
  cookingTimeInMins: number;
  ingredients?: Ingredient[];
  instructions?: string[];
  dietTypes: string[];
};
