import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";
import { Clickable } from "../Container/Clickable"

const O = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

interface Props {
  overlayProps: Clickable;
  style: {};
}

const Overlay: React.FC<Props> = ({ overlayProps, style }) => {
  return (<O
    onClick={(e: any) => overlayProps.cb(e)}
    style={{ ...style, ...overlayProps.styles }}
  ></O>);
};

export default Overlay;
