import styled from "styled-components";
import brandStyle from "../../utils/brand-style.json";

export const PageCanvas = styled.div`
  background-color: ${brandStyle.bgGrey};
  min-height: 100%;
  height: auto !important;
  height: 100%;
`;

export const SafeAreaWrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  @media (max-width: 1440px) {
    margin: 0 0.5rem;
  }
`;

export const ContentWrapper = styled.div`
  padding-top: 7rem;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const CardWrapper = styled.div`
  height: 100%;
  width: 100%;
  border: 2px solid ${brandStyle.lightGrey};
  background-color: ${brandStyle.white};
  border-radius: 0.25rem;
  cursor: pointer;
`;

export const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 2.5rem;
  top: 2.75rem;
`;
