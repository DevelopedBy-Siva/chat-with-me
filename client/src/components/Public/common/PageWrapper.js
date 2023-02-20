import styled from "styled-components";

import Logo from "../../Logo";

export default function PageWrapper({ title, children }) {
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Footer = styled.footer`
  height: 40px;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 540px;
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
  font-weight: 600;
  font-size: 2.5rem;
  font-family: "Shantell Sans", cursive;

  &:nth-child(1) {
    font-size: 1.5rem;
    font-weight: 500;
    color: ${(props) => props.theme.txt.main};
  }

  &:nth-child(1)::after {
    content: " ";
    white-space: pre;
  }

  &:nth-child(2)::before {
    content: "\u003C ";
  }
`;

const SubHeading = styled.h2`
  text-align: left;
  font-size: 1.1rem;
  color: ${(props) => props.theme.txt.main};
  font-weight: 500;
  margin: 18px 0 32px 0;
  font-family: "Shantell Sans", cursive;

  &::before {
    content: "\u003C ";
  }

  &::after {
    content: "\u005F";
  }
`;
