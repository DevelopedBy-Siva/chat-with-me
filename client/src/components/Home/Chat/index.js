import React from "react";
import styled from "styled-components";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";
import { Outlet } from "react-router-dom";

export default function Chat() {
  return (
    <Container>
      <Outlet />
      <SideBar />
      <ChatContainer />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
`;
