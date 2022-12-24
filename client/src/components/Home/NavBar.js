import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { TbMessages } from "react-icons/tb";

import Tooltip from "../Tooltip";

const navBtns = [
  {
    id: "nav_msg",
    placeholder: "Chat",
    icon: <TbMessages className="iconStyle" />,
    navTo: "/",
  },
  {
    id: "nav_friends",
    placeholder: "Friends",
    icon: <MdSupervisorAccount className="iconStyle" />,
    navTo: "/friends",
  },
  {
    id: "nav_group",
    placeholder: "Create group",
    icon: <AiOutlinePlus className="iconStyle" />,
    navTo: "/group",
  },
  {
    id: "nav_settings",
    placeholder: "Settings",
    icon: <IoIosSettings className="iconStyle" />,
    navTo: "/settings",
  },
];

export default function NavBarContainer() {
  return (
    <Container>
      {navBtns.map((nav, index) => (
        <React.Fragment key={index}>
          <NavBtn to={nav.navTo} id={nav.id}>
            {nav.icon}
          </NavBtn>
          <Tooltip id={nav.id} msg={nav.placeholder} />
        </React.Fragment>
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

const NavBtn = styled(NavLink)`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  cursor: pointer;
  outline: none;
  color: ${(props) => props.theme.text.main};
  border-right: none;
  border: ${(props) => `1px solid ${props.theme.background.container}`};
  border-left: ${(props) => `4px solid ${props.theme.background.container}`};

  &.active {
    background: ${(props) => props.theme.background.highlight.rgba};
    background-image: ${(props) =>
      `linear-gradient(to right, ${props.theme.background.highlight.rgba}, ${props.theme.background.container})`};
    border: ${(props) => `1px solid ${props.theme.background.highlight.rgba}`};
    border-left: ${(props) =>
      `4px solid ${props.theme.background.highlight.hex}`};
  }

  .iconStyle {
    font-size: 90%;
  }
`;
