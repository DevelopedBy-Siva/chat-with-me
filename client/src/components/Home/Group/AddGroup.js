import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";

import SubModal from "../Modal/SubModal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import LoadingSpinner from "../../Loader";
import toast from "../../Toast";
import axios from "../../../api/axios";
import retrieveError from "../../../api/ExceptionHandler";
import { getAvatar } from "../../../assets/avatars";
import { createUserGroup } from "../../../store/actions/ContactActions";

const modalStyle = {
  maxHeight: "330px",
  maxWidth: "480px",
};

export default function AddGroup({ close }) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    val: "",
    error: null,
  });
  const [members, setMembers] = useState([]);

  const { contacts } = useSelector((state) => state.contacts);

  const dispatch = useDispatch();

  function handleClose() {
    if (isLoading) return;
    close();
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setInput({ error: null, val });
  }

  async function createGroup() {
    if (isLoading) return;
    const value = input.val.trim();
    if (value.length < 3) {
      setInput({ ...input, error: "Atleast 3 characters required" });
      return;
    }
    if (members.length < 2) {
      setInput({ ...input, error: "Atleast 2 members required" });
      return;
    }
    setIsLoading(true);
    await axios
      .post("/user/create-group", { name: value, members })
      .then(({ data }) => {
        dispatch(createUserGroup(data));
        setIsLoading(false);
        toast.success("Group created successfully");
        close();
      })
      .catch((error) => {
        let { message } = retrieveError(error);
        setIsLoading(false);
        if (error.response.status === 405)
          message =
            "Sorry, groups limit reached. You are not allowed to create more than 2 groups";
        toast.error(message, toast.props.user.nonPersist);
      });
  }

  function selectMembers(email) {
    if (isLoading) return;
    let newMembers = [...members];
    const exists = newMembers.findIndex((i) => i.email === email);
    if (exists === -1) newMembers.push({ email });
    else newMembers.splice(exists, 1);
    setMembers(newMembers);
  }

  function isSelected(email) {
    const index = members.findIndex((i) => i.email === email);
    if (index === -1) return false;
    return true;
  }

  return (
    <SubModal inactive={isLoading} style={modalStyle} close={handleClose}>
      <Container>
        <ModalHeaderWrapper style={{ fontSize: "0.9rem" }}>
          Create group
        </ModalHeaderWrapper>
        <SubContainer>
          <InputContainer>
            <InputWrapper>
              <InputBox
                name="confirm"
                type="text"
                spellCheck={false}
                autoComplete="off"
                disabled={isLoading}
                placeholder="Give your group a name"
                value={input.val}
                onChange={handleInputChange}
              />
              <ConfirmBtn onClick={createGroup} disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner
                    style={{ opacity: "0.8", width: "16px", height: "16px" }}
                  />
                ) : (
                  "Create"
                )}
              </ConfirmBtn>
            </InputWrapper>
            {input.error && <ErrorMsg>{input.error}</ErrorMsg>}
          </InputContainer>
          {contacts.length === 0 ? (
            <AlertMsg>No contacts found</AlertMsg>
          ) : (
            <MembersContainer>
              <PickMsg>
                Selected group members:{" "}
                <b style={{ fontWeight: 400, fontSize: "0.8rem" }}>
                  {members.length}
                </b>
              </PickMsg>
              {contacts.map((item, index) => (
                <MemberSelect
                  disabled={isLoading}
                  onClick={() => selectMembers(item.email)}
                  key={index}
                >
                  <MemberAvatar>
                    <MemberAvatarImg src={getAvatar(item.avatarId)} />
                  </MemberAvatar>
                  <MemberDetails>
                    <MemberName>{item.name}</MemberName>
                    <MemeberNickname>#{item.nickname}</MemeberNickname>
                  </MemberDetails>
                  <Selected>{isSelected(item.email) && <TiTick />}</Selected>
                </MemberSelect>
              ))}
            </MembersContainer>
          )}
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

const InputContainer = styled.div`
  width: 100%;
  min-height: 52px;

  @media (max-width: 484px) {
    min-height: 45px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 30px;

  @media (max-width: 484px) {
    min-height: 26px;
  }
`;

const ErrorMsg = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.danger};
  font-size: 0.7rem;
  margin-left: 3px;
  margin-top: 4px;

  @media (max-width: 484px) {
    font-size: 0.65rem;
  }
`;

const InputBox = styled.input`
  display: block;
  flex: 1;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  background: none;
  outline: none;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.txt.main};
  height: 100%;
  border-radius: 4px 0 0 4px;
  font-size: 0.8rem;

  @media (max-width: 484px) {
    font-size: 0.7rem;
  }
`;

const ConfirmBtn = styled.button`
  display: block;
  height: 100%;
  flex-shrink: 0;
  width: 45px;
  border: none;
  outline: none;
  border-radius: 0 4px 4px 0;
  font-size: 0.7rem;
  font-weight: 300;
  background: rgba(45, 157, 65, 0.8);
  color: ${(props) => props.theme.txt.main};
  position: relative;
  cursor: pointer;

  :enabled:hover {
    background: rgba(45, 157, 65, 1);
  }

  :disabled {
    cursor: not-allowed;
  }
`;

const AlertMsg = styled.span`
  display: block;
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.sub};
  text-align: center;
  line-height: 16px;
  padding: 0.6rem;
`;

const MembersContainer = styled.div`
  width: 100%;
`;

const MemberSelect = styled.button`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
  background: none;
  border: 1px solid ${(props) => props.theme.border.inputbox};
  border-radius: 5px;
  margin-bottom: 5px;
`;

const MemberAvatar = styled.div`
  background-color: ${(props) => props.theme.btn.active};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 15px;
  flex-shrink: 0;
`;

const MemberAvatarImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%; ;
`;

const MemberDetails = styled.div`
  overflow: hidden;
  flex: 1;
  min-width: 0;
`;

const MemberName = styled.span`
  display: block;
  margin-bottom: 2px;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.8rem;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  text-align: left;
`;

const MemeberNickname = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;

const PickMsg = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.75rem;
  margin-top: 8px;
  margin-bottom: 12px;
`;

const Selected = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.txt.sub};
  font-size: 1.2rem;
  width: 30px;
  flex-shrink: 0;
`;
