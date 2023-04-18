import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import InputContainer from "./InputContainer";
import ReceiverInfoContainer from "./ReceiverInfoContainer";
import ReceiverHeader from "./ReceiverHeader";
import MessageContainer from "./MessageContainer";
import CHAT_COVER from "../../../assets/images/chat-cover.webp";
import ChatLandingScreen from "./ChatLandingScreen";
import LoadingSpinner from "../../Loader";
import { fetchChats } from "../../../store/reducers/Chats";
import { isTodayOrYesterday, sortDatesDesc } from "../../../utils/DateTime";

export default function ChatContainer() {
  const chatContainerRef = useRef(null);

  const [infoVisible, setInfoVisible] = useState(false);
  const dispatch = useDispatch();
  const { active, loading, error, chats } = useSelector((state) => state.chats);
  const { details } = useSelector((state) => state.user);

  useEffect(() => {
    if (!active.val) return;

    if (chatContainerRef)
      chatContainerRef.current.scrollTop = chatContainerRef.scrollHeight;
    dispatch(fetchChats(active.val));
  }, [active, dispatch]);

  function getChats() {
    const userChats = chats[active.val];
    if (!userChats || !userChats.messages) return { keys: [], messages: {} };
    const messages = userChats.messages;
    const keys = sortDatesDesc(Object.keys(messages));
    return { keys, messages };
  }

  return (
    <Container>
      <MessageBoxCover />
      {!active.val ? (
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
                  {loading && (
                    <LoadingSpinner
                      style={{
                        top: "40px",
                        opacity: 0.8,
                      }}
                    />
                  )}
                  <MessageWrapper ref={chatContainerRef}>
                    {!error &&
                      getChats().keys.map((tmstp, c_index) => {
                        const msgs = getChats().messages[tmstp];
                        if (!msgs || msgs.length === 0) return "";
                        return (
                          <React.Fragment key={c_index}>
                            {msgs.map((msg, index) => (
                              <MessageContainer
                                key={index}
                                currentUser={details._id}
                                message={msg.message}
                                sender={msg.sendBy}
                                isSent={msg.isSent}
                                receiverId={active}
                                createdAt={msg.createdAt}
                              />
                            ))}
                            <MessageBreak>
                              <BreakTimestamp>
                                {isTodayOrYesterday(tmstp)}
                              </BreakTimestamp>
                            </MessageBreak>
                          </React.Fragment>
                        );
                      })}
                  </MessageWrapper>
                </MessageBox>
              </React.Fragment>
            </ChatBox>
            <InputContainer
              isPrivate={active.isPrivate}
              chatContainerRef={chatContainerRef}
            />
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
  grid-row-start: 1;
  grid-column-start: 3;
  grid-row-end: 2;
  grid-column-end: 4;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 0;

  @media (max-width: 920px) {
    grid-row-start: 1;
    grid-column-start: 2;
    grid-row-end: 3;
    grid-column-end: 3;
  }
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
  object-fit: cover;
  opacity: 0.4;
  -webkit-filter: invert(${(props) => props.theme.msgBox.bgCover});
  filter: invert(${(props) => props.theme.msgBox.bgCover});
  transform: translateZ(0);
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
  position: relative;
  z-index: 9;

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
  opacity: 0.8;
  letter-spacing: 1px;
  font-weight: 400;
  min-width: 70px;
  text-align: center;
`;
