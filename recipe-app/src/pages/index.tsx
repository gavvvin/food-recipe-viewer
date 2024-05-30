import {
  ContentWrapper,
  PageCanvas,
  SafeAreaWrapper,
} from "../components/atoms/wrapper/wrapper";
import { Header } from "../components/sections/header/header";
import { Recipes } from "../components/sections/recipes/recipes";

export const Homepage = () => {
  return (
    <PageCanvas>
      <Header />
      <ContentWrapper>
        <SafeAreaWrapper>
          <Recipes />
        </SafeAreaWrapper>
      </ContentWrapper>
    </PageCanvas>
  );
};

export default Homepage;
