import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import styled from "styled-components";

export default function ChatToastComponent({ user, toastProps }) {
  const navigate = useNavigate();

  const transition = useTransition(toastProps.visible, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  const switchToChat = () => {
    const { id } = toastProps;
    console.log(toastProps);
    toast.dismiss(id);
    // navigate("/sign-up");
  };

  const { name, avatar, message } = user;

  return transition(
    (style, item) =>
      item && (
        <Container
          onMouseEnter={null}
          onClick={switchToChat}
          as={animated.div}
          style={style}
        >
          <SenderImg src={avatar} alt="Sender profile pic" />
          <MessageDetails>
            <SenderName>{name}</SenderName>
            <Message>{message}</Message>
          </MessageDetails>
        </Container>
      )
  );
}

const Container = styled.div`
  background: white;
  align-items: center;
  opacity: 0;
  min-width: 220px;
  max-width: 350px;
  display: flex;
  padding: 8px 10px;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 10%), 0 3px 3px rgb(0 0 0 / 5%);
  font-family: "Ubuntu", sans-serif;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(0.96);
  }
`;

const SenderImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`;

const MessageDetails = styled.div`
  margin-left: 0.75rem;
  overflow: hidden;
`;

const SenderName = styled.h5`
  font-size: 0.875rem;
  line-height: 1.15rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Message = styled.p`
  font-size: 0.8rem;
  line-height: 1.05rem;
  margin-top: 0.15rem;
  font-weight: 300;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
