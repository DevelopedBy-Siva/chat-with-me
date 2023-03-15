import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";

import LoadingSpinner from "../../Loader";

export default function UserDescriptionChange({
  userDescriptionChange,
  setUserDescriptionChange,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!userDescriptionChange.disabled) inputRef.current.focus();
  }, [userDescriptionChange]);

  function toggleEdit() {
    setUserDescriptionChange({ ...userDescriptionChange, disabled: false });
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setUserDescriptionChange({ ...userDescriptionChange, description: val });
  }

  return (
    <ChangeUserDetails>
      <EditTitleWrapper>
        <EditTitle>Your current status</EditTitle>
        <EditSubmitBtn
          className={!userDescriptionChange.disabled ? "editable" : ""}
          disabled={userDescriptionChange.loading}
        >
          {userDescriptionChange.loading ? (
            <Loader />
          ) : !userDescriptionChange.disabled ? (
            <EditDone>Done</EditDone>
          ) : (
            <BsFillPencilFillCustom onClick={toggleEdit} />
          )}
        </EditSubmitBtn>
      </EditTitleWrapper>
      <EditLabel>
        <EditDescriptionInput
          disabled={
            userDescriptionChange.disabled || userDescriptionChange.loading
          }
          value={userDescriptionChange.description}
          maxLength={150}
          rows={3}
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
  width: 30px;
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

const EditDescriptionInput = styled.textarea`
  display: block;
  resize: none;
  width: 100%;
  padding: 12px;
  color: ${(props) => props.theme.txt.main};
  background: none;
  outline: none;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  border-radius: 5px;
  letter-spacing: 1px;
  font-size: 0.7rem;
  line-height: 18px;
`;

const EditDone = styled.span`
  display: block;
  font-size: 0.6rem;
  color: ${(props) => props.theme.txt.main};
  font-weight: 400;
`;
