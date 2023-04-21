import { Suspense, useEffect } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import OneTimeInfo from "../../../components/Home/Info/OneTimeInfo";
import FullPageLoading from "../../../components/Loader/FullPage";
import Navbar from "../../../components/Home/NavBar";
import store from "../../../store";
import { initializeContacts } from "../../../store/reducers/Contacts";
import { SocketProvider } from "../../../context/SocketContext";

export default function UserHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeContacts());
  }, [dispatch]);

  const { oneTimeInfo, details } = useSelector((state) => state.user);

  return (
    <Provider store={store}>
      <SocketProvider id={details._id}>
        <Wrapper className="home-container">
          <Container>
            {oneTimeInfo && <OneTimeInfo />}
            <Navbar />
            <Suspense fallback={<FullPageLoading />}>
              <Outlet />
            </Suspense>
          </Container>
        </Wrapper>
      </SocketProvider>
    </Provider>
  );
}

const Wrapper = styled.div`
  overflow: hidden;
  scroll-behavior: smooth;
`;

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 64px 300px 1fr;
  position: relative;

  @media (max-width: 920px) {
    width: 200%;
    height: 100dvh;
    grid-template-rows: 1fr 52px;
    grid-template-columns: 1fr 1fr;
  }
`;
