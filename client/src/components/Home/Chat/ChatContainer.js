import React, { useEffect, useState } from "react";
import styled from "styled-components";

import InputContainer from "./InputContainer";
import ReceiverInfoContainer from "./ReceiverInfoContainer";
import ReceiverHeader from "./ReceiverHeader";
import MessageContainer from "./MessageContainer";
import CHAT_COVER from "../../../assets/images/chat-cover.webp";
import ChatLandingScreen from "./ChatLandingScreen";
import { useSelector } from "react-redux";

export default function ChatContainer() {
  const [infoVisible, setInfoVisible] = useState(false);

  const { active } = useSelector((state) => state.chats);

  useEffect(() => {
    if (!active) return;
  }, [active]);

  return (
    <Container>
      <MessageBoxCover />
      {!active ? (
        <ChatLandingScreen />
      ) : (
        <Wrapper>
          <SubContainer>
            <ChatBox>
              <React.Fragment>
                <ReceiverHeader
                  contactId={active}
                  infoVisible={infoVisible}
                  setInfoVisible={setInfoVisible}
                />
                <MessageBox>
                  <MessageWrapper>
                    {/* ) : (
                  chats.messages.map((itemK, indexK) => (
                    <React.Fragment key={`K-${indexK}`}>
                      {itemK.messages.map((itemM, indexM) => (
                        <MessageContainer
                          index={`${itemK.date}**${indexM}`}
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
                  ))
                )} */}
                  </MessageWrapper>
                </MessageBox>
              </React.Fragment>
            </ChatBox>
            <InputContainer />
          </SubContainer>
          <ReceiverInfoContainer
            infoVisible={infoVisible}
            setInfoVisible={setInfoVisible}
          />
        </Wrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Wrapper = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
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
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MessageBox = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
  position: relative;
  font-size: 32%;
  display: flex;
  flex-direction: column;
  background-size: contain;
`;

const MessageBoxCover = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${CHAT_COVER});
  opacity: 0.4;
  -webkit-filter: invert(${(props) => props.theme.msgBox.bgCover});
  filter: invert(${(props) => props.theme.msgBox.bgCover});
  pointer-events: none;
  z-index: 1;
`;

const MessageWrapper = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column-reverse;
  padding: 1.4rem;

  ::-webkit-scrollbar {
    width: 2px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.bg.app};
    border-radius: 2px;
  }
`;

const MessageBreak = styled.div`
  width: 100%;
  margin: 20px 0 10px 0;
  position: relative;
  opacity: 0.8;
`;

const BreakTimestamp = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => props.theme.txt.main};
  border-radius: 6px;
  font-size: 0.6rem;
  background: ${(props) => props.theme.bg.container};
  z-index: 2;
  padding: 6px 8px;
  opacity: 0.7;
  letter-spacing: 1px;
  font-weight: 400;
`;
