import React, { useContext } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";
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
    toggleOpen(!open);
    updateLog("Overlay clicked");
    updateLog("Open: " + !open);
  };

 const { number } = useSpring({ number: open ? 1 : 0, from: { number: 0 }})

  let styles = {
    zIndex: open ? 1 : -1,
    opacity: number,
    touchAction: open ? "auto" : "none"
  };

  return <O onClick={() => handleOverlayClick()} style={styles}></O>;
};

export default Overlay;
