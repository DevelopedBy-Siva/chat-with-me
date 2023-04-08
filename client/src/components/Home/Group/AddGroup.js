import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { MdOutlineErrorOutline } from "react-icons/md";
import { FiPlus } from "react-icons/fi";

import SubModal from "../Modal/SubModal";
import ModalHeaderWrapper from "../Modal/ModalHeaderWrapper";
import LoadingSpinner from "../../Loader";
import toast from "../../Toast";
import axios from "../../../api/axios";
import retrieveError from "../../../api/ExceptionHandler";
import { getAvatar } from "../../../assets/avatars";
import { createUserGroup } from "../../../store/actions/ContactActions";

const modalStyle = {
  maxHeight: "480px",
  maxWidth: "480px",
};

const GrpIcons = [
  "#52BE80",
  "#EC7063",
  "#F4D03F",
  "#5DADE2",
  "#AF7AC5",
  "#EB984E",
];

export default function AddGroup({ close }) {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    val: "",
    error: null,
  });
  const [members, setMembers] = useState([]);
  const [icon, setIcon] = useState({
    letter: { val: "", error: null },
    background: GrpIcons[3],
  });

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

    let error = false;
    const value = input.val.trim();
    if (value.length < 3) {
      error = true;
      setInput({ ...input, error: "Atleast 3 characters required" });
    }
    if (!error && members.length < 2) {
      error = true;
      setInput({ ...input, error: "Atleast 2 members required" });
    }

    if (icon.letter.val.trim().length === 0) {
      error = true;
      setIcon({ ...icon, letter: { val: icon.letter.val, error: "error" } });
    }

    if (error) return;

    setIsLoading(true);
    await axios
      .post("/user/create-group", {
        name: value,
        members,
        icon: { letter: icon.letter.val, background: icon.background },
      })
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

  function handleIconLettetChange(e) {
    let val = e.target.value.trim();
    const regex = /^[a-zA-Z]?$/;
    if (!regex.test(val)) return;
    setIcon({ ...icon, letter: { val, error: null } });
  }

  function selectMembers(email) {
    if (isLoading) return;
    setInput({ ...input, error: null });

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

  function allowInput(e) {
    const allowedKeys = [8, 46];
    const keyCode = e.keyCode;

    if (!allowedKeys.includes(keyCode)) e.preventDefault();
  }

  function changeIconBg(background) {
    if (isLoading) return;
    setIcon({ ...icon, background });
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
                name="GrpName"
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
                  <FiPlus />
                )}
              </ConfirmBtn>
            </InputWrapper>
            {input.error && <ErrorMsg>{input.error}</ErrorMsg>}
          </InputContainer>
          <GroupIconContainer>
            <GroupIconInputLabel>
              Pick a icon letter [A-Z]
              <GroupIconInput
                disabled={isLoading}
                name="IconName"
                type="text"
                spellCheck={false}
                autoComplete="off"
                value={icon.letter.val}
                keyDown={allowInput}
                onChange={handleIconLettetChange}
                className={icon.letter.error ? "error" : ""}
              />
              {icon.letter.error && <ErrorIcon />}
            </GroupIconInputLabel>
            <GroupIconColorContainer>
              <GroupIconBgLabel>Pick a icon background</GroupIconBgLabel>
              <GroupIconWrapper>
                {GrpIcons.map((item, index) => {
                  const isSelected = item === icon.background;
                  return (
                    <GroupIcon
                      disabled={isLoading}
                      bg={item}
                      key={index}
                      onClick={() => changeIconBg(item)}
                    >
                      {isSelected && <TiTick />}
                    </GroupIcon>
                  );
                })}
              </GroupIconWrapper>
            </GroupIconColorContainer>
          </GroupIconContainer>
          {contacts.length === 0 ? (
            <AlertMsg>No contacts found</AlertMsg>
          ) : (
            <MembersContainer>
              <PickMsg>
                Selected group members:{" "}
                <b style={{ fontWeight: 500, fontSize: "0.9rem" }}>
                  {members.length}
                </b>
              </PickMsg>
              {contacts
                .filter((item) => !item.isBlocked)
                .map((item, index) => (
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
                    <Selected>
                      <TickBox>{isSelected(item.email) && <TiTick />}</TickBox>
                    </Selected>
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
  min-height: 60px;

  @media (max-width: 484px) {
    min-height: 45px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  height: 38px;

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
  width: 40px;
  border: none;
  outline: none;
  border-radius: 0 4px 4px 0;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  color: #fff;
  position: relative;
  cursor: pointer;
  background: #085ed4;
  transition: background 0.25s ease-in-out;

  :enabled:hover {
    background: #206ed8;
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
  margin-top: 20px;
`;

const MemberSelect = styled.button`
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 8px;
  background: ${(props) => props.theme.border.inputbox};
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
  font-size: 0.9rem;
  width: 34px;
  flex-shrink: 0;
`;

const TickBox = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${(props) => props.theme.txt.sub};
`;

const GroupIconContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupIconInput = styled.input`
  flex-shrink: 0;
  width: 38px;
  height: 20px;
  height: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
  background: none;
  color: ${(props) => props.theme.txt.main};
  margin-left: 10px;
  margin-right: 5px;
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;

  &.error {
    border-bottom: 1px solid ${(props) => props.theme.txt.danger};
  }
`;

const GroupIconColorContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  margin-top: 10px;
`;

const GroupIcon = styled.button`
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  outline: none;
  background: ${(props) => props.bg};
  border: 2px solid ${(props) => props.bg};
  margin-left: 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #fff;
`;

const GroupIconInputLabel = styled.label`
  font-size: 0.75rem;
  display: flex;
  align-items: flex-end;
  margin: 12px 0;
  color: ${(props) => props.theme.txt.sub};
`;

const GroupIconWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ErrorIcon = styled(MdOutlineErrorOutline)`
  font-size: 1rem;
  color: ${(props) => props.theme.txt.danger};
`;

const GroupIconBgLabel = styled.span`
  display: block;
  color: ${(props) => props.theme.txt.sub};
  font-size: 0.75rem;
  margin-right: 10px;
`;
