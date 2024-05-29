import { useRouter } from "next/router";
import {
    ContentWrapper,
    PageCanvas,
    SafeAreaWrapper,
  } from "../../components/atoms/wrapper/wrapper";
  import { Header } from "../../components/sections/header/header";
import { Recipe } from "../../components/sections/recipe/recipe";
  
  export const RecipePage = () => {
    const router = useRouter()
    const {recipeId} = router.query
    return (
      <PageCanvas>
        <Header />
        <ContentWrapper>
          <SafeAreaWrapper>
            <Recipe recipeId={recipeId.toString()}/>
          </SafeAreaWrapper>
        </ContentWrapper>
      </PageCanvas>
    );
  };
  
  export default RecipePage;
  