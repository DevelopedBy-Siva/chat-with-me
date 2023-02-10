import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { MdSupervisorAccount } from "react-icons/md";
import { TbMessages } from "react-icons/tb";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { IoMdSunny } from "react-icons/io";

import Tooltip from "../Tooltip";
import Logo from "../../Logo";
import profileImg from "../../../assets/svgs/avatars/6.svg";
import { ThemeContext } from "../../../context/ThemeContext";

const navBtns = [
  {
    id: "nav_msg",
    placeholder: "Chat",
    icon: <TbMessages />,
    navTo: "/",
  },
  {
    id: "nav_friends",
    placeholder: "Friends",
    icon: <MdSupervisorAccount />,
    navTo: "/friends",
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
    icon: <AiOutlinePlus className="iconStyle" />,
    navTo: "/group",
  },
];

export default function NavBarContainer() {
  return (
    <Container>
      <Logo center />
      <Navs>
        {navBtns.map((nav, index) => (
          <React.Fragment key={index}>
            <NavBtn to={nav.navTo} id={nav.id}>
              <NavBorder />
              {nav.icon}
            </NavBtn>
            <Tooltip id={nav.id} msg={nav.placeholder} />
          </React.Fragment>
        ))}
      </Navs>
      <Wrapper>
        <ThemeSwitch />
        <Profile>
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
      <SwitchLabel className={appTheme}>
        {appTheme === "dark" ? (
          <BsFillMoonStarsFill />
        ) : (
          <IoMdSunny className="sunny" />
        )}
      </SwitchLabel>
    </Switch>
  );
}

const Container = styled.nav`
  width: 64px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const NavBorder = styled.span`
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 6px;
  background: none;
  border-radius: 0 5px 5px 0;
`;

const NavBtn = styled(NavLink)`
  width: 100%;
  flex-shrink: 0;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
  outline: none;
  color: ${(props) => props.theme.txt.sub};
  border: none;
  font-size: 1.4rem;

  &.active ${NavBorder} {
    background: ${(props) => props.theme.txt.sub};
  }
`;

const Navs = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Profile = styled.button`
  width: 38px;
  height: 38px;
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
`;

const Switch = styled.button`
  width: 35px;
  height: 55px;
  margin-bottom: 14px;
  border-radius: 15px;
  border: none;
  outline: none;
  position: relative;
  cursor: pointer;
  background: ${(props) => `${props.theme.btn.inactive}`};
`;

const SwitchLabel = styled.span`
  display: block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => `${props.theme.txt.main}`};
  background: ${(props) => `${props.theme.bg.app}`};
  transition: transform 0.3s ease-in-out;

  &.dark {
    transform: translate(-50%, -88%);
    font-size: 0.7rem;
  }

  &.light {
    transform: translate(-50%, -12%);
    font-size: 0.9rem;
  }
`;
