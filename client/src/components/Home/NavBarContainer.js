import React, { useState } from "react";
import styled from "styled-components";
import { IoIosSettings } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { TbMessages } from "react-icons/tb";

const navBtns = [
  { icon: <TbMessages className="iconStyle" />, navTo: "" },
  { icon: <MdSupervisorAccount className="iconStyle" />, navTo: "" },
  { icon: <AiOutlinePlus className="iconStyle" />, navTo: "" },
  { icon: <IoIosSettings className="iconStyle" />, navTo: "" },
];

export default function NavBarContainer() {
  const [activeNav, setActiveNav] = useState(0);

  function handleNavigation(index) {
    setActiveNav(index);
  }

  return (
    <Container>
      {navBtns.map((nav, index) => (
        <NavBtn
          onClick={() => handleNavigation(index)}
          active={index === activeNav}
          key={index}
        >
          {nav.icon}
        </NavBtn>
      ))}
    </Container>
  );
}

const Container = styled.nav`
  width: 55px;
  height: 100%;
  background: ${(props) => props.theme.background.container};
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const NavBtn = styled.button`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  cursor: pointer;
  color: ${(props) => props.theme.text.main};
  background: ${(props) =>
    props.active ? props.theme.background.highlight.rgba : "none"};
  background-image: ${(props) =>
    props.active
      ? `linear-gradient(to right, ${props.theme.background.highlight.rgba}, ${props.theme.background.container})`
      : "none"};
  outline: none;
  border: ${(props) =>
    `1px solid ${
      props.active
        ? props.theme.background.highlight.rgba
        : props.theme.background.container
    }`};
  border-right: none;
  border-left: ${(props) =>
    `4px solid ${
      props.active
        ? props.theme.background.highlight.hex
        : props.theme.background.container
    }`};
  .iconStyle {
    font-size: 200%;
  }
`;
