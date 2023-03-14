import React, { useState } from "react";
import styled from "styled-components";

import SubInfo from "../Info/SubInfo";
import Modal from "../Modal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import ChangePasswordScreen from "./ChangePasswordScreen";
import ConfirmDeleteAccount from "./DeleteAccountScreen";

const settings = [
  {
    description: "Maximum contacts that the user is allowed to add",
    max: 3,
  },
  {
    description: "Maximum groups that the user is allowed to create",
    max: 2,
  },
  {
    description: "Cleanup messages that are older than (in days)",
    max: 1,
  },
];

const modalStyle = {
  maxWidth: "760px",
  maxHeight: "572px",
};

export default function Settings() {
  const [showChangePswd, setShowChangePswd] = useState(false);
  const [showDeletePswd, setshowDeletePswd] = useState(false);

  return (
    <React.Fragment>
      <Modal style={modalStyle}>
        <Container>
          <ModalHeaderWrapper>Settings</ModalHeaderWrapper>
          <SubContainer>
            <SubInfo>
              This application was made as part of a personal project,
              therefore, some functionalities are limited to the user and cannot
              be modified.
            </SubInfo>
            <SettingTable>
              <SettingBody>
                {settings.map((i, index) => (
                  <SettingRow key={index}>
                    <SettingDescription>{i.description}</SettingDescription>
                    <SettingInputContainer>
                      <SettingInput type="text" disabled value={i.max} />
                    </SettingInputContainer>
                  </SettingRow>
                ))}
              </SettingBody>
            </SettingTable>
            <ChangePassword>
              <ChangePasswordHeading>
                Change your account password
              </ChangePasswordHeading>
              <ChangePasswordBtn onClick={() => setShowChangePswd(true)}>
                Change password
              </ChangePasswordBtn>
            </ChangePassword>
            <DeleteAccount>
              <DeleteHeading>Delete account</DeleteHeading>
              <DeleteAccountDescription>
                Once you delete your account, there is no going back. Please be
                certain.
              </DeleteAccountDescription>
              <DeleteAccountBtn onClick={() => setshowDeletePswd(true)}>
                Delete your account
              </DeleteAccountBtn>
            </DeleteAccount>
          </SubContainer>
        </Container>
      </Modal>
      {showChangePswd && (
        <ChangePasswordScreen close={() => setShowChangePswd(false)} />
      )}
      {showDeletePswd && (
        <ConfirmDeleteAccount close={() => setshowDeletePswd(false)} />
      )}
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  overflow-y: auto;
  padding: 0.6rem;
`;

const SettingTable = styled.table`
  border-collapse: separate;
  border-spacing: 0 20px;
`;

const SettingBody = styled.tbody``;

const SettingRow = styled.tr`
  margin: 10px;
`;

const SettingDescription = styled.td`
  font-size: 0.8rem;
  color: ${(props) => props.theme.txt.sub};
  line-height: 18px;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const SettingInputContainer = styled.td`
  padding-left: 1.2rem;
`;

const SettingInput = styled.input`
  border: none;
  outline: none;
  display: block;
  font-size: 0.8rem;
  width: 50px;
  background: ${(props) => props.theme.btn.active};
  border-radius: 5px;
  padding: 5px 0;
  text-align: center;
  font-weight: 400;
  color: ${(props) => props.theme.txt.sub};

  &:disabled {
    cursor: not-allowed;
  }
`;

const ChangePassword = styled.div`
  display: flex;
  align-items: center;
`;

const ChangePasswordHeading = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ChangePasswordBtn = styled.button`
  color: ${(props) => props.theme.txt.sub};
  outline-color: ${(props) => props.theme.border.outline};
  border: 1px solid ${(props) => props.theme.border.default};
  background: ${(props) => props.theme.btn.active};
  border-radius: 6px;
  padding: 8px 14px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin-left: 10px;

  &:hover {
    border: 1px solid ${(props) => props.theme.txt.sub};
  }

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const DeleteAccount = styled.div`
  padding: 1.6rem 0 1rem 0;
`;

const DeleteHeading = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.danger};
  font-weight: 500;
  font-size: 1rem;
  padding-bottom: 4px;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};

  @media (max-width: 484px) {
    font-size: 0.9rem;
  }
`;

const DeleteAccountDescription = styled.span`
  display: block;
  padding: 14px 0;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const DeleteAccountBtn = styled.button`
  color: ${(props) => props.theme.txt.danger};
  outline-color: ${(props) => props.theme.border.outline};
  border: 1px solid ${(props) => props.theme.border.default};
  background: ${(props) => props.theme.btn.active};
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  margin-left: 1px;

  &:hover {
    background: ${(props) => props.theme.txt.danger};
    color: ${(props) => props.theme.txt.default};
  }

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;
