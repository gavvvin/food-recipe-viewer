import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ReviewForm } from "./reviewForm";

jest.mock("@apollo/client", () => ({
  useMutation: () => [jest.fn()],
}));

const mockRecipeId = "1";

test("renders the ReviewForm component with the required recipeId prop", () => {
  render(<ReviewForm recipeId={mockRecipeId} />);

  expect(screen.getByText("Add your review")).toBeInTheDocument();
  expect(screen.getByText("Comment")).toBeInTheDocument();
  expect(screen.getByText("Rating")).toBeInTheDocument();
  expect(screen.getByText("Your name")).toBeInTheDocument();
});

test("submits the form with the correct data", async () => {
  const { getByText, getByLabelText } = render(
    <ReviewForm recipeId={mockRecipeId} />,
  );

  fireEvent.change(getByLabelText("comment"), {
    target: { value: "Test comment" },
  });
  fireEvent.change(getByLabelText("rating"), { target: { value: "4" } });
  fireEvent.change(getByLabelText("name"), { target: { value: "Test User" } });

  const submitButton = getByText("Submit");
  fireEvent.click(submitButton);

  // Replace useMutation import with the mock implementation
  const { useMutation } = require("@apollo/client");
  expect(useMutation()[0]).toHaveBeenCalledWith({
    variables: {
      id: mockRecipeId,
      author: "Test User",
      rating: 4,
      comment: "Test comment",
    },
  });
});
