import React, { useContext } from "react";
import styled from "styled-components";
import { animated, useSpring } from "react-spring";

const O = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

interface Props {
  isOpen: boolean;
  handleClick: () => void
}

const Overlay: React.FC<Props> = ({handleClick, isOpen = false }) => {
  const { opacity } = useSpring({ opacity: isOpen ? 1 : 0, from: { opacity: 0 } });

  let styles = {
    zIndex: isOpen ? 1 : -1,
    opacity: opacity,
    touchAction: isOpen ? "auto" : "none",
  };

  return <O onClick={handleClick} style={styles}></O>;
};

export default Overlay;
