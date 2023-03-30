import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import axios from "../../../api/axios";
import Modal from "../Modal";
import toast from "../../Toast";

const modalStyle = {
  maxWidth: "500px",
  height: "auto",
};

export default function Logout() {
  const navigate = useNavigate();

  const noRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    noRef.current.focus();
  }, []);

  const handleNo = (e) => {
    e.preventDefault();
    if (loading) return;
    return navigate("/", { replace: true });
  };

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);
    await axios
      .post("/logout")
      .then(() => {
        toast.remove();
        return navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        toast.error(
          "Something went wrong. Failed to Log out. Please try after sometime"
        );
        setLoading(false);
      });
  };

  return (
    <Modal isLoading={loading} style={modalStyle}>
      <Container>
        <Description>Are you sure you want to logout?</Description>
        <BtnContainer onSubmit={handleNo}>
          <Btn type="button" onClick={handleLogout} disabled={loading}>
            Yes
          </Btn>
          <Btn ref={noRef} type="submit" onClick={handleNo} disabled={loading}>
            No
          </Btn>
        </BtnContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Description = styled.h2`
  padding: 0.8rem;
  font-size: 0.9rem;
  text-align: center;
  color: ${(props) => props.theme.txt.main};
  font-weight: 400;

  @media (max-width: 484px) {
    font-size: 0.8rem;
  }
`;

const BtnContainer = styled.form`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

const Btn = styled.button`
  display: block;
  margin: auto 8px;
  width: 80px;
  padding: 8px 0;
  border-radius: 4px;
  border: none;
  font-size: 0.64rem;
  background: ${(props) => props.theme.btn.active};
  border: 1px solid ${(props) => props.theme.btn.active};
  color: ${(props) => props.theme.txt.main};
  cursor: pointer;
  font-weight: 400;
  outline-color: ${(props) => props.theme.border.outline};

  @media (max-width: 484px) {
    font-size: 0.6rem;
  }

  :hover {
    border: 1px solid ${(props) => props.theme.txt.main};
  }
`;
