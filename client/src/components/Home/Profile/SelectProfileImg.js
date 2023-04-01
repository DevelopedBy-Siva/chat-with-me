import React, { useState } from "react";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";

import { getAvatar } from "../../../assets/avatars";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import SubModal from "../Modal/SubModal";
import LoadingSpinner from "../../Loader";
import axios from "../../../api/axios";
import toast from "../../Toast";

const modalStyle = {
  maxWidth: "500px",
  maxHeight: "378px",
};
const elements = Array.from(Array(8).keys());
export default function SelectProfileImg({ current, setShowProfileImages }) {
  const [imageId, setImageId] = useState(current);
  const [isChanged, setIsChanged] = useState({
    loading: false,
  });

  function handleClose() {
    if (isChanged.loading) return;
    setShowProfileImages(false);
  }

  function selectImage(id) {
    if (isChanged.loading) return;
    setImageId(id);
  }

  async function submitChange() {
    if (current === imageId) return handleClose();

    setIsChanged({ ...isChanged, loading: true });
    await axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(() => {
        toast.success("Profile pic changed successfully");
        setShowProfileImages(false);
      })
      .catch(() => {
        toast.error(
          "Something went wrong. Failed to change the profile pic",
          toast.props.user.nonPersist
        );
        setIsChanged({ ...isChanged, loading: false });
      });
  }

  return (
    <SubModal
      inactive={isChanged.loading}
      close={handleClose}
      style={modalStyle}
    >
      <Container>
        <ModalHeaderWrapper>Choose a profile image</ModalHeaderWrapper>
        <ImageContainer>
          {elements.map((item, index) => (
            <ProfileImageContainer
              isLoading={isChanged.loading ? 1 : 0}
              className={item + 1 === imageId ? "selected" : ""}
              onClick={() => selectImage(item + 1)}
              key={index}
            >
              <ProfileImage src={getAvatar(item + 1)} />
              {item + 1 === imageId ? (
                <ActiveContainer>
                  <TiTick />
                </ActiveContainer>
              ) : (
                ""
              )}
            </ProfileImageContainer>
          ))}
        </ImageContainer>
        <SubmitBtn disabled={isChanged.loading} onClick={submitChange}>
          {isChanged.loading ? (
            <LoadingSpinner
              style={{ opacity: "0.7", width: "16px", height: "16px" }}
            />
          ) : (
            "Submit"
          )}
        </SubmitBtn>
      </Container>
    </SubModal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  padding: 0.6rem;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
`;

const ProfileImageContainer = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  margin: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.btn.active};
  border: 3px solid ${(props) => props.theme.bg.modal};
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  position: relative;

  &.selected {
    border: 3px solid ${(props) => props.theme.border.outline};
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ActiveContainer = styled.span`
  position: absolute;
  bottom: 0;
  left: 4px;
  background-color: ${(props) => props.theme.border.outline};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.8rem;
`;

const SubmitBtn = styled.button`
  width: 70px;
  height: 30px;
  background-color: ${(props) => props.theme.border.outline};
  color: #fff;
  border: none;
  outline: none;
  border-radius: 6px;
  margin: auto;
  margin-top: 20px;
  letter-spacing: 1px;
  font-size: 0.7rem;
  font-weight: 400;
  cursor: pointer;
  position: relative;

  &:disabled {
    cursor: wait;
  }
`;
