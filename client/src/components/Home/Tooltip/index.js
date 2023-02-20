import React from "react";
import styled from "styled-components";
import { Tooltip as ReactTooltip } from "react-tooltip";

export default function Tooltip({ id, msg, position = "bottom", rest }) {
  return (
    <CustomToolTip anchorId={id} content={msg} place={position} {...rest} />
  );
}

const CustomToolTip = styled(ReactTooltip)`
  font-size: 0.56rem;
  background-color: ${(props) => props.theme.tooltip.background};
  color: ${(props) => props.theme.tooltip.text};
  opacity: 1 !important;
`;
