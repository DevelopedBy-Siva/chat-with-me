import React, { Suspense } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";
import LoadingBar from "../../Loader/LoadingBar";

export default function Chat() {
  return (
    <Container>
      <Suspense fallback={<LoadingBar />}>
        <Outlet />
      </Suspense>
      <SideBar />
      <ChatContainer />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;

  @media (max-width: 920px) {
    width: 100%;
    min-height: 0;
    flex-direction: row;
    flex-shrink: 0;
  }
`;
