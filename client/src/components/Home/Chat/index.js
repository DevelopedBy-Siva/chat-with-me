import React, { Suspense, useRef } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";
import LoadingBar from "../../Loader/LoadingBar";

export default function Chat() {
  const msgBoxRef = useRef(null);

  return (
    <Container>
      <Suspense fallback={<LoadingBar />}>
        <Outlet />
      </Suspense>
      <SideBar msgBoxRef={msgBoxRef} />
      <ChatContainer msgBoxRef={msgBoxRef} />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
`;
