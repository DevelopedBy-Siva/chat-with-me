import React, { Suspense, useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import OneTimeInfo from "../../../components/Home/Info/OneTimeInfo";
import FullPageLoading from "../../../components/Loader/FullPage";
import Navbar from "../../../components/Home/NavBar";
import store from "../../../store";
import { initializeContacts } from "../../../store/reducers/Contacts";
import { SocketProvider, useSocket } from "../../../context/SocketContext";
import toast from "../../../components/Toast";
import AnotherDevice from "../../../components/Home/Info/AnotherDevice";
import { removeIsLoggedIn } from "../../../utils/UserLocal";
import { initialiseChat } from "../../../store/actions/ChatActions";
import { toggle_BW_Chats } from "../../../utils/Screens";

export default function UserHome() {
  const { oneTimeInfo, details } = useSelector((state) => state.user);

  return (
    <Provider store={store}>
      <SocketProvider id={details._id} token={details.token}>
        <RenderHome oneTimeInfo={oneTimeInfo} />
      </SocketProvider>
    </Provider>
  );
}

function RenderHome({ oneTimeInfo }) {
  const [connected, setConnected] = useState(null);

  const dispatch = useDispatch();

  const socket = useSocket();
  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setConnected(true);
      dispatch(initialiseChat());
      toggle_BW_Chats(true);
      dispatch(initializeContacts());
    });

    socket.on("connect_error", (error) => {
      if (error.message === "ERR_FORBIDDEN") {
        removeIsLoggedIn();
        socket.close();
        toast.info(
          "Your session has expired. Please wait while we redirect you to the login page.",
          toast.props.user.persist
        );
        setTimeout(() => {
          window.location = "/";
        }, 4000);
      } else if (error.message === "ERR_DEVICE_ALREADY_CONNECTED")
        setConnected(false);
      else {
        toast.error(
          "Something went wrong. The connection could not be established. Please try reloading the page or try again later",
          toast.props.user.persist
        );
      }
    });
  }, [socket, dispatch]);

  return connected === null ? (
    <FullPageLoading />
  ) : connected === false ? (
    <AnotherDevice />
  ) : (
    <Wrapper className="home-container">
      <Container>
        {oneTimeInfo && <OneTimeInfo />}
        <Navbar />
        <Suspense fallback={<FullPageLoading />}>
          <Outlet />
        </Suspense>
      </Container>
    </Wrapper>
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
