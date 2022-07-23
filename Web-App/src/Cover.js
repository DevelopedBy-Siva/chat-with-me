import styled from "styled-components";

function Cover({ children, handleVisiblity }) {
  const closeView = () => {
    handleVisiblity(false);
  };

  return (
    <Container>
      {children}
      <Wrapper onClick={closeView} />
    </Container>
  );
}

export default Cover;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: none;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  background-color: rgba(149, 149, 149, 0.5);
`;
