import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CreateRecipe } from "./createRecipe";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// TODO: Mock mutation function in future iterations
jest.mock("@apollo/client", () => ({
  useMutation: () => [jest.fn()],
}));

test("renders the CreateRecipe component", () => {
  render(<CreateRecipe />);

  expect(screen.getByText("Create a new recipe")).toBeInTheDocument();
  expect(screen.getByText("What is this dish?")).toBeInTheDocument();
  expect(
    screen.getByText("Write a few words about what's special about this dish."),
  ).toBeInTheDocument();
  expect(
    screen.getByText("How long does it take in minutes to make this dish?"),
  ).toBeInTheDocument();
  expect(screen.getByText("What ingredients do you need?")).toBeInTheDocument();
  expect(
    screen.getByText("Now, what are the steps of making this dish?"),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Is this recipe suitable for any of these diet types?"),
  ).toBeInTheDocument();
});

test("submits the form with the correct data", async () => {
  const { getByText, getByLabelText, getByTestId } = render(<CreateRecipe />);

  fireEvent.change(getByLabelText("title"), {
    target: { value: "Test Recipe" },
  });
  fireEvent.change(getByLabelText("subtitle"), {
    target: { value: "Test Subtitle" },
  });
  fireEvent.change(getByLabelText("time"), { target: { value: "60" } });

  const submitButton = getByText("Submit recipe");
  fireEvent.click(submitButton);

  // TODO: Replace useMutation import with the mock implementation above
  const { useMutation } = require("@apollo/client");
  expect(useMutation()[0]).toHaveBeenCalled();
});
