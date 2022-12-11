import styled from "styled-components";
import notfound from "../assets/images/404.webp";

function NotFound() {
  return (
    <Container>
      <Image src={notfound} />
      <ErrorMessage>Page Not Found</ErrorMessage>
    </Container>
  );
}

export default NotFound;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.img`
  object-fit: contain;
  max-width: 400px;
  filter: grayscale(100%);
  user-select: none;
`;

const ErrorMessage = styled.h4`
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 120%;
  letter-spacing: 5px;
  color: #5b5b5b;
`;
