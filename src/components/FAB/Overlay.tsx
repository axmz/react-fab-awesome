import React, { useContext } from "react";
import styled from "styled-components";
import {interpolate, animated } from "react-spring";
// Ctx
import { Context } from "../../context/Context";

const O = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

interface Props {}

const Overlay: React.FC<Props> = () => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const { open } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;

  const handleOverlayClick = () => {
    toggleOpen(!open)
    updateLog("Overlay clicked");
    updateLog("Open: " + !open);
  };

  return (
    <O
      onClick={() => handleOverlayClick()}
      style={{
        zIndex: open ? 1 : -1,
        // maybe interpolate on open only
        opacity: open ? 1 : 0,
        touchAction: open ? "auto" : "none"
        // opacity: y.to([0, height], [0, 1]),
        // touchAction: y.to(v => (v > 0 ? "auto" : "none"))
      }}
    ></O>
  );
};

export default Overlay;
