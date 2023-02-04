import styled from "styled-components";

import Logo from "./Logo";

export default function SignInUpContainer({ title, children }) {
  return (
    <Container>
      <Logo />
      <Wrapper>
        <Content>
          <Heading>
            <HeadingSplit>Welcome to</HeadingSplit>
            <HeadingSplit>Chat with me_</HeadingSplit>
          </Heading>
          <SubHeading>{title}</SubHeading>
          {children}
        </Content>
      </Wrapper>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Footer = styled.footer`
  height: 40px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.div`
  color: ${(props) => props.theme.txt.highlight};
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`;

const HeadingSplit = styled.h1`
  font-weight: 400;
  font-size: 2.4rem;

  &:nth-child(1) {
    font-size: 1.6rem;
    font-weight: 300;
    color: ${(props) => props.theme.txt.main};
  }

  &:nth-child(1)::after {
    content: " ";
    white-space: pre;
  }
`;

const SubHeading = styled.h2`
  text-align: left;
  font-size: 1.1rem;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 400;
  margin: 18px 0 32px 0;
`;
