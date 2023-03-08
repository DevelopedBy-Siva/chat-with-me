import React from "react";
import styled from "styled-components";

import SubInfo from "../Info/SubInfo";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";

const settings = [
  {
    description: "Maximum contacts that the user is allowed to add",
    max: 3,
  },
  {
    description: "Maximum groups that the user is allowed to create",
    max: 2,
  },
];

export default function Settings() {
  return (
    <Container>
      <ModalHeaderWrapper>Settings</ModalHeaderWrapper>
      <SubInfo>
        This application was made as part of a personal project, therefore, many
        functionalities are limited to the user and cannot be modified
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
    </Container>
  );
}

const Container = styled.div`
  margin-top: 10px;
  max-height: 80vh;
  overflow-y: scroll;
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
