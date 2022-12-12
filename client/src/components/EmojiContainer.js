import React from "react";
import { BsEmojiSmile } from "react-icons/bs";
import styled from "styled-components";

export default function EmojiContainer() {
  return (
    <Container>
      <EmojiIcon />
    </Container>
  );
}

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`;

const EmojiIcon = styled(BsEmojiSmile)`
  color: ${(props) => props.theme.text.sub};
  height: auto;
  font-size: 140%;
`;
