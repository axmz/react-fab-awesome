import React, { useContext } from "react";
// Style
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import theme from "../globalMixins";
import "../Styles.scss";
// Components
import Overlay from "../Overlay/OverlayContainer";
import SmallButton from "../SmallButton/SmallButtonContainer";
import MediumButton from "../MediumButton/MediumButtonContainer";
import LargeButton from "../LargeButton/LargeButtonContainer";
// Context
import { Context } from "../../../context/Context";
// SVG
import { ReactComponent as Arrow } from "../../../assets/arrow.svg";
import { ReactComponent as Plus } from "../../../assets/plus.svg";
// Spring
import { useChain } from "react-spring";

const C = styled.div<any>`
  position: absolute;
  bottom: 0;
  ${({ left }) => (!left ? `left: 0` : "right: 0")};
  z-index: 20;
`;

const Container = () => {
  //////////////////////////////////////// Context
  const { checked } = useContext(Context);
  const ctx = useContext(Context);
  const { open } = ctx;
  const collectedRefs = ctx.collectedRefs!;

  //////////////////////////////////////// CHAIN
  const springStart = 0;
  const transitionDelay = 0.2;

  useChain(open ? collectedRefs : collectedRefs.slice().reverse(), [springStart, transitionDelay]);

  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <C left={checked}>
        <SmallButton Icon={Arrow} />
        <MediumButton />
        <LargeButton Icon={Plus} />
      </C>
    </ThemeProvider>
  );
};

export default Container;
