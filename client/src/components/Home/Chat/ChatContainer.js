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
import {
  getContactNicknameById,
  nicknameValidation,
} from "../../../utils/InputHandler";
import NicknameInput from "./NicknameInput";

export default function ChatContainer() {
  const chatContainerRef = useRef(null);

  const [infoVisible, setInfoVisible] = useState(false);

  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contacts);
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

  function getContactDetails(id) {
    let response = {
      name: null,
      nickname: null,
      avatarId: null,
    };

    if (id === details._id) {
      response.name = details.name;
      response.avatarId = details.avatarId;
      return response;
    }

    const chat = chats[active.val];
    if (!chat || !chat.contactInfos) return response;
    const index = chat.contactInfos.findIndex((i) => i._id === id);
    if (index === -1) return response;

    const found = chat.contactInfos[index];
    const existsLocal = contacts.findIndex((i) => i._id === id);
    if (existsLocal !== -1) response.nickname = contacts[existsLocal].nickname;
    response.name = found.name;
    response.avatarId = found.avatarId;
    return response;
  }

  function isBlocked() {
    const chat = chats[active.val];
    if (chat && chat.blockedBy && chat.blockedBy.length > 0) {
      const blockedBy = chat.blockedBy;
      let msg;
      if (details.mail === blockedBy || blockedBy === "both")
        msg = "You have blocked the user. Please unblock to continue.";
      else
        msg =
          "Sorry, you have been blocked by the user. Cannot chat right now.";
      return {
        msg,
        status: true,
      };
    }
    return {
      msg: undefined,
      status: false,
    };
  }

  function showInContactInfo() {
    const index = contacts.findIndex((i) => i.chatId === active.val);
    if (index === -1) return false;
    const inContact = contacts[index].inContact;
    if (inContact) return false;
    return true;
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
                  <AdditionalInfos
                    showInfo={showInContactInfo()}
                    isBlocked={isBlocked()}
                    contacts={contacts}
                    active={active}
                  />
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
                                createdAt={msg.createdAt}
                                contactInfo={getContactDetails(msg.sendBy)}
                                isPrivate={active.isPrivate}
                                nickname={getContactNicknameById(
                                  contacts,
                                  msg.sendBy
                                )}
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
              isBlocked={isBlocked().status}
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

function AdditionalInfos({ showInfo, isBlocked, contacts = [], active = {} }) {
  return (
    <AdditionalInfoBox>
      {showInfo && <AddContactInfo contacts={contacts} active={active} />}
      {isBlocked.status && <IsBlockedMessage>{isBlocked.msg}</IsBlockedMessage>}
    </AdditionalInfoBox>
  );
}

function AddContactInfo({ contacts, active }) {
  const [changeNickname, setChangeNickname] = useState({
    val: "",
    show: false,
    error: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  function handleNicknameModal(show = false) {
    if (isLoading) return;
    setChangeNickname({ ...changeNickname, show });
  }

  function handleNicknameChange(e) {
    const value = e.target.value;
    const { message } = nicknameValidation(value, contacts);
    setChangeNickname({ ...changeNickname, val: value, error: message });
  }

  function getContactInfo() {
    const index = contacts.findIndex((i) => i.chatId === active.val);
    if (index === -1) return { name: "unknown", email: "unknown" };
    return {
      email: contacts[index].email,
      name: contacts[index].name,
    };
  }

  const info = getContactInfo();

  return (
    <React.Fragment>
      <AddThisContact>
        <AddThisContactInfo>
          This user is not in your contacts.
        </AddThisContactInfo>
        <AddThisContactBtn onClick={() => handleNicknameModal(true)}>
          Add to contact?
        </AddThisContactBtn>
      </AddThisContact>
      {changeNickname.show && (
        <NicknameInput
          isLoading={isLoading}
          nickname=""
          handleNicknameModal={handleNicknameModal}
          name={info.name}
          handleNicknameChange={handleNicknameChange}
          error={changeNickname.error}
          title="Create nickname"
          btnLabel="Create"
          changeNickname={changeNickname}
          setChangeNickname={setChangeNickname}
          email={info.email}
          setIsLoading={setIsLoading}
        />
      )}
    </React.Fragment>
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

const AdditionalInfoBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 99;
`;

const IsBlockedMessage = styled.p`
  text-align: center;
  background: ${(props) => props.theme.bg.container};
  color: ${(props) => props.theme.txt.main};
  font-size: 0.7rem;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.bg.app};
  border-bottom: 0;
  border-top: 0;
  font-weight: 400;
`;

const AddThisContact = styled.div`
  display: flex;
  background: #085ed4;
  padding: 8px;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid ${(props) => props.theme.bg.app};
  border-bottom: 0;
  border-top: 0;
`;

const AddThisContactInfo = styled.p`
  font-size: 0.7rem;
  color: #fff;
  font-weight: 400;
`;

const AddThisContactBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 0.7rem;
  color: #fff;
  border-bottom: 0.5px solid #fff;
  margin-left: 5px;
  font-weight: 400;
  cursor: pointer;
`;
