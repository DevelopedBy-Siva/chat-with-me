import React, { useEffect, useState } from "react";
import styled from "styled-components";

import ContentWrapper from "../ContentWrapper";
import { messages as dummyMessages } from "../../../../assets/dummy_values";
import InputContainer from "../Chat/InputContainer";
import ReceiverInfoContainer from "../Chat/ReceiverInfoContainer";
import ReceiverHeader from "../Chat/ReceiverHeader";
import MessageContainer from "../Chat/MessageContainer";
import { groupByTimestamp, sortByTimestamp } from "../../../../utils/DateTime";

const current_user = "siva";

export default function ChatContainer() {
  const [infoVisible, setInfoVisible] = useState(false);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const response = dummyMessages("duke nukem");
    sortByTimestamp(response);
    const groupedMessages = groupByTimestamp(response);
    setChats(groupedMessages);
  }, []);

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
                {chats.map((itemK, indexK) => (
                  <React.Fragment key={`K-${indexK}`}>
                    {itemK.messages.map((itemM, indexM) => (
                      <MessageContainer
                        index={`${itemK.date}-${indexM}`}
                        timestamp={itemM.timestamp}
                        currentUser={current_user}
                        message={itemM.message}
                        sender={itemM.sender}
                        isSent={true}
                      />
                    ))}
                    <MessageBreak>
                      <BreakTimestamp>{itemK.date}</BreakTimestamp>
                    </MessageBreak>
                  </React.Fragment>
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

const MessageBreak = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin: 14px 0 6px 0;
`;

const BreakTimestamp = styled.span`
  padding: 2px 8px;
  background-color: ${(props) => props.theme.background.app};
  color: ${(props) => props.theme.text.sub};
  border-radius: 4px;
`;
