import { useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import Navbar from "../../../components/Home/NavBar";
import store from "../../../store";
import { initializeContacts } from "../../../store/reducers/Contacts";

export default function UserHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeContacts());
  }, [dispatch]);

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
  height: 100dvh;
  overflow: hidden;
  display: flex;

  @media (max-width: 920px) {
    flex-direction: column-reverse;
  }
`;
