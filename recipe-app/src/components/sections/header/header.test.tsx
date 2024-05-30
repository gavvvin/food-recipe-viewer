import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Header } from "./header";

test("renders the Header component", () => {
  render(<Header />);

  expect(screen.getByAltText("Ford logo")).toBeInTheDocument();
  expect(screen.getByText("FoodieHub")).toBeInTheDocument();
});

test("navigates to the homepage when the logo is clicked", () => {
  const { getByAltText } = render(<Header />);

  const logo = getByAltText("Ford logo");

  fireEvent.click(logo);

  const { useRouter } = require("next/router");
  expect(useRouter().push).toHaveBeenCalledWith("/");
});
