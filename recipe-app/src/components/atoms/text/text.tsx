import styled from "styled-components";
import brandStyle from "../../utils/brand-style.json";

export const BrandTitle = styled.div`
  font-size: 2rem;
  font-weight: 200;
  color: ${brandStyle.blue};
  user-select: none;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  color: ${brandStyle.blue};
  font-weight: 500;
  margin: 0.5rem 0;
`;

export const TitleLg = styled(Title)`
  font-size: 2.5rem;
`;

export const Subtitle = styled.div`
  font-size: 1rem;
  color: ${brandStyle.darkGrey};
  font-weight: 400;
`;

export const Body = styled.div``;

export const Caption = styled.div`
    color: ${brandStyle.darkGrey}
    font-weight: 300;
`;

export const Tag = styled.div`
  padding: 0.4rem 0.75rem;
  background-color: ${brandStyle.blue};
  color: white;
  display: inline-block;
  border-radius: 1rem;
  margin: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2rem;
`;

export const TimeText = styled(Caption)`
  margin-left: 0.25rem;
`;
