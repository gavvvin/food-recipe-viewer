// import { RecipeMockData } from "../datasource/recipeMockData";
import { getRecipes } from "../db/connection";

const recipeResolver = {
  Query: {
    recipes: async () => await getRecipes(),
    // getChargePointsByDistance: (
    //   __root: any,
    //   { orderBy }: { orderBy: String },
    // ) => {
    //   if (orderBy === "asc")
    //     ChargePointDataMock.sort(
    //       (a, b) => parseInt(a.distance) - parseInt(b.distance),
    //     );
    //   if (orderBy === "desc")
    //     ChargePointDataMock.sort(
    //       (a, b) => parseInt(b.distance) - parseInt(a.distance),
    //     );

    //   return ChargePointDataMock;
    // },
  },
};

exports.resolver = recipeResolver;
