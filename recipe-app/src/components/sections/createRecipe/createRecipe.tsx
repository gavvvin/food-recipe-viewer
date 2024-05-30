import { useFieldArray, useForm } from "react-hook-form";
import { Section } from "../../atoms/wrapper/wrapper";
import { Subtitle, Title } from "../../atoms/text/text";
import { useMutation } from "@apollo/client";
import { CREATE_RECIPE } from "../../utils/queries";
import { useRouter } from "next/router";
import { Button } from "../../atoms/button/button";

// Static diet types, to be fetched from API
const dietTypes = [
  { value: "VEGETARIAN", name: "Vegetarian" },
  { value: "VEGAN", name: "Vegan" },
  { value: "GLUTEN_FREE", name: "Gluten-free" },
  { value: "DIARY_FREE", name: "Diary-free" },
  { value: "HIGH_PROTEIN", name: "High-protein" },
  { value: "LOW_FAT", name: "Low fat" },
  { value: "NUT_FREE", name: "Nut-free" },
  { value: "EGG_FREE", name: "Egg-free" },
];

export const CreateRecipe = () => {
  const router = useRouter();
  const { handleSubmit, register, control } = useForm({});

  // create field array for ingredients and instructions to capture multiple field entries
  const ingredients = useFieldArray({ control, name: "ingredients" });
  const instructions = useFieldArray({ control, name: "instructions" });

  const [createRecipe] = useMutation(CREATE_RECIPE);

  // handle submit forms
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
        alert("Recipe submitted!");
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
        <input type="text" aria-label="title" {...register("title")} required />
      </Section>

      <Section>
        <Subtitle>
          Write a few words about what&apos;s special about this dish.
        </Subtitle>
        <input type="text" aria-label="subtitle" {...register("subtitle")} required />
      </Section>

      <Section>
        <Subtitle>How long does it take in minutes to make this dish?</Subtitle>
        <input type="number" aria-label="time" {...register("cookingTimeInMins")} required />
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

            <Button
              small
              variant="secondary"
              type="button"
              onClick={() => ingredients.remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}

        <Button
          variant="secondary"
          small
          type="button"
          onClick={() => ingredients.append({ name: "", amount: "", unit: "" })}
        >
          Add ingredient
        </Button>
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
            <Button
              variant="secondary"
              small
              type="button"
              onClick={() => instructions.remove(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          small
          type="button"
          onClick={() => instructions.append("")}
        >
          Add step
        </Button>
      </Section>

      <Section>
        <Subtitle>
          Is this recipe suitable for any of these diet types?
        </Subtitle>

        {dietTypes.map((type) => {
          return (
            <>
              <input
                id={type.value}
                type="checkbox"
                {...register("dietTypes.VEGETARIAN")}
              />
              {type.name}
            </>
          );
        })}
      </Section>

      <Button variant="primary" small type="submit">
        Submit recipe
      </Button>
    </form>
  );
};
