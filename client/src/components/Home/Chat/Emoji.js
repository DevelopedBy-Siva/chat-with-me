import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsFillEmojiSmileFill } from "react-icons/bs";

export default function EmojiContainer() {
  const [visible, setVisible] = useState(false);
  const pickerBtnRef = useRef(null);

  return (
    <Container>
      <EmojiBtn
        ref={pickerBtnRef}
        type="button"
        onClick={() => setVisible((val) => !val)}
        visible={visible}
      >
        <BsFillEmojiSmileFill />
      </EmojiBtn>
      {visible && (
        <EmojiPicker visibility={setVisible} pickerBtnRef={pickerBtnRef} />
      )}
    </Container>
  );
}

function EmojiPicker({ visibility, pickerBtnRef }) {
  const emojiRef = useRef(null);

  useEffect(() => {
    function clientClick(event) {
      const closeIt =
        pickerBtnRef &&
        !pickerBtnRef.current.contains(event.target) &&
        emojiRef &&
        !emojiRef.current.contains(event.target);
      if (closeIt) visibility(false);
    }
    document.addEventListener("click", clientClick);
    return () => {
      document.removeEventListener("click", clientClick);
    };
  });

  return (
    <EmojiWrapper ref={emojiRef}>
      <Picker
        data={data}
        previewPosition="none"
        emojiButtonSize={28}
        emojiSize={18}
        maxFrequentRows={1}
        searchPosition="none"
        navPosition="bottom"
      />
    </EmojiWrapper>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmojiBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;

  color: ${(props) =>
    props.visible ? props.theme.txt.main : props.theme.txt.sub};
  height: auto;
  font-size: 1.2rem;

  &:hover {
    color: ${(props) => props.theme.txt.main};
  }
`;

const EmojiWrapper = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 40px;
  right: -5px;
  em-emoji-picker {
    --category-icon-size: 16px;
    --font-size: 0.6rem;
    --rgb-accent: ${(props) => props.theme.emoji.navIcon};
    --rgb-background: ${(props) => props.theme.emoji.background};
    --rgb-color: ${(props) => props.theme.emoji.title};
    height: 300px;
  }
`;
