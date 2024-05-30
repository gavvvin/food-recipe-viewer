import styled from "styled-components";
import brandStyle from "../../utils/brand-style.json";

type ButtonProps = {
  variant: string;
  small?: boolean;
};

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.variant === "primary" ? brandStyle.blue : brandStyle.grey};
  color: ${(props) =>
    props.variant === "primary" ? brandStyle.white : "black"};
  padding: ${(props) => (props.small ? "0.5rem 0.75rem" : "1rem 1.5rem")};
  font-size: ${(props) => (props.small ? "0.75rem" : "1rem")};
  border: 0;
  border-radius: 1.5rem;
  cursor: pointer;
`;
