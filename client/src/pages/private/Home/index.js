import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Navbar from "../../../components/Home/NavBar";
import store from "../../../store";

export default function UserHome() {
  return (
    <Provider store={store}>
      <Container>
        <Navbar />
        <Outlet />
      </Container>
    </Provider>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
`;
