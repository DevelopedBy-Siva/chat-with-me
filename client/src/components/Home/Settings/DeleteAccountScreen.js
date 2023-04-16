import React, { useState } from "react";
import styled from "styled-components";

import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import SubModal from "../Modal/SubModal";
import LoadingSpinner from "../../Loader";
import axios from "../../../api/axios";
import retrieveError from "../../../api/ExceptionHandler";
import toast from "../../Toast";

const modalStyle = {
  maxHeight: "310px",
  maxWidth: "480px",
};

export default function DeleteAccountScreen({ close }) {
  const [confirmInput, setConfirmInput] = useState("");
  const [confirm, setConfirm] = useState({
    loading: false,
    error: false,
    allow: false,
  });

  function handleInputChange(e) {
    if (confirm.loading) return;

    const value = e.target.value;
    setConfirmInput(value);
    if (value === "delete") {
      setConfirm({ ...confirm, allow: true });
      return;
    }
    setConfirm({ ...confirm, allow: false });
  }

  async function deleteAccount() {
    if (!confirm.allow || confirm.loading === true) return;
    setConfirm({ ...confirm, loading: true });

    await axios
      .delete("/user/remove")
      .then(() => (window.location = "/sign-in"))
      .catch((error) => {
        const { message } = retrieveError(error);
        toast.error(message, toast.props.user.nonPersist);
        setConfirm({ ...confirm, loading: false });
      });
  }

  function handleClose() {
    if (confirm.loading) return;
    close();
  }

  return (
    <SubModal inactive={confirm.loading} style={modalStyle} close={handleClose}>
      <Container>
        <ModalHeaderWrapper style={{ fontSize: "0.9rem" }}>
          Delete account
        </ModalHeaderWrapper>
        <SubContainer>
          <Description>
            Are you sure you want to do this? Once deleted, there is no way to
            retrieve the account.
          </Description>
          <InputLabel>
            Type
            <i className="hightlight"> delete </i>
            to confirm deletion
          </InputLabel>
          <InputContainer
            value={confirmInput}
            name="confirm"
            type="text"
            spellCheck={false}
            autoComplete="off"
            onChange={handleInputChange}
            disabled={confirm.loading}
          />
          <ConfirmBtn
            disabled={!confirm.allow || confirm.loading ? true : false}
            onClick={deleteAccount}
          >
            {confirm.loading ? (
              <LoadingSpinner
                style={{ opacity: "0.7", width: "18px", height: "18px" }}
              />
            ) : (
              "Delete Account"
            )}
          </ConfirmBtn>
        </SubContainer>
      </Container>
    </SubModal>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  flex: 1;
  padding: 0.6rem;
  overflow-y: auto;
`;

const Description = styled.p`
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.sub};
  line-height: 18px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const InputLabel = styled.label`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  margin-top: 1.2rem;
  font-size: 0.8rem;

  .hightlight {
    color: ${(props) => props.theme.txt.main};
    font-weight: 400;
  }

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
  color: ${(props) => props.theme.txt.danger};
  outline-color: ${(props) => props.theme.border.outline};
  border: 1px solid ${(props) => props.theme.border.default};
  background: ${(props) => props.theme.btn.active};
  border-radius: 6px;
  padding: 0 14px;
  height: 38px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin: auto;
  margin-top: 1.2rem;
  display: block;
  width: 100%;
  position: relative;

  &:enabled:hover {
    background: ${(props) => props.theme.txt.danger};
    color: ${(props) => props.theme.txt.default};
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;
