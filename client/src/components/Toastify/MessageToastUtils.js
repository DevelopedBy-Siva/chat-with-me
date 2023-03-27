import styled from "styled-components";
import { toast } from "react-toastify";

import { getAvatar } from "../../assets/avatars";

export const MESSAGE_TOAST_LIMIT = 3;
export const MESSAGE_TOAST_CONTAINER_ID = "message-toast-container";
export const MESSAGE_TOAST_ID = "message-toast-id";

const defaultProps = {
  containerId: MESSAGE_TOAST_CONTAINER_ID,
};

export const notify = (message, avatarId, sendBy, props = {}) =>
  toast(
    <MessageContainer message={message} sendBy={sendBy} avatarId={avatarId} />,
    {
      ...defaultProps,
      ...props,
    }
  );

function MessageContainer({ message = "...", avatarId, sendBy = "unknown" }) {
  return (
    <Container>
      <ImageContainer>
        <Img src={getAvatar(avatarId)} />
      </ImageContainer>
      <Details>
        <From>{sendBy}</From>
        <Msg>{message}</Msg>
      </Details>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

const ImageContainer = styled.span`
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  flex-shrink: 0;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  margin-left: 15px;
  overflow: hidden;
  flex: 1;
`;

const From = styled.span`
  display: block;
  width: 100%;
  text-transform: capitalize;
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.theme.toast.txtBold};
`;

const Msg = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
  font-size: 0.7rem;
  margin-top: 6px;
  color: #989898;
  line-height: 16px;
  color: ${(props) => props.theme.toast.default};
`;
