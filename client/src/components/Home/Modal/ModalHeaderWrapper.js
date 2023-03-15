import React from "react";
import styled from "styled-components";

export default function ModalHeaderWrapper({ style = {}, children }) {
  return <Heading style={style}>{children}</Heading>;
}

const Heading = styled.h2`
  margin-bottom: 10px;
  font-size: 1.1rem;
  font-weight: 500;
  user-select: none;
  color: ${(props) => props.theme.txt.main};
  margin: 0.6rem;
  padding-bottom: 6px;
  border-bottom: 1px solid ${(props) => props.theme.border.inputbox};
  flex-shrink: 0;
`;
