import React from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { MdDeleteForever, MdPersonOff, MdBlock } from "react-icons/md";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsFillPencilFill } from "react-icons/bs";

import Tooltip from "../Tooltip";
import Avatar from "../../../assets/svgs/avatars/6.svg";

const CONTAINER_WIDTH = "280px";
const options = [
  {
    id: "block-user",
    icon: <MdBlock />,
    placeholder: "Block user",
  },
  {
    id: "clear-user-chat",
    icon: <MdDeleteForever />,
    placeholder: "Clear chat",
  },
  {
    id: "unfriend-user",
    icon: <MdPersonOff />,
    placeholder: "Remove contact",
  },
];

export default function ReceiverInfoContainer({ infoVisible, setInfoVisible }) {
  const transition = useTransition(infoVisible, {
    from: {
      marginRight: `-${CONTAINER_WIDTH}`,
    },
    enter: {
      marginRight: "0px",
    },
    leave: {
      marginRight: `-${CONTAINER_WIDTH}`,
    },
  });

  return transition(
    (style, item) =>
      item && (
        <UserInfoContainer as={animated.div} style={style}>
          <UserInfoCloseBtn onClick={() => setInfoVisible(false)}>
            <BiRightArrowAlt />
          </UserInfoCloseBtn>
          <UserInfoWrapper>
            <UserAvatar src={Avatar} />
            <UserInfoName>Hrithik roshan</UserInfoName>
            <NicknameContainer>
              <NicknameTitle>#nick&#32;</NicknameTitle>
              <Nickname>duke nukem</Nickname>
              <ChangeNicknameBtn>
                <BsFillPencilFill id="change-nickname" />
                <Tooltip id="change-nickname" msg="Change nickname" />
              </ChangeNicknameBtn>
            </NicknameContainer>
            <UserDescription>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </UserDescription>
            <UserOperations>
              {options.map((op, index) => (
                <React.Fragment key={index}>
                  <UserOperationBtn id={op.id}>{op.icon}</UserOperationBtn>
                  <Tooltip id={op.id} msg={op.placeholder} />
                </React.Fragment>
              ))}
            </UserOperations>
          </UserInfoWrapper>
        </UserInfoContainer>
      )
  );
}

const UserInfoContainer = styled.div`
  width: ${CONTAINER_WIDTH};
  flex-shrink: 0;
  position: relative;
  background-color: ${(props) => props.theme.bg.container};
`;

const UserInfoCloseBtn = styled.button`
  position: absolute;
  left: 8px;
  top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  color: ${(props) => props.theme.txt.main};
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transform: scale(1.2);
  z-index: 1;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: scale(1.3);
  }
`;

const UserInfoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.bg.app};
    border-radius: 4px;
  }
`;

const UserAvatar = styled.img`
  margin-top: 2rem;
  width: 50%;
  background: none;
  border-radius: 50%;
  display: block;
`;

const UserInfoName = styled.span`
  margin-top: 1.4rem;
  font-size: 1.2rem;
  width: 100%;
  display: block;
  color: ${(props) => props.theme.txt.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  text-align: center;
  font-weight: 400;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  width: 100%;
  color: ${(props) => props.theme.txt.sub};
  opacity: 1;
  margin-top: 5px;
`;

const Nickname = styled.span`
  display: block;
  font-size: 0.7rem;
  text-transform: capitalize;
  margin: 0 4px;
  color: ${(props) => props.theme.txt.main};
  font-weight: 400;
`;

const NicknameTitle = styled.span`
  display: block;
  text-transform: lowercase;
  font-size: 0.6rem;
  font-style: italic;
  font-weight: 400;
`;

const ChangeNicknameBtn = styled.button`
  font-size: 0.6rem;
  display: block;
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.txt.main};
  cursor: pointer;
`;

const UserDescription = styled.span`
  display: block;
  font-size: 0.65rem;
  color: ${(props) => props.theme.txt.main};
  text-align: center;
  margin: 1.2rem 0;
  line-height: 15px;
`;

const UserOperations = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserOperationBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
  font-size: 1.4rem;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.txt.main};
  background-color: ${(props) => props.theme.btn.active};
  width: 56px;
  height: 56px;
  transition: font-size 0.3s ease-in-out;
  :hover {
    font-size: 1.2rem;
  }
`;
