import React, { useState } from "react";
import styled from "styled-components";

import ContentWrapper from "../ContentWrapper";
import { contacts } from "../../../../assets/dummy_values";
import InputContainer from "../Chat/InputContainer";
import ReceiverInfoContainer from "../Chat/ReceiverInfoContainer";
import ReceiverHeader from "../Chat/ReceiverHeader";
import MessageContainer from "../Chat/MessageContainer";

const current_user = "siva";

export default function ChatContainer() {
  const [infoVisible, setInfoVisible] = useState(false);

  return (
    <ContentWrapper>
      <Container>
        <SubContainer>
          <ChatBox>
            <ReceiverHeader
              infoVisible={infoVisible}
              setInfoVisible={setInfoVisible}
            />
            <MessageBox>
              <MessageWrapper>
                {contacts.map((item, index) => (
                  <MessageContainer
                    index={index}
                    timestamp="12:08pm"
                    currentUser={current_user}
                    message={item.message}
                    sender={item.sender}
                    isSent={true}
                  />
                ))}
              </MessageWrapper>
            </MessageBox>
          </ChatBox>
          <InputContainer />
        </SubContainer>
        <ReceiverInfoContainer
          infoVisible={infoVisible}
          setInfoVisible={setInfoVisible}
        />
      </Container>
    </ContentWrapper>
  );
}

const Container = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  background-color: ${(props) => props.theme.background.container};
`;

const SubContainer = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`;

const ChatBox = styled.div`
  flex: 1;
  min-height: 0;
  border-top: 1px solid ${(props) => props.theme.background.app};
  display: flex;
  flex-direction: column;
`;

const MessageBox = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  position: relative;
  font-size: 32%;
  display: flex;
  flex-direction: column;
`;

const MessageWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  padding: 1.4rem;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.background.app};
    border-radius: 6px;
  }
`;
