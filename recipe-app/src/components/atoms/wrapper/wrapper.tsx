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
`;

export const TimeDisplay = styled.div`
  display: flex;
  align-items: center;
`;

export const TimeDisplayRight = styled(TimeDisplay)`
  position: absolute;
  right: 2.5rem;
  top: 2.75rem;
`;

export const Section = styled.div`
  margin: 2rem 0;
  max-width: 75%;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const ReviewBox = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: ${brandStyle.white};
  margin: 1rem 0;
  border: 2px solid ${brandStyle.lightGrey};
`;

export const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;
