import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import Modal from "../Modal/SubModal";
import axios from "../../../api/axios";
import retrieveError from "../../../api/ExceptionHandler";
import toast from "../../Toast";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import LoadingSpinner from "../../Loader";
import { changeContactNickname } from "../../../store/actions/ContactActions";

const nicknameModalStyle = {
  maxWidth: "420px",
  maxHeight: "234px",
};
export default function NicknameInput({
  name,
  isLoading,
  handleNicknameModal,
  nickname,
  handleNicknameChange,
  error,
  title,
  changeNickname,
  setChangeNickname,
  setIsLoading,
  email,
  btnLabel = "Change",
}) {
  const dispatch = useDispatch();

  async function updateNickname() {
    if (isLoading || changeNickname.error) return;

    const newNickname = changeNickname.val.toLowerCase();
    if (newNickname === nickname)
      return setChangeNickname({ ...changeNickname, show: false });

    setIsLoading(true);
    await axios
      .put(`/user/contact/nickname?email=${email}&nickname=${newNickname}`)
      .then(() => {
        setChangeNickname({ ...changeNickname, show: false });
        dispatch(changeContactNickname({ email, nickname: newNickname }));
        toast.success("Nickname updated successfully");
      })
      .catch((error) => {
        const { message } = retrieveError(error);
        toast.error(message, toast.props.user.nonPersist);
      });
    setIsLoading(false);
  }

  return (
    <Modal
      inactive={isLoading}
      style={nicknameModalStyle}
      close={handleNicknameModal}
    >
      <ChangeNicknameModalContainer>
        <ModalHeaderWrapper>{title}</ModalHeaderWrapper>
        <ChangeNicknamModalWrapper>
          <ChangeNicknamModalLabel>{name}'s nickname:</ChangeNicknamModalLabel>
          <ChangeNicknameModalInputWrapper>
            <ChangeNicknameModalInput
              value={changeNickname.val}
              name="nickname"
              type="text"
              spellCheck={false}
              autoComplete="off"
              disabled={isLoading}
              placeholder="Enter the nickname"
              onChange={handleNicknameChange}
            />
            <ChangeNicknamModalError>{error}</ChangeNicknamModalError>
          </ChangeNicknameModalInputWrapper>
          <ChangeNicknamModalBtn
            onClick={updateNickname}
            disabled={isLoading || error}
          >
            {isLoading ? (
              <LoadingSpinner style={{ width: "14px", height: "14px" }} />
            ) : (
              `${btnLabel}`
            )}
          </ChangeNicknamModalBtn>
        </ChangeNicknamModalWrapper>
      </ChangeNicknameModalContainer>
    </Modal>
  );
}

const ChangeNicknamModalWrapper = styled.div`
  flex: 1;
  padding: 0.6rem;
  overflow-y: auto;
`;

const ChangeNicknameModalInputWrapper = styled.div`
  display: block;
  width: 100%;
  min-height: 50px;
`;

const ChangeNicknamModalError = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.danger};
  margin-top: 5px;
`;

const ChangeNicknamModalBtn = styled.button`
  display: block;
  width: 70px;
  height: 24px;
  margin: auto;
  margin-top: 8px;
  background: #085ed4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.7rem;
  position: relative;
  cursor: pointer;

  :enabled:hover {
    background: #206ed8;
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const ChangeNicknamModalLabel = styled.span`
  display: block;
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.sub};
  ::first-letter {
    text-transform: capitalize;
  }
`;

const ChangeNicknameModalInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  background: none;
  margin-top: 6px;
  padding: 6px 4px;
  color: ${(props) => props.theme.txt.main};
  border-radius: 4px;
  outline: none;
  font-size: 0.8rem;
`;

const ChangeNicknameModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
