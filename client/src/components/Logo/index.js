import React from "react";
import styled from "styled-components";
import { RiChatSmile3Fill } from "react-icons/ri";

export default function Logo({ background = false }) {
  return (
    <LogoContainer bg={background ? 1 : 0}>
      <Icon />
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.bg ? props.theme.txt.highlight : "none")};
  color: ${(props) => props.theme.txt.sub};
  height: 60px;
  width: 55px;
`;

const Icon = styled(RiChatSmile3Fill)`
  font-size: 1.8rem;
`;
