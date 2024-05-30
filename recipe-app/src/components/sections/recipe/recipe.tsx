import { useQuery } from "@apollo/client";
import { GET_RECIPE } from "../../utils/queries";
import { Subtitle, TimeText, Title, TitleLg } from "../../atoms/text/text";
import {
  FlexBox,
  ReviewBox,
  Section,
  TimeDisplay,
} from "../../atoms/wrapper/wrapper";
import { StarFilled, Time } from "@carbon/icons-react";
import { convertMinsToHours } from "../../utils/util-functions";
import brandStyle from "../../utils/brand-style.json";
import { ReviewForm } from "../../atoms/reviewForm/reviewForm";

// Recipe details
export const Recipe = ({ recipeId }: { recipeId: string }) => {
  // GraphQL query to fetch recipe data
  const { data } = useQuery(GET_RECIPE, {
    variables: {
      id: recipeId,
    },
  });

  const recipe = data && data.recipe;
  return (
    <>
      {recipe && (
        <>
          <Section>
            <TitleLg>{recipe.title}</TitleLg>
            <Subtitle>{recipe.subtitle}</Subtitle>

            <TimeDisplay>
              <Time />
              <TimeText>
                {convertMinsToHours(recipe.cookingTimeInMins)}
              </TimeText>
            </TimeDisplay>
          </Section>

          <Section>
            <Title>Steps</Title>
            <ol>
              {recipe.instructions?.map((step, index) => (
                <li key={`Step${index}`}>{step}</li>
              ))}
            </ol>
          </Section>

          <Section>
            <Title>Ingredients</Title>
            <ul>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={`Step${index}`}>
                  {ingredient.amount} {ingredient.unit} {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </Section>

          <Section>
            <Title>Reviews</Title>
            {recipe.reviews?.map((review, index) => (
              <ReviewBox key={`review_${index}`}>
                <FlexBox>
                  <Title>{review.author}</Title>
                  <div style={{ marginLeft: "0.5rem" }}>
                    {review.rating}
                    <StarFilled color={brandStyle.orange} />
                  </div>
                </FlexBox>
                <Subtitle>&quot;{review.comment}&quot;</Subtitle>
              </ReviewBox>
            ))}
          </Section>

          <ReviewForm recipeId={recipeId} />
        </>
      )}
    </>
  );
};
