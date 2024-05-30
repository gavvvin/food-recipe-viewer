import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Recipe } from "./recipe";

jest.mock("@apollo/client", () => ({
  useMutation: () => [jest.fn()],
}));

describe("Recipe component", () => {
  const recipe = {
    key: "1",
    recipeId: "1",
    title: "Test Recipe",
    subtitle: "Test Subtitle",
    image: "",
    cookingTimeInMins: 60,
    dietTypes: ["vegan", "gluten_free"],
    isFavorite: false,
  };

  test("Renders Recipe component", () => {
    const { getByText, getByAltText } = render(<Recipe {...recipe} />);

    expect(getByText("Test Recipe")).toBeInTheDocument();
    expect(getByText("Test Subtitle")).toBeInTheDocument();
    expect(getByAltText("Test Recipe")).toHaveAttribute("src");
  });

  test("clicking on the recipe title should call router.push method", () => {
    const { getByText } = render(<Recipe {...recipe} />);
    const title = getByText("Test Recipe");
    fireEvent.click(title);

    // Replace useRouter import with the mock implementation
    const { useRouter } = require("next/router");
    expect(useRouter().push).toHaveBeenCalledWith({
      pathname: "/recipe",
      query: { recipeId: "1" },
    });
  });

  test("clicking on the favorite button should call useMutation", async () => {
    const { getByTestId } = render(<Recipe {...recipe} />);
    const favoriteButton = getByTestId("favorite-button");
    fireEvent.click(favoriteButton);

    // Replace useMutation import with the mock implementation
    const { useMutation } = require("@apollo/client");
    expect(useMutation()[0]).toHaveBeenCalled();
  });

  test("renders diet types correctly", () => {
    const { getByText } = render(<Recipe {...recipe} />);

    expect(getByText("Vegetarian")).toBeInTheDocument();
    expect(getByText("Gluten Free")).toBeInTheDocument();
  });

  test("renders image or no image based on the image prop", () => {
    const { getByAltText, rerender } = render(<Recipe {...recipe} />);

    expect(getByAltText("Test Recipe")).toBeInTheDocument();

    const noImageProps = { ...recipe, image: null };
    rerender(<Recipe {...noImageProps} />);

    // Replace NoImage import with a mock implementation
    const NoImage = require("@carbon/icons-react").NoImage;
    expect(NoImage).toHaveBeenCalled();
  });
});
