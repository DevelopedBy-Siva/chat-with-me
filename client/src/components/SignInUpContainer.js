import styled from "styled-components";

export default function SignInUpContainer({ title, children }) {
  return (
    <Container>
      <Wrapper>
        <Heading>
          <HeadingSplit>Welcome to</HeadingSplit>
          <HeadingSplit>Chat with me_</HeadingSplit>
        </Heading>
        <SubHeading>{title}</SubHeading>
        {children}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
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
    color: ${(props) => props.theme.txt.main};
  }

  &:nth-child(1)::after {
    content: " ";
    white-space: pre;
  }
`;

const SubHeading = styled.h2`
  text-align: left;
  font-size: 1rem;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 300;
  margin: 15px 0 32px 0;
`;
