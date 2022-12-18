import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSmile } from "react-icons/bs";

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
        <BsEmojiSmile />
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
    props.visible
      ? props.theme.background.highlight.hex
      : props.theme.text.sub};
  height: auto;
  font-size: 68%;
  :hover {
    color: ${(props) => props.theme.background.highlight.hex};
  }
`;

const EmojiWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  right: 0;
  em-emoji-picker {
    --category-icon-size: 16px;
    --font-size: 60%;
    --rgb-accent: ${(props) => props.theme.emoji.navIcon};
    --rgb-background: ${(props) => props.theme.emoji.background};
    --rgb-color: ${(props) => props.theme.emoji.title};
    height: 300px;
  }
`;
