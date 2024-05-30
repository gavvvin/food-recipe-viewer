import { useRouter } from "next/router";
import {
  ContentWrapper,
  PageCanvas,
  SafeAreaWrapper,
} from "../../components/atoms/wrapper/wrapper";
import { Header } from "../../components/sections/header/header";
import { CreateRecipe } from "../../components/sections/createRecipe/createRecipe";

export const CreateRecipePage = () => {
  const router = useRouter();
  return (
    <PageCanvas>
      <Header />
      <ContentWrapper>
        <SafeAreaWrapper>
          <CreateRecipe />
        </SafeAreaWrapper>
      </ContentWrapper>
    </PageCanvas>
  );
};

export default CreateRecipePage;
