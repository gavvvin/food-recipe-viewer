import styled from "styled-components";
import { Subtitle, Tag, TimeText, Title } from "../text/text";
import { convertMinsToHours } from "../../utils/util-functions";
import { Time, NoImage, Favorite, FavoriteFilled } from "@carbon/icons-react";
import { CardWrapper, FlexBox, TimeDisplayRight } from "../wrapper/wrapper";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { SET_FAVORITE } from "../../utils/queries";

interface IRecipe extends Recipe {
  key: string;
  isFavorite: boolean;
}

const ImageWrapper = styled.div`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 25vh;
  object-fit: cover;
`;

const NoImageWrapper = styled.div`
  width: 100%;
  height: 25vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  position: relative;
`;

const DietTypes = styled.div`
  margin-top: 2rem;
`;

const FavoriteButton = styled.div`
  margin-left: 1rem;
  cursor: pointer;
`;

// Recipe card component
export const Recipe = ({
  key,
  recipeId,
  title,
  subtitle,
  image,
  cookingTimeInMins,
  dietTypes,
  isFavorite,
}: IRecipe) => {
  const router = useRouter();

  const [setFavorite] = useMutation(SET_FAVORITE);

  const handleFavorite = async () => {
    try {
      const { data, errors } = await setFavorite({
        variables: {
          userId: 1,
          isFavorite: !isFavorite,
          recipeId: recipeId,
        },
      });

      if (errors) throw new Error();

      window.location.reload();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <CardWrapper key={key}>
      <ImageWrapper>
        {image ? (
          <Image src={image} alt={title} />
        ) : (
          <NoImageWrapper>
            <NoImage size={50} />
            <div>No Image</div>
          </NoImageWrapper>
        )}
      </ImageWrapper>
      <CardContent>
        <div>
          <FlexBox>
            <Title
              onClick={() => {
                router.push({
                  pathname: "/recipe",
                  query: {
                    recipeId: recipeId,
                  },
                });
              }}
              style={{ cursor: "pointer" }}
            >
              {title}
            </Title>
            <FavoriteButton onClick={handleFavorite}>
              {isFavorite ? (
                <FavoriteFilled size={25} />
              ) : (
                <Favorite size={25} />
              )}
            </FavoriteButton>
          </FlexBox>
          <Subtitle>{subtitle}</Subtitle>

          <DietTypes>
            {dietTypes?.map((type) => (
              <Tag key="type">{type.replace(/_/g, " ")}</Tag>
            ))}
          </DietTypes>
        </div>

        <TimeDisplayRight>
          <Time />
          <TimeText>{convertMinsToHours(cookingTimeInMins)}</TimeText>
        </TimeDisplayRight>
      </CardContent>
    </CardWrapper>
  );
};
