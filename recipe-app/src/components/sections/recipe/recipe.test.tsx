import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Recipe } from "./recipe";

jest.mock("@apollo/client", () => ({
  useQuery: () => ({
    data: {
      recipe: {
        title: "Test Recipe",
        subtitle: "Test Subtitle",
        cookingTimeInMins: 60,
        instructions: ["Step 1", "Step 2"],
        ingredients: [
          { amount: 1, unit: "cup", ingredient: "flour" },
          { amount: 2, unit: "tbsp", ingredient: "sugar" },
        ],
        reviews: [{ author: "Test User", rating: 4, comment: "Great recipe!" }],
      },
    },
  }),
}));

const mockRecipeId = "1";

test("renders the Recipe component with the required recipeId prop", () => {
  render(<Recipe recipeId={mockRecipeId} />);

  expect(screen.getByText("Test Recipe")).toBeInTheDocument();
  expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  expect(screen.getByText("Steps")).toBeInTheDocument();
  expect(screen.getByText("Step 1")).toBeInTheDocument();
  expect(screen.getByText("Step 2")).toBeInTheDocument();
  expect(screen.getByText("Ingredients")).toBeInTheDocument();
  expect(screen.getByText("1 cup flour")).toBeInTheDocument();
  expect(screen.getByText("2 tbsp sugar")).toBeInTheDocument();
  expect(screen.getByText("Reviews")).toBeInTheDocument();
  expect(screen.getByText("Test User")).toBeInTheDocument();
  expect(screen.getByText("Great recipe!")).toBeInTheDocument();
});
