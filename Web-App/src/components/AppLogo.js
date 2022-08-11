import styled from "styled-components";
import svg from "../svgs/logo.svg";

export default function AppLogo({
  top = "none",
  right = "none",
  left = "none",
  bottom = "none",
  width = "30px",
}) {
  return (
    <Container
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      width={width}
    >
      <Logo src={svg} />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: ${({ top }) => top};
  right: ${({ right }) => right};
  left: ${({ left }) => left};
  bottom: ${({ bottom }) => bottom};
  width: ${({ width }) => width};
  display: none;

  @media (max-width: 728px) {
    display: block;
  }
`;

const Logo = styled.img`
  width: 100%;
`;
