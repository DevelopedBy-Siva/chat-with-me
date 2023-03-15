import React from "react";
import styled from "styled-components";
import { AiFillWechat } from "react-icons/ai";

export default function ChatLandingScreen() {
  return (
    <Container>
      <AiFillWechatCustom />
      <Descriptions>
        <Title>Hello, Lets Chat</Title>
        <SubHeading>
          What are you doing today?<br></br>Everything is okey?
        </SubHeading>
      </Descriptions>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.bg.app};
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const AiFillWechatCustom = styled(AiFillWechat)`
  font-size: 14rem;
  color: ${(props) => props.theme.txt.main};
  opacity: 0.8;
`;

const Descriptions = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${(props) => props.theme.txt.main};
  text-align: center;
  padding: 12px 0;
  opacity: 0.8;
`;

const SubHeading = styled.h3`
  text-align: center;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.sub};
  line-height: 22px;
`;
