import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { BsFillPencilFill } from "react-icons/bs";

import Modal from "../Modal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import { getAvatar } from "../../../assets/avatars";
import SelectProfileImg from "./SelectProfileImg";
import UserNameChange from "./UserNameChange";
import UserDescriptionChange from "./UserDescriptionChange";
import { updateOneTimeInfo } from "../../../store/actions/UserActions";

const modalStyle = {
  maxWidth: "760px",
  maxHeight: "572px",
};

export default function Profile() {
  const [userNameChange, setUserNameChange] = useState({
    loading: false,
    disabled: true,
    error: null,
    prev: "sivasanker",
    username: "sivasanker",
  });

  const [userDescriptionChange, setUserDescriptionChange] = useState({
    loading: false,
    disabled: true,
    error: null,
    prev: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500",
  });

  const [showProfileImages, setShowProfileImages] = useState(false);
  const oneTimeInfo = useSelector((state) => state.user.oneTimeInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (oneTimeInfo) dispatch(updateOneTimeInfo(false));
  }, []);

  function toggleModal(val = false) {
    setShowProfileImages(val);
  }

  return (
    <React.Fragment>
      <Modal
        isLoading={userNameChange.loading || userDescriptionChange.loading}
        style={modalStyle}
      >
        <Container>
          <ModalHeaderWrapper>Profile</ModalHeaderWrapper>
          <SubContainer>
            <ProfileImageContainer>
              <ProfileImage src={getAvatar(2)} />
              <EditImgBtn onClick={() => toggleModal(true)}>
                <BsFillPencilFillCustom style={{ marginRight: "4px" }} />
                Edit
              </EditImgBtn>
            </ProfileImageContainer>
            <UserNameChange
              userNameChange={userNameChange}
              setUserNameChange={setUserNameChange}
            />
            <UserDescriptionChange
              userDescriptionChange={userDescriptionChange}
              setUserDescriptionChange={setUserDescriptionChange}
            />
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
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  padding: 0.6rem;
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
  font-size: 0.6rem;
`;
