import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";
import { useDispatch } from "react-redux";

import LoadingSpinner from "../../Loader";
import axios from "../../../api/axios";
import toast from "../../Toast";
import { nameValidation } from "../../../utils/InputHandler";
import { updateUserName } from "../../../store/actions/UserActions";

export default function UserNameChange({ userNameChange, setUserNameChange }) {
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userNameChange.disabled) inputRef.current.focus();
  }, [userNameChange]);

  function toggleEdit() {
    setUserNameChange({ ...userNameChange, disabled: false });
  }

  function handleInputChange(e) {
    if (userNameChange.disabled || userNameChange.loading) return;
    const val = e.target.value;
    const { isValid, message: errorMsg } = nameValidation(val.trim());
    let error = null;
    if (!isValid && errorMsg) error = errorMsg;

    setUserNameChange({ ...userNameChange, username: val, error });
  }

  async function submitEdit() {
    if (userNameChange.error) return;
    const new_username = userNameChange.username.trim().toLowerCase();
    if (new_username === userNameChange.prev) {
      setUserNameChange({
        ...userNameChange,
        username: new_username,
        disabled: true,
      });
      return;
    }
    setUserNameChange({
      ...userNameChange,
      username: new_username,
      loading: true,
    });
    await axios
      .put(`/user/profile?name=${new_username}`)
      .then(() => {
        toast.success("Username updated successfully");
        dispatch(updateUserName(new_username));
        setUserNameChange({
          ...userNameChange,
          disabled: true,
          loading: false,
        });
      })
      .catch(() => {
        toast.error(
          "Something went wrong. Failed to change the username",
          toast.props.user.nonPersist
        );
        setUserNameChange({
          ...userNameChange,
          loading: false,
        });
      });
  }

  return (
    <ChangeUserDetails>
      <EditTitleWrapper>
        <EditTitle>Username</EditTitle>
        <EditSubmitBtn
          className={
            !userNameChange.disabled && !userNameChange.loading
              ? "editable"
              : ""
          }
          disabled={userNameChange.loading}
        >
          {userNameChange.loading ? (
            <Loader />
          ) : !userNameChange.disabled ? (
            <EditDone onClick={submitEdit}>Done</EditDone>
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
          className={userNameChange.error ? "error" : ""}
        />
      </EditLabel>
      <ErrorMsg>{userNameChange.error}</ErrorMsg>
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

  &.error {
    border: 1px solid ${(props) => props.theme.txt.danger};
    color: ${(props) => props.theme.txt.danger};
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
  font-size: 0.6rem;
  margin-top: 4px;
  position: absolute;
  bottom: -20px;
`;
