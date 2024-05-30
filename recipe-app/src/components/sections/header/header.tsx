import Image from "next/image";
import FordLogo from "../../../../public/ford-logo.png";
import styled from "styled-components";
import { SafeAreaWrapper } from "../../atoms/wrapper/wrapper";
import { BrandTitle } from "../../atoms/text/text";
import Link from "next/link";

const Banner = styled.div`
  height: 5rem;
  width: 100%;
  z-index: 99;
  background-color: #fff;
  box-shadow: 0px 0.5px 14px 0px #cacaca;
  position: fixed;
  top: 0;
  margin: 0 0 2rem -0.5rem;
  padding: 0.5rem 0rem;
  text-align: left;
`;

const Content = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  margin-right: 3rem;
`;

const AppTitle = styled(BrandTitle)`
  margin-left: 3rem;
`;

export const Header = () => {
  return (
    <Banner>
      <SafeAreaWrapper>
        <Content>
          <Link href="/">
            <Image
              src={FordLogo}
              alt="Ford logo"
              layout="intrinsic"
              height={50}
            />
          </Link>
          <AppTitle>FoodieHub</AppTitle>
        </Content>
      </SafeAreaWrapper>
    </Banner>
  );
};
