import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Navbar from "../../../components/Home/NavBar";

export default function UserHome() {
  return (
    <Container>
      <Navbar />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
`;
