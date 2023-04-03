import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import SubModal from "../Modal/SubModal";
import { getAvatar } from "../../../assets/avatars";
import { nicknameValidation } from "../../../utils/InputHandler";
import axios from "../../../api/axios";
import toast from "../../Toast";
import retrieveError from "../../../api/ExceptionHandler";
import LoadingSpinner from "../../Loader";

const subModalStyle = {
  maxHeight: "365px",
  maxWidth: "480px",
};
function NewContact({ close, item = {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState({
    val: "",
    error: null,
  });

  const inputRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleClose() {
    if (isLoading) return;
    close();
  }

  function handleInputChange(e) {
    const value = e.target.value;
    const { message } = nicknameValidation(value);
    setNickname({ error: message, val: value });
  }

  const disableControl =
    isLoading || nickname.error || nickname.val.length === 0;

  async function confirmAdd() {
    if (disableControl) return;
    setIsLoading(true);
    await axios
      .post("/user/add-contact")
      .then(() => {
        toast.success("Contact added successfully");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        const { message } = retrieveError(error);
        toast.error(message, toast.props.user.nonPersist);
        setIsLoading(false);
      });
  }

  return (
    <SubModal style={subModalStyle} inactive={isLoading} close={handleClose}>
      <ModalContainer>
        <ModalHeaderWrapper style={{ fontSize: "0.9rem" }}>
          Add to contacts
        </ModalHeaderWrapper>
        <ModalSubContainer>
          <DetailsContainer>
            <AvatarContainer>
              <Avatar src={getAvatar(item.avatarId)} />
            </AvatarContainer>
            <Details>
              <Name>{item.name}</Name>
              <Email>#{item.email}</Email>
            </Details>
          </DetailsContainer>
          <InputBlock>
            <InputLabel>
              Give the user a nickname. Name must be unique & this name can be
              viewed only by you.
            </InputLabel>
            <InputContainer
              name="nickname"
              type="text"
              spellCheck={false}
              autoComplete="off"
              disabled={isLoading}
              ref={inputRef}
              value={nickname.val}
              onChange={handleInputChange}
            />
            <InputErrorMessage>{nickname.error}</InputErrorMessage>
          </InputBlock>
          <ConfirmBtn
            disabled={disableControl}
            onClick={confirmAdd}
            type="submit"
          >
            {isLoading ? (
              <LoadingSpinner
                style={{ width: "18px", height: "18px", opacity: 0.7 }}
              />
            ) : (
              "Add contact"
            )}
          </ConfirmBtn>
        </ModalSubContainer>
      </ModalContainer>
    </SubModal>
  );
}

export default NewContact;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalSubContainer = styled.div`
  flex: 1;
  padding: 0.6rem;
  overflow-y: auto;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 8px 0;
`;

const AvatarContainer = styled.div`
  background-color: ${(props) => props.theme.btn.active};
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin-right: 15px;
  flex-shrink: 0;

  @media (max-width: 484px) {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }
`;

const Avatar = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const Details = styled.div`
  overflow: hidden;
`;

const Name = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.main};
  font-size: 0.9rem;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;

  @media (max-width: 484px) {
    font-size: 0.8rem;
  }
`;

const Email = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.main};
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: lowercase;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const InputBlock = styled.div`
  padding-top: 20px;
  min-height: 140px;
`;

const InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  line-height: 16px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const InputContainer = styled.input`
  margin-top: 0.8rem;
  display: block;
  width: 100%;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  background: none;
  outline: none;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.txt.main};
  border-radius: 6px;
  letter-spacing: 1px;
  font-weight: 400;
  height: 38px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ConfirmBtn = styled.button`
  color: ${(props) => props.theme.txt.sub};
  outline-color: ${(props) => props.theme.border.outline};
  border: none;
  background: ${(props) => props.theme.btn.active};
  border-radius: 6px;
  padding: 0 14px;
  height: 34px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin: auto;
  margin-top: 6px;
  display: block;
  width: 100%;
  position: relative;

  &:enabled:hover {
    color: ${(props) => props.theme.txt.main};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const InputErrorMessage = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  margin-top: 5px;
  line-height: 16px;
  color: ${(props) => props.theme.txt.danger};
`;
