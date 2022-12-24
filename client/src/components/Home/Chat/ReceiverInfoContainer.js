import React from "react";
import styled from "styled-components";
import { useTransition, animated } from "react-spring";
import { MdDeleteForever, MdPersonOff, MdBlock } from "react-icons/md";
import { BiPencil, BiRightArrowAlt } from "react-icons/bi";

import Tooltip from "../../Tooltip";
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
    placeholder: "Unfriend",
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
              <NicknameTitle>#nick</NicknameTitle>
              <Nickname>duke nukem</Nickname>
              <ChangeNicknameBtn id="change-nickname">
                <BiPencil />
              </ChangeNicknameBtn>
              <Tooltip id="change-nickname" msg="Change nickname" />
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
  border: 1px solid ${(props) => props.theme.background.app};
  border-right: 0;
  border-bottom: 0;
  flex-shrink: 0;
  position: relative;
`;

const UserInfoCloseBtn = styled.button`
  position: absolute;
  left: 8px;
  top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.background.container};
  color: ${(props) => props.theme.text.sub};
  border: none;
  outline: none;
  border-radius: 50%;
  font-size: 60%;
  cursor: pointer;
  transform: scale(1);
  z-index: 1;
  transition: transform 0.4s ease-in-out;

  :hover {
    transform: scale(1.1);
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
    background: ${(props) => props.theme.background.app};
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
  font-size: 60%;
  width: 100%;
  display: block;
  color: ${(props) => props.theme.text.main};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
  text-align: center;
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: ${(props) => props.theme.text.sub};
  opacity: 1;
`;

const Nickname = styled.span`
  display: block;
  font-size: 30%;
  text-transform: capitalize;
  margin: 0 4px;
  color: white;
`;

const NicknameTitle = styled.span`
  display: block;
  text-transform: lowercase;
  font-size: 30%;
  font-style: italic;
`;

const ChangeNicknameBtn = styled.button`
  font-size: 30%;
  display: block;
  border: none;
  outline: none;
  background: none;
  color: ${(props) => props.theme.text.main};
  cursor: pointer;
`;

const UserDescription = styled.span`
  display: block;
  font-size: 30%;
  color: ${(props) => props.theme.text.sub};
  text-align: center;
  margin-top: 0.8rem;
`;

const UserOperations = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1rem;
`;

const UserOperationBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 8px;
  font-size: 80%;
  border-radius: 5px;
  padding: 8px;
  outline: none;
  border: none;
  color: ${(props) => props.theme.text.main};
  background-color: ${(props) => props.theme.background.containerLight};
  width: 60px;
  height: 60px;
  transition: all 0.4s ease-in-out;
  :hover {
    font-size: 72%;
    background-color: ${(props) => props.theme.background.highlight.hex};
  }
`;
