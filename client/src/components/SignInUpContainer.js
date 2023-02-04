import styled from "styled-components";

export default function SignInUpContainer({ title, children }) {
  return (
    <Container>
      <Wrapper>
        <Heading>Welcome to Chat with me</Heading>
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
  max-width: 520px;
  display: flex;
  flex-direction: column;
`;

const Heading = styled.h1`
  color: ${(props) => props.theme.txt.main};
  text-align: left;
  font-weight: 400;
  font-size: 2.4rem;
`;

const SubHeading = styled.h2`
  text-align: left;
  font-size: 1rem;
  color: ${(props) => props.theme.txt.sub};
  font-weight: 300;
  margin: 12px 0 32px 0;
`;
