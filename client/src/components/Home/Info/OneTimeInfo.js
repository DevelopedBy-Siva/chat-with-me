import React, { useEffect } from "react";
import FocusLock from "react-focus-lock";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Lottie from "lottie-react";

import chatAim from "../../../assets/anim/chat.json";

export default function OneTimeInfo() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const userDetails = useSelector((state) => state.user.details);

  const navigate = useNavigate();

  const navigateTo = () => navigate("/profile");

  return (
    <FocusLock>
      <Container>
        <Overlay />
        <DetailsContainer>
          <Content>
            <Anim>
              <Lottie
                style={{ width: "inherit" }}
                animationData={chatAim}
                loop={true}
              />
            </Anim>
            <Welcome>Welcome to ChatWithMe</Welcome>
            <Details>
              Hi <Highlight>{userDetails.name}</Highlight>,
              <br />
              This website was made as part of a personal project, so many of
              the features are limited to the users. By clicking <i>Continue</i>
              , you will now be redirected to the profile page where you can
              update your profile details. <br />
              <br />
              Regards,
              <br />
              Developer
            </Details>
            <RedirectBtn onClick={navigateTo}>Continue</RedirectBtn>
          </Content>
        </DetailsContainer>
      </Container>
    </FocusLock>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100dvh;
  z-index: 999999;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => props.theme.bg.overlay};
  opacity: 0.9;
`;

const DetailsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgb(0, 165, 248);
  background: linear-gradient(
    90deg,
    rgba(0, 165, 248, 1) 29%,
    rgba(0, 136, 248, 1) 100%
  );
  padding: 1.2rem;
  border-radius: 10px;
  width: 95%;
  max-height: 90%;
  max-width: 480px;
  min-height: 0;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  overflow: auto;
  flex: 1;
  padding: 4px;
  min-height: 0;
`;

const Details = styled.p`
  line-height: 20px;
  font-size: 0.8rem;
  user-select: none;
  color: #fff;

  @media (max-width: 678px) {
    font-size: 0.7rem;
    line-height: 18px;
  }
`;

const RedirectBtn = styled.button`
  display: block;
  margin-left: auto;
  font-size: 0.7rem;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  letter-spacing: 1px;
  background: #fff;
  color: #1b1b1b;
  border: none;
  font-weight: 400;
  outline-color: rgba(0, 136, 248, 1);

  @media (max-width: 678px) {
    font-size: 0.65rem;
  }
`;

const Highlight = styled.span`
  font-weight: 500;
  text-transform: capitalize;
`;

const Welcome = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  margin: 12px 0 18px 0;

  @media (max-width: 678px) {
    font-size: 0.9rem;
  }
`;

const Anim = styled.div`
  width: 120px;
  margin: auto;

  @media (max-width: 678px) {
    width: 80px;
  }
`;
