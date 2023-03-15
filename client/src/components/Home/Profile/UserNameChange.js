import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";

import LoadingSpinner from "../../Loader";

export default function UserNameChange({ userNameChange, setUserNameChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!userNameChange.disabled) inputRef.current.focus();
  }, [userNameChange]);

  function toggleEdit() {
    setUserNameChange({ ...userNameChange, disabled: false });
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setUserNameChange({ ...userNameChange, username: val });
  }

  return (
    <ChangeUserDetails>
      <EditTitleWrapper>
        <EditTitle>Username</EditTitle>
        <EditSubmitBtn
          className={!userNameChange.disabled ? "editable" : ""}
          disabled={userNameChange.loading}
        >
          {userNameChange.loading ? (
            <Loader />
          ) : !userNameChange.disabled ? (
            <EditDone>Done</EditDone>
          ) : (
            <BsFillPencilFillCustom onClick={toggleEdit} />
          )}
        </EditSubmitBtn>
      </EditTitleWrapper>
      <EditLabel>
        <EditNameInput
          disabled={userNameChange.disabled || userNameChange.loading}
          value={userNameChange.username}
          maxLength={16}
          ref={inputRef}
          onChange={handleInputChange}
        />
      </EditLabel>
    </ChangeUserDetails>
  );
}

function Loader() {
  return (
    <LoadingSpinner style={{ opacity: "0.8", width: "16px", height: "16px" }} />
  );
}

const BsFillPencilFillCustom = styled(BsFillPencilFill)`
  font-size: 0.64rem;
`;

const ChangeUserDetails = styled.div`
  max-width: 380px;
  margin: auto;
  margin-top: 2.4rem;
`;

const EditLabel = styled.label`
  display: inline-block;
  width: 100%;
`;

const EditTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
`;

const EditTitle = styled.h4`
  font-size: 0.74rem;
  font-weight: 400;
  color: ${(props) => props.theme.txt.sub};
`;

const EditSubmitBtn = styled.button`
  width: 34px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 5px;
  margin-left: 2px;
  background: none;
  color: ${(props) => props.theme.txt.sub};
  position: relative;
  background-color: none;

  &:hover:enabled {
    color: ${(props) => props.theme.txt.main};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &.editable {
    background-color: ${(props) => props.theme.border.outline};
    margin-left: 8px;
  }
`;

const EditNameInput = styled.input`
  width: 100%;
  padding: 12px;
  color: ${(props) => props.theme.txt.main};
  background: none;
  outline: none;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  border-radius: 5px;
  letter-spacing: 1px;
  font-size: 0.7rem;
  text-transform: capitalize;
`;

const EditDone = styled.span`
  display: block;
  font-size: 0.6rem;
  color: ${(props) => props.theme.txt.main};
  font-weight: 400;
`;
