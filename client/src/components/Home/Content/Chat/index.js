import React from "react";
import styled from "styled-components";

import SideBar from "../Chat/SideBarContainer";
import ChatContainer from "../Chat/ChatContainer";

export default function Chat() {
  return (
    <Container>
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
