import styled from "styled-components";
import { FaCaretRight } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { dummyMessages } from "../DummyValues/DummyValues";

function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    setMessages(dummyMessages);
  }, []);

  useEffect(() => {
    const { scrollHeight } = chatBoxRef.current;
    chatBoxRef.current.scrollTop = scrollHeight;
  }, [messages]);

  const handleNewMessages = () => {
    const val = inputRef.current.value;
    if (!val && val.length <= 0) return;
    const newMessages = [...messages, { user: true, message: val }];
    inputRef.current.value = "";
    setMessages(newMessages);
  };

  return (
    <Container>
      <ReceiverHeader>Siva</ReceiverHeader>
      <ChatBox ref={chatBoxRef}>
        {messages.map(({ user, message }, index) =>
          user ? (
            <SenderContainer key={index}>
              <Sender>{message}</Sender>
            </SenderContainer>
          ) : (
            <ReceiverContainer key={index}>
              <Receiver>{message}</Receiver>
            </ReceiverContainer>
          )
        )}
      </ChatBox>
      <MessageBox>
        <InputBox
          ref={inputRef}
          placeholder="Enter the message here"
          maxLength={600}
          spellCheck="false"
        />
        <SendButton onClick={handleNewMessages}>
          <FaCaretRightCustom />
        </SendButton>
      </MessageBox>
    </Container>
  );
}

export default ChatContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
`;

const ReceiverHeader = styled.div`
  width: 100%;
  height: 50px;
  background-color: #434343;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #434343;
  padding: 0 0.6rem;
`;

const InputBox = styled.textarea`
  width: 100%;
  height: 70%;
  border-radius: 8px;
  outline: none;
  border: none;
  font-size: 15px;
  padding: 8px;
  background: #5b5b5b;
  margin-right: 10px;
  color: white;
  font-weight: lighter;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
`;

const SendButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.6em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  color: #434343;
`;

const FaCaretRightCustom = styled(FaCaretRight)`
  margin-left: 3px;
  pointer-events: none;
`;

const ChatBox = styled.div`
  width: 100%;
  min-width: 300px;
  background-color: #bbbbbb;
  overflow: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 0.9rem;
  line-height: 1.2rem;
`;

const SenderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0.5rem 1rem;
`;

const Sender = styled.div`
  background-color: white;
  max-width: 45%;
  border-radius: 4px;
  padding: 1rem;
`;

const ReceiverContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.5rem 1rem;
`;

const Receiver = styled.div`
  background-color: #5b5b5b;
  max-width: 45%;
  border-radius: 4px;
  padding: 1rem;
  color: white;
`;
