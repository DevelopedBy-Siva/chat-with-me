import React from "react";
import styled from "styled-components";

export default function AnotherDevice() {
  return (
    <Container>
      <InfoContainer>
        <Info>
          ChatWithMe is already open in another window. To continue here, please
          close that window and try again.
        </Info>
        <TryAgainBtn onClick={() => (window.location = "/")}>
          Try again
        </TryAgainBtn>
      </InfoContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InfoContainer = styled.div`
  padding: 25px;
  border-radius: 4px;
  background: ${(props) => props.theme.bg.container};
  width: 95%;
  max-width: 400px;
  line-height: 18px;
  font-size: 0.75rem;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`;

const Info = styled.p`
  color: ${(props) => props.theme.txt.main};
`;

const TryAgainBtn = styled.button`
  display: block;
  margin: auto;
  margin-top: 15px;
  padding: 6px 10px;
  font-size: 0.7rem;
  cursor: pointer;
  background: #085ed4;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 2px;

  :enabled:hover {
    background: #206ed8;
  }
`;
