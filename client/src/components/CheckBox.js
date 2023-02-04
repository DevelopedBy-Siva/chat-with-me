import React from "react";
import styled from "styled-components";

export default function Checkbox({ isChecked, ...rest }) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={isChecked} {...rest} />
      <StyledCheckbox checked={isChecked}>
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: absolute;
  top: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 13px;
  height: 13px;
  background: ${(props) =>
    props.checked ? props.theme.txt.highlight : props.theme.btn.inactive};
  border-radius: 2px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
