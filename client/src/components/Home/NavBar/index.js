import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { MdPermContactCalendar, MdGroupAdd } from "react-icons/md";
import { BsMoonFill } from "react-icons/bs";
import { HiOutlineSun } from "react-icons/hi";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiLogOut } from "react-icons/bi";

import Logo from "../../Logo";
import { ThemeContext } from "../../../context/ThemeContext";
import { getAvatar } from "../../../assets/avatars";

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
    icon: <MdPermContactCalendar />,
    navTo: "/contacts",
  },
  {
    id: "nav_groups",
    placeholder: "Groups",
    icon: <MdGroupAdd />,
    navTo: "/groups",
  },
  {
    id: "nav_settings",
    placeholder: "Settings",
    icon: <IoIosSettings />,
    navTo: "/settings",
  },
  {
    id: "nav_logout",
    placeholder: "Logout",
    icon: <BiLogOut />,
    navTo: "/logout",
  },
];

export default function NavBarContainer() {
  const avatarId = useSelector((state) => state.user.details.avatarId);

  return (
    <Container>
      <Logo center />
      <Navs>
        {navBtns.map((nav, index) => (
          <NavBtnContainer key={index}>
            <NavBtn title={nav.placeholder} to={nav.navTo} id={nav.id}>
              <NavBorder />
              {nav.icon}
            </NavBtn>
          </NavBtnContainer>
        ))}
      </Navs>
      <Wrapper>
        <ThemeSwitch />
        <Profile to="/profile">
          <ProfileImg src={getAvatar(avatarId)} />
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
  grid-row-start: 1;
  grid-column-start: 1;
  grid-row-end: 2;
  grid-column-end: 2;
  min-height: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 920px) {
    grid-row-start: 2;
    grid-column-start: 1;
    grid-row-end: 3;
    grid-column-end: 2;
    flex-direction: row;
  }
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

  @media (max-width: 920px) {
    width: 16.7%;
    height: 100%;
    margin: 0;
  }
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

  @media (max-width: 920px) {
    width: 100%;
    height: 4px;
    top: auto;
    right: 0;
    border-radius: 4px 4px 0 0;
  }
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

  @media (max-width: 920px) {
    font-size: 1.2rem;
  }
`;

const Navs = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  margin: 10px 0;

  ::before,
  ::after {
    content: "";
    margin: auto;
  }

  @media (max-width: 920px) {
    height: 100%;
    width: 83.5%;
    flex-direction: row;
    justify-content: space-between;
    margin: 0;

    ::before,
    ::after {
      content: none;
      margin: auto;
    }
  }
`;

const Wrapper = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 920px) {
    width: 16.5%;
    height: 100%;
  }
`;

const Profile = styled(NavLink)`
  width: 34px;
  height: 34px;
  display: block;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50%;
  background-color: ${(props) => props.theme.btn.active};

  @media (max-width: 920px) {
    width: 30px;
    height: 30px;
  }
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
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
  overflow: hidden;

  @media (max-width: 920px) {
    display: none;
  }
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
