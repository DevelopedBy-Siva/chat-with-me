import React from "react";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";
import { IoInformationSharp, IoClose } from "react-icons/io5";

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
      <Icon bg={bg}>{icon}</Icon>
      <Message>{message}</Message>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: auto;
  padding: 3px 12px;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  margin-right: 15px;
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
