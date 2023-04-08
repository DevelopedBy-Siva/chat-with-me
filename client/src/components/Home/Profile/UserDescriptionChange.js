import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import LoadingSpinner from "../../Loader";
import axios from "../../../api/axios";
import toast from "../../Toast";
import { statusValidation } from "../../../utils/InputHandler";
import { updateDescription } from "../../../store/actions/UserActions";

export default function UserDescriptionChange({
  userDescriptionChange,
  setUserDescriptionChange,
}) {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userDescriptionChange.disabled) inputRef.current.focus();
  }, [userDescriptionChange]);

  function toggleEdit() {
    setUserDescriptionChange({ ...userDescriptionChange, disabled: false });
  }

  function handleInputChange(e) {
    if (userDescriptionChange.disabled || userDescriptionChange.loading) return;
    const val = e.target.value;
    const { isValid, message: errorMsg } = statusValidation(val.trim());
    let error = null;
    if (!isValid && errorMsg) error = errorMsg;
    setUserDescriptionChange({
      ...userDescriptionChange,
      description: val,
      error,
    });
  }

  async function submitEdit() {
    if (userDescriptionChange.error) return;
    const new_user_status = userDescriptionChange.description.trim();
    if (new_user_status === userDescriptionChange.prev) {
      setUserDescriptionChange({
        ...userDescriptionChange,
        description: new_user_status,
        disabled: true,
      });
      return;
    }
    setUserDescriptionChange({
      ...userDescriptionChange,
      description: new_user_status,
      loading: true,
    });
    await axios
      .put(`/user/profile?description=${new_user_status}`)
      .then(() => {
        toast.success("User status updated successfully");
        dispatch(updateDescription(new_user_status));
        setUserDescriptionChange({
          ...userDescriptionChange,
          disabled: true,
          loading: false,
        });
      })
      .catch(() => {
        toast.error(
          "Something went wrong. Failed to change the user status",
          toast.props.user.nonPersist
        );
        setUserDescriptionChange({
          ...userDescriptionChange,
          loading: false,
        });
      });
  }

  function handlekey(e) {
    if (e.key === "Enter") e.preventDefault();
  }

  return (
    <ChangeUserDetails>
      <EditTitleWrapper>
        <EditTitle>Your current status</EditTitle>
        <EditSubmitBtn
          className={
            !userDescriptionChange.disabled && !userDescriptionChange.loading
              ? "editable"
              : ""
          }
          disabled={userDescriptionChange.loading}
        >
          {userDescriptionChange.loading ? (
            <Loader />
          ) : !userDescriptionChange.disabled ? (
            <EditDone onClick={submitEdit}>Done</EditDone>
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
          className={userDescriptionChange.error ? "error" : ""}
          onKeyDown={handlekey}
          placeholder="Enter what's in your mind..."
        />
      </EditLabel>
      <ErrorMsg>{userDescriptionChange.error}</ErrorMsg>
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
  position: relative;
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
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 3px;
  margin-left: 6px;
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
    overflow: hidden;
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

  &.error {
    border: 1px solid ${(props) => props.theme.txt.danger};
    color: ${(props) => props.theme.txt.danger};

    ::-webkit-input-placeholder {
      color: ${(props) => props.theme.txt.danger};
    }
    ::-moz-placeholder {
      color: ${(props) => props.theme.txt.danger};
    }
    :-ms-input-placeholder {
      color: ${(props) => props.theme.txt.danger};
    }
    :-moz-placeholder {
      color: ${(props) => props.theme.txt.danger};
    }
  }
`;

const EditDone = styled.span`
  display: inline-block;
  font-size: 0.6rem;
  color: ${(props) => props.theme.txt.main};
  font-weight: 400;
  width: 100%;
  height: 100%;
  line-height: 20px;
  margin: auto;
`;

const ErrorMsg = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.danger};
  font-size: 0.7rem;
  margin-top: 4px;
  position: absolute;
  bottom: -15px;
  font-weight: 400;
`;
