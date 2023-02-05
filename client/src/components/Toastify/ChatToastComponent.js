import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function ChatToastComponent({ user, toastId }) {
  const navigate = useNavigate();

  const switchToChat = () => {
    toast.dismiss({ toastId });
    navigate("/sign-up");
  };

  const { name, avatar, message } = user;
  return (
    <Container onClick={switchToChat}>
      <SenderImg src={avatar} alt="Sender profile pic" />
      <MessageDetails>
        <SenderName>{name}</SenderName>
        <Message>{message}</Message>
      </MessageDetails>
    </Container>
  );
}

const Container = styled.div`
  background: white;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
`;

const SenderImg = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageDetails = styled.div`
  margin-left: 0.75rem;
  overflow: hidden;
`;

const SenderName = styled.h5`
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Message = styled.p`
  font-size: 0.68rem;
  line-height: 0.9rem;
  margin-top: 0.15rem;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
