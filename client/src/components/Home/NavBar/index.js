import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { BsMoonFill } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiLogOut } from "react-icons/bi";

import Tooltip from "../Tooltip";
import Logo from "../../Logo";
import profileImg from "../../../assets/avatars/2.svg";
import { ThemeContext } from "../../../context/ThemeContext";

const navBtns = [
  {
    id: "nav_msg",
    placeholder: "Chat",
    icon: <HiChatBubbleLeftRight />,
    navTo: "/",
  },
  {
    id: "nav_contacts",
    placeholder: "Contacts",
    icon: <MdSupervisorAccount />,
    navTo: "/contacts",
  },
  {
    id: "nav_settings",
    placeholder: "Settings",
    icon: <IoIosSettings />,
    navTo: "/settings",
  },
  {
    id: "nav_group",
    placeholder: "Create group",
    icon: <AiOutlinePlus />,
    navTo: "/group",
  },
  {
    id: "nav_logout",
    placeholder: "Logout",
    icon: <BiLogOut />,
    navTo: "/logout",
  },
];

export default function NavBarContainer() {
  return (
    <Container>
      <Logo center />
      <Navs>
        {navBtns.map((nav, index) => (
          <NavBtnContainer key={index}>
            <NavBtn to={nav.navTo} id={nav.id}>
              <NavBorder />
              {nav.icon}
            </NavBtn>
            <Tooltip id={nav.id} msg={nav.placeholder} />
          </NavBtnContainer>
        ))}
      </Navs>
      <Wrapper>
        <ThemeSwitch />
        <Profile to="/myself">
          <ProfileImg src={profileImg} alt="User profile image" />
        </Profile>
      </Wrapper>
    </Container>
  );
}

function ThemeSwitch() {
  const { appTheme, handleTheme } = useContext(ThemeContext);

  const currentTheme = () => {
    if (appTheme === "light") return "dark";
    return "light";
  };

  return (
    <Switch onClick={() => handleTheme(currentTheme())}>
      <SwitchLabel className={appTheme} />
      <BsFillMoonFillCustom className={appTheme === "dark" ? "show" : "hide"} />
      <HiOutlineSunCustom className={appTheme === "dark" ? "hide" : "show"} />
    </Switch>
  );
}

const Container = styled.nav`
  width: 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NavBtnContainer = styled.div`
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const NavBorder = styled.span`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 5px;
  background: none;
  border-radius: 0 5px 5px 0;
`;

const NavBtn = styled(NavLink)`
  width: auto;
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  background: none;
  color: ${(props) => props.theme.txt.sub};
  border: none;
  font-size: 1.4rem;

  &.active ${NavBorder} {
    background: ${(props) => props.theme.txt.main};
  }

  &.active {
    color: ${(props) => props.theme.txt.main};
  }

  &:hover {
    color: ${(props) => props.theme.txt.main};
  }
`;

const Navs = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: auto;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = styled(NavLink)`
  width: 34px;
  height: 34px;
  display: block;
  border-radius: 50%;
  border: none;
  outline: none;
  background: none;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Switch = styled.button`
  width: 28px;
  height: 52px;
  margin-bottom: 14px;
  border-radius: 15px;
  border: none;
  outline: none;
  position: relative;
  cursor: pointer;
  background: ${(props) => `${props.theme.bg.container}`};
`;

const SwitchLabel = styled.span`
  display: block;
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.theme.txt.main};
  border-radius: 50%;
  left: 50%;
  transition: transform 0.3s ease-in-out;

  &.dark {
    top: 40%;
    transform: translate(-50%, -100%);
  }

  &.light {
    top: 60%;
    transform: translate(-50%, 0);
  }
`;

const BsFillMoonFillCustom = styled(BsMoonFill)`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.7rem;
  color: ${(props) => props.theme.txt.main};
  transition: opacity 0.5s ease-in;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }
`;

const HiOutlineSunCustom = styled(HiOutlineSun)`
  position: absolute;
  top: 28%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.1rem;
  color: ${(props) => props.theme.txt.main};
  transition: opacity 0.5s ease-in;

  &.show {
    opacity: 1;
  }

  &.hide {
    opacity: 0;
  }
`;
