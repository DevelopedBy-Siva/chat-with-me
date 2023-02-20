import React from "react";
import styled from "styled-components";
import { TiTick } from "react-icons/ti";

export default function Checkbox({ isChecked, ...rest }) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox checked={isChecked} {...rest} />
      <StyledCheckbox checked={isChecked ? 1 : 0}>
        <Icon />
      </StyledCheckbox>
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  position: relative;
  bottom: 1px;
  padding-right: 8px;
`;

const Icon = styled(TiTick)`
  font-size: 1rem;
  color: ${(props) => props.theme.txt.main};
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
    props.checked ? props.theme.txt.highlight : props.theme.checkbox.bg};
  border-radius: 2px;
  transition: all 150ms;
  display: flex;
  justify-content: center;
  align-items: center;

  ${Icon} {
    visibility: ${(props) => (props.checked ? "visible" : "hidden")};
  }
`;
