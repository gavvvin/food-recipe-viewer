import { useFieldArray, useForm } from "react-hook-form";
import { Section } from "../../atoms/wrapper/wrapper";
import { Subtitle, Title } from "../../atoms/text/text";
import { useMutation } from "@apollo/client";
import { CREATE_RECIPE } from "../../utils/queries";
import { useRouter } from "next/router";

export const CreateRecipe = () => {
  const router = useRouter();
  const { handleSubmit, register, control, reset } = useForm();

  const ingredients = useFieldArray({ control, name: "ingredients" });
  const instructions = useFieldArray({ control, name: "instructions" });

  const [createRecipe] = useMutation(CREATE_RECIPE);

  const submitRecipe = (recipe) => {
    // include only diet types that has been selected
    const selectedDiet = Object.entries(recipe.dietTypes)
      .filter(([_, isSelected]) => isSelected)
      .map(([key, _]) => key);

    const ingredients =
      recipe.ingredients.length > 0 &&
      recipe.ingredients.map((ingredient) => ({
        amount: parseInt(ingredient.amount),
        ingredient: ingredient.ingredient,
        unit: ingredient.unit,
      }));
    const updatedFormData = { ...recipe, dietTypes: selectedDiet, ingredients };

    createRecipe({
      variables: {
        authorId: 1, // hard coded as 1 until login system is implemented
        title: updatedFormData.title,
        subtitle: updatedFormData.subtitle,
        cookingTimeInMins: parseInt(updatedFormData.cookingTimeInMins),
        ingredients: updatedFormData.ingredients,
        instructions: updatedFormData.instructions,
        dietTypes: updatedFormData.dietTypes,
      },
    })
      .then(() => {
        // Return to homepage
        router.push("/");
      })
      .catch((error) => {
        console.error("Error creating recipe:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submitRecipe)}>
      <Title>Create a new recipe</Title>

      <Section>
        <Subtitle>What is this dish?</Subtitle>
        <input type="text" {...register("title")} required />
      </Section>

      <Section>
        <Subtitle>
          Write a few words about what&apos;s special about this dish.
        </Subtitle>
        <input type="text" {...register("subtitle")} required />
      </Section>

      <Section>
        <Subtitle>How long does it take in minutes to make this dish?</Subtitle>
        <input type="number" {...register("cookingTimeInMins")} required />
      </Section>

      <Section>
        <Subtitle>What ingredients do you need?</Subtitle>
        {ingredients.fields.map((item, index) => (
          <div key={item.id}>
            <label>Ingredient:</label>
            <input
              id={`ingredient-${index}`}
              type="text"
              {...register(`ingredients.${index}.ingredient`)}
              required
            />

            <label>Amount:</label>
            <input
              id={`amount-${index}`}
              type="number"
              {...register(`ingredients.${index}.amount`)}
              required
            />

            <label>Unit:</label>
            <input
              id={`unit-${index}`}
              type="text"
              {...register(`ingredients.${index}.unit`)}
              required
            />

            <button type="button" onClick={() => ingredients.remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => ingredients.append({ name: "", amount: "", unit: "" })}
        >
          Add ingredient
        </button>
      </Section>

      <Section>
        <Subtitle>Now, what are the steps of making this dish?</Subtitle>
        {instructions.fields.map((item, index) => (
          <div key={item.id}>
            <label htmlFor={`instruction-${index}`}>Step {index + 1}:</label>
            <textarea
              id={`instruction-${index}`}
              {...register(`instructions.${index}`)}
              required
            />
            <button type="button" onClick={() => instructions.remove(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={() => instructions.append("")}>
          Add step
        </button>
      </Section>

      <Section>
        <Subtitle>
          Is this recipe suitable for any of these diet types?
        </Subtitle>

        <>
          <input
            id="VEGETARIAN"
            type="checkbox"
            {...register("dietTypes.VEGETARIAN")}
          />
          Vegetarian
        </>

        <>
          <input id="VEGAN" type="checkbox" {...register("dietTypes.VEGAN")} />
          Vegan
        </>

        <>
          <input
            id="GLUTEN_FREE"
            type="checkbox"
            {...register("dietTypes.GLUTEN_FREE")}
          />
          Gluten-free
        </>

        <>
          <input
            id="DIARY_FREE"
            type="checkbox"
            {...register("dietTypes.DIARY_FREE")}
          />
          Diary-free
        </>
        <>
          <input
            id="HIGH_PROTEIN"
            type="checkbox"
            {...register("dietTypes.HIGH_PROTEIN")}
          />
          High-protein
        </>
        <>
          <input
            id="LOW_FAT"
            type="checkbox"
            {...register("dietTypes.LOW_FAT")}
          />
          Low fat
        </>
        <>
          <input
            id="NUT_FREE"
            type="checkbox"
            {...register("dietTypes.NUT_FREE")}
          />
          Nut-free
        </>
        <>
          <input
            id="EGG_FREE"
            type="checkbox"
            {...register("dietTypes.EGG_FREE")}
          />
          Egg-free
        </>
      </Section>

      <button type="submit">Submit recipe</button>
    </form>
  );
};
