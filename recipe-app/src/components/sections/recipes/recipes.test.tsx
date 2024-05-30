import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Recipes } from "./recipes";

jest.mock("@apollo/client", () => ({
  useQuery: () => ({
    data: {
      recipes: [
        {
          _id: "1",
          author: { userId: "1", name: "Test Author" },
          title: "Test Recipe 1",
          subtitle: "Test Subtitle 1",
          image: "test-image-url-1",
          cookingTimeInMins: 60,
          dietTypes: ["VEGETARIAN", "GLUTEN_FREE"],
        },
        {
          _id: "2",
          author: { userId: "2", name: "Test Author 2" },
          title: "Test Recipe 2",
          subtitle: "Test Subtitle 2",
          image: "test-image-url-2",
          cookingTimeInMins: 45,
          dietTypes: ["VEGAN", "NUT_FREE"],
        },
      ],
      me: {
        favoriteRecipes: [
          {
            _id: "1",
          },
        ],
      },
    },
  }),
}));

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

test("renders the Recipes component", () => {
  render(<Recipes />);

  expect(screen.getByText("Test Recipe 1")).toBeInTheDocument();
  expect(screen.getByText("Test Recipe 2")).toBeInTheDocument();
  expect(screen.getByText("Create Recipe")).toBeInTheDocument();
});

test('filters recipes by "My recipes"', () => {
  render(<Recipes />);

  const selectBox = screen.getByRole("combobox");
  fireEvent.change(selectBox, { target: { value: "myRecipes" } });

  expect(screen.getByText("Test Recipe 1")).toBeInTheDocument();
  expect(screen.queryByText("Test Recipe 2")).not.toBeInTheDocument();
});

test('filters recipes by "Favourite recipes"', () => {
  render(<Recipes />);

  const selectBox = screen.getByRole("combobox");
  fireEvent.change(selectBox, { target: { value: "myFavorites" } });

  expect(screen.getByText("Test Recipe 1")).toBeInTheDocument();
  expect(screen.queryByText("Test Recipe 2")).not.toBeInTheDocument();
});

test('navigates to the create recipe page when the "Create Recipe" button is clicked', () => {
  const { getByText } = render(<Recipes />);

  const createRecipeButton = getByText("Create Recipe");

  fireEvent.click(createRecipeButton);

  const { useRouter } = require("next/router");
  expect(useRouter().push).toHaveBeenCalledWith("/create-recipe");
});
