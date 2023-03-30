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
          bg: "#ff0000",
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
  width: 90%;
  max-width: 310px;
  background: ${(props) => props.bg};
  padding: 10px 15px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
    rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  cursor: auto;
`;

const Icon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  margin-right: 20px;
  background-color: #fff;
  color: ${(props) => props.bg};
  flex-shrink: 0;
`;

const Message = styled.p`
  flex: 1;
  font-size: 0.7rem;
  line-height: 17px;
  color: ${(props) => props.theme.toast.txtBold};
  font-weight: 300;
`;
