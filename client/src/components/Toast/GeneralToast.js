import React from "react";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";
import { IoInformationSharp, IoClose } from "react-icons/io5";

import toast from "./";

export default function GeneralToast({ type = "info", message = "..." }) {
  function getType() {
    switch (type) {
      case "success":
        return {
          icon: <TiTick />,
          bg: "#2d9d41",
        };
      case "error":
        return {
          icon: <IoClose />,
          bg: "#FF2B20",
        };
      default:
        return { icon: <IoInformationSharp />, bg: "#3C90AB" };
    }
  }
  const { icon, bg } = getType();

  return (
    <Container bg={bg}>
      <CloseIcon onClick={() => toast.remove()} />
      <Icon bg={bg}>{icon}</Icon>
      <Message>{message}</Message>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  cursor: auto;
  padding: 3px 28px 3px 12px;
`;

const Icon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  margin-right: 10px;
  background-color: #fff;
  color: ${(props) => props.bg};
  flex-shrink: 0;
  pointer-events: none;
`;

const Message = styled.p`
  flex: 1;
  font-size: 0.7rem;
  line-height: 17px;
  color: ${(props) => props.theme.toast.txtBold};
  font-weight: 300;
  pointer-events: none;
`;

const CloseIcon = styled(IoClose)`
  position: absolute;
  top: -3px;
  right: 6px;
  font-size: 0.85rem;
  color: #fff;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;

  :hover {
    opacity: 1;
  }
`;
