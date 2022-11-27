import styled from "styled-components";

export default function SignInUpContainer({ children }) {
  return (
    <Container>
      <LeftContainer></LeftContainer>

      <RightContainer>
        <Wrapper>{children}</Wrapper>
      </RightContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  font-family: "Ubuntu", sans-serif;
`;

const LeftContainer = styled.div`
  width: 100%;
  max-width: 700px;
  height: 100%;
  padding: 0.8rem;
  background-image: linear-gradient(to right, #8e2de2, #4a00e0);

  @media (max-width: 728px) {
    position: fixed;
    padding: 0;
    height: 22vh;
    width: 100%;
    max-width: 100%;
    z-index: -1;
  }
`;

const RightContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 728px) {
    background: white;
    width: 92%;
    max-width: 500px;
    height: fit-content;
    height: -moz-fit-content;
    max-height: 84%;
    display: block;
    overflow-y: auto;
    margin: 12vh auto 0 auto;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-height: 100%;
  padding: 0.8rem;
  overflow-y: auto;
`;
