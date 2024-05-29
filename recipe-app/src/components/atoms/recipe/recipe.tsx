import styled from "styled-components";
import { Caption, Subtitle, Tag, Title } from "../text/text";
import { convertMinsToHours } from "../../utils/util-functions";
import { Time, NoImage } from "@carbon/icons-react";
import { CardWrapper, TimeDisplay } from "../wrapper/wrapper";
import { useRouter } from "next/router";

interface IRecipe extends Recipe {
  key: string;
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

const TimeText = styled(Caption)`
  margin-left: 0.25rem;
`;

const DietTypes = styled.div`
  margin-top: 2rem;
`;

export const Recipe = ({
  key,
  recipeId,
  title,
  subtitle,
  image,
  cookingTimeInMins,
  dietTypes,
}: IRecipe) => {
  const router = useRouter();
  return (
    <CardWrapper
      key={key}
      onClick={() => {
        router.push({
          pathname: "/recipe",
          query: {
            recipeId: recipeId,
          },
        });
      }}
    >
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
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>

          <DietTypes>
            {dietTypes?.map((type) => (
              <Tag key="type">{type.replace(/_/g, " ")}</Tag>
            ))}
          </DietTypes>
        </div>

        <TimeDisplay>
          <Time />
          <TimeText>{convertMinsToHours(cookingTimeInMins)}</TimeText>
        </TimeDisplay>
      </CardContent>
    </CardWrapper>
  );
};
