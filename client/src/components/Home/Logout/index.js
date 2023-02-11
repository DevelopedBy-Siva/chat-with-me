import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { logout } from "../../../utils/Auth";

export default function Logout() {
  const navigate = useNavigate();

  const noRef = useRef(null);

  useEffect(() => {
    noRef.current.focus();
  }, []);

  const handleNo = (e) => {
    e.preventDefault();
    return navigate("/", { replace: true });
  };

  const handleLogout = () => {
    logout();
    return navigate("/sign-in", { replace: true });
  };

  return (
    <Container>
      <Description>Are you sure you want to logout?</Description>
      <BtnContainer onSubmit={handleNo}>
        <Btn type="button" onClick={handleLogout}>
          Yes
        </Btn>
        <Btn ref={noRef} type="submit" onClick={handleNo}>
          No
        </Btn>
      </BtnContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Description = styled.h2`
  font-size: 1.1rem;
  text-align: center;
`;

const BtnContainer = styled.form`
  display: flex;
  justify-content: center;
  padding-top: 24px;
  padding-bottom: 10px;
`;

const Btn = styled.button`
  display: block;
  margin: auto 8px;
  width: 80px;
  padding: 8px 0;
  border-radius: 4px;
  border: none;
  background: ${(props) => props.theme.btn.inactive};
  color: ${(props) => props.theme.txt.main};
  cursor: pointer;
`;
