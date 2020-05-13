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
import { Context, ContextType } from "../../../context/FABContext";
// Spring
import { useChain } from "react-spring";
import { Button } from "./Button";

const C = styled.div<any>`
  position: absolute;
  bottom: 0;
  ${({ left }) => (!left ? `left: 0` : "right: 0")};
  z-index: 20;
`;

interface Props {
  open: boolean;
  left?: boolean;
  mediumButtons: Button[];
  smallButton: any;
  largeButton: any;
}

const Container: React.FC<Props> = ({
  open,
  left,
  smallButton,
  largeButton,
  mediumButtons,
}) => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const collectedRefs = ctx.collectedRefs!;

  //////////////////////////////////////// CHAIN
  const springStart = 0;
  const transitionDelay = 0.15;

  useChain(open ? collectedRefs : collectedRefs.slice().reverse(), [
    springStart,
    transitionDelay,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Overlay />
      <C left={left}>
        <SmallButton
          open={open}
          smallButton={smallButton}
          buttonsCount={mediumButtons.length}
        />
        <MediumButton open={open} buttons={mediumButtons} />
        <LargeButton largeButton={largeButton} />
      </C>
    </ThemeProvider>
  );
};

export default Container;
