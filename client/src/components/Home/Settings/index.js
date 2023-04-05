import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BsMoonFill } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi";

import SubInfo from "../Info/SubInfo";
import Modal from "../Modal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import ChangePasswordScreen from "./ChangePasswordScreen";
import ConfirmDeleteAccount from "./DeleteAccountScreen";
import { ThemeContext } from "../../../context/ThemeContext";

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
            <LightOrDarkMode>
              <LightOrDarkModeHeading>Application theme</LightOrDarkModeHeading>
              <ThemeSwitch />
            </LightOrDarkMode>
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

function ThemeSwitch() {
  const { appTheme, handleTheme } = useContext(ThemeContext);

  const currentTheme = () => {
    if (appTheme === "light") return "dark";
    return "light";
  };

  return (
    <Switch onClick={() => handleTheme(currentTheme())}>
      <SwitchLabel className={appTheme} />
      <BsFillMoonFillCustom className={appTheme === "dark" ? "show" : "hide"} />
      <HiOutlineSunCustom className={appTheme === "dark" ? "hide" : "show"} />
    </Switch>
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

const LightOrDarkMode = styled.div`
  align-items: center;
  margin-bottom: 10px;
  display: none;

  @media (max-width: 920px) {
    display: flex;
  }
`;

const LightOrDarkModeHeading = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const Switch = styled.button`
  width: 52px;
  height: 26px;
  border-radius: 8px;
  border: none;
  outline: none;
  position: relative;
  cursor: pointer;
  background: ${(props) => `${props.theme.btn.active}`};
  border: 1px solid ${(props) => props.theme.border.default};
  overflow: hidden;
  margin-left: 10px;
`;

const SwitchLabel = styled.span`
  display: block;
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.theme.txt.main};
  border-radius: 50%;
  left: 20%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease-in-out;

  &.dark {
    left: 15%;
    transform: translate(0, -50%);
  }

  &.light {
    left: 40%;
    transform: translate(100%, -50%);
  }
`;

const BsFillMoonFillCustom = styled(BsMoonFill)`
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.main};
  transition: opacity 0.3s ease-in;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }
`;

const HiOutlineSunCustom = styled(HiOutlineSun)`
  position: absolute;
  top: 50%;
  left: 28%;
  transform: translate(-50%, -50%);
  font-size: 1.1rem;
  color: ${(props) => props.theme.txt.main};
  transition: opacity 0.3s ease-in;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }
`;
