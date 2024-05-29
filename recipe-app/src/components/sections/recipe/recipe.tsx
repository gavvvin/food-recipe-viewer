import { useQuery } from "@apollo/client"
import { GET_RECIPE } from "../../utils/queries"

export const Recipe = ({recipeId}: {recipeId: string}) => {

    const recipe = useQuery(GET_RECIPE, {
        variables: {
          id: recipeId,
        },
      });

      console.log(recipe)

    return (<>{recipeId}</>)
}