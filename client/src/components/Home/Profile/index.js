import React, { useState } from "react";
import styled from "styled-components";
import { BsFillPencilFill } from "react-icons/bs";

import Modal from "../Modal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import { getAvatar } from "../../../assets/avatars";
import SelectProfileImg from "./SelectProfileImg";

const modalStyle = {
  maxWidth: "760px",
  maxHeight: "572px",
};

export default function Profile() {
  const [apiResponse, setApiResponse] = useState({
    loading: false,
    error: false,
  });

  const [showProfileImages, setShowProfileImages] = useState(false);

  function toggleModal(val = false) {
    if (apiResponse.loading) return;
    setShowProfileImages(val);
  }

  return (
    <React.Fragment>
      <Modal style={modalStyle}>
        <Container>
          <ModalHeaderWrapper>Profile</ModalHeaderWrapper>
          <SubContainer>
            <ProfileImageContainer>
              <ProfileImage src={getAvatar(2)} alt="profile" />
              <EditImgBtn onClick={() => toggleModal(true)}>
                <BsFillPencilFillCustom style={{ fontSize: "0.6rem" }} /> Edit
              </EditImgBtn>
            </ProfileImageContainer>
            <ChangeUserDetails>
              <EditTitle>Username</EditTitle>
              <InputWrapper>
                <EditLabel>
                  <EditNameInput />
                </EditLabel>
                <EditSubmitBtn>
                  <BsFillPencilFillCustom />
                </EditSubmitBtn>
              </InputWrapper>
            </ChangeUserDetails>
            <ChangeUserDetails>
              <EditTitle>Your current status</EditTitle>
              <InputWrapper>
                <EditLabel>
                  <EditDescriptionInput rows={3} />
                </EditLabel>
                <EditSubmitBtn>
                  <BsFillPencilFillCustom />
                </EditSubmitBtn>
              </InputWrapper>
            </ChangeUserDetails>
          </SubContainer>
        </Container>
      </Modal>
      {showProfileImages && (
        <SelectProfileImg
          current={2}
          setShowProfileImages={setShowProfileImages}
        />
      )}
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  min-height: 0;
  flex: 1;
  overflow-y: auto;
`;

const ProfileImageContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 150px;
  max-height: 150px;
  border-radius: 50%;
  margin: auto;
  position: relative;
  background-color: ${(props) => props.theme.btn.active};
`;

const ProfileImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const EditImgBtn = styled.button`
  padding: 6px;
  position: absolute;
  bottom: 15px;
  right: -10px;
  border-radius: 4px;
  border: none;
  outline: ${(props) => props.theme.border.outline};
  cursor: pointer;
  background: ${(props) => props.theme.border.outline};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 1px;
`;

const BsFillPencilFillCustom = styled(BsFillPencilFill)`
  font-size: 0.8rem;
  margin-right: 4px;
`;

const ChangeUserDetails = styled.div`
  max-width: 340px;
  margin: auto;
  margin-top: 2.4rem;
`;

const EditLabel = styled.label`
  display: inline-block;
  width: 100%;
`;

const EditTitle = styled.h4`
  font-size: 0.8rem;
  font-weight: 400;
  padding-bottom: 8px;
  color: ${(props) => props.theme.txt.sub};
`;

const EditNameInput = styled.input`
  width: 100%;
  padding: 8px;
  color: ${(props) => props.theme.txt.main};
  background: none;
  outline: none;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  border-right: 0;
  border-radius: 5px 0 0 5px;
  letter-spacing: 1px;
  font-size: 0.8rem;
`;

const EditSubmitBtn = styled.button`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) => props.theme.border.outline};
  border: none;
  outline: none;
  color: #fff;
  border-radius: 0 5px 5px 0;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const EditDescriptionInput = styled.textarea`
  display: block;
  resize: none;
  width: 100%;
  padding: 8px;
  color: ${(props) => props.theme.txt.main};
  background: none;
  outline: none;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  border-right: 0;
  border-radius: 5px 0 0 5px;
  letter-spacing: 1px;
  font-size: 0.8rem;
`;
