import { useForm } from "react-hook-form";
import { Subtitle, Title } from "../text/text";
import { RATE_RECIPE } from "../../utils/queries";
import { useMutation } from "@apollo/client";

type Review = {
  name: string;
  comment: string;
  rating: string;
};

export const ReviewForm = ({ recipeId }: { recipeId: string }) => {
  const { handleSubmit, register } = useForm<Review>();

  const [rateRecipe] = useMutation(RATE_RECIPE);

  // Prepare data to submit review
  const onSubmit = async (e) => {
    if (!recipeId) {
      alert("Missing recipe ID");
      return;
    }

    const { name, comment, rating } = e;

    if (!name || !comment || !rating) {
      alert("Please complete all the fields.");
      return;
    }

    try {
      const { data } = await rateRecipe({
        variables: {
          id: recipeId,
          author: name,
          rating: parseInt(rating),
          comment: comment,
        },
      });

      console.log(data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title>Add your review</Title>
      <>
        <Subtitle>Comment</Subtitle>
        <textarea {...register("comment")} />
      </>
      <>
        <Subtitle>Rating</Subtitle>
        0<input type="range" min="0" max="5" {...register("rating")} />5
      </>

      <>
        <Subtitle>Your name</Subtitle>
        <input type="text" {...register("name")} />
      </>
      <input type="submit" />
    </form>
  );
};
