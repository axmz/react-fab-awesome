import React, { useRef, useEffect } from "react";
// Style
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import theme from "../globalMixins";
// Components
import Overlay from "../Overlay/Overlay";
import SmallButton from "../SmallButton/SmallButton";
import MediumButton from "../MediumButton/MediumButton";
import LargeButton from "../LargeButton/LargeButton";
// Spring
import { useChain, SpringHandle, useSpring, to, useTransition } from "react-spring";
import { Clickable } from "./Button";

const C = styled.div<any>`
  position: absolute;
  bottom: 0;
  ${({ left }) => (!left ? `left: 0` : "right: 0")};
  z-index: 20;
`;

interface Props {
  open: boolean;
  left?: boolean;
  mediumButtons: Clickable[];
  smallButton: Clickable;
  largeButton: Clickable;
  overlay:Clickable;
}

const Container: React.FC<Props> = ({
  open,
  left,
  smallButton,
  largeButton,
  mediumButtons,
  overlay,
}) => {
  //                                       OVERLAY SPRING
  const { opacity } = useSpring({ opacity: open ? 1 : 0, from: { opacity: 0 }  });

  const overlayStyle = {
    zIndex: open ? 1 : -1,
    opacity: opacity,
    touchAction: open ? "auto" : "none",
  };

  //                                       LARGE BUTTON 
  //                                       Dimensions
  const lbmx = 1 // large button x margins
  const lbmb = 1 // large button margin bottom
  const m = 2 // commong margin. same as lbm for consistency

  //                                       MEDIUM BUTTONS
  //                                       Refs
  const transitionRef = useRef() as React.RefObject<SpringHandle>;

  //                                       Dimensions
  const coef = 1.5 // when = 1, it is proportional to 1rem padding for small button and 2rem for large button
  const n = mediumButtons.length; // count of medium buttons
  const mbh = 1 * 2 * coef // heigth medium button = padding x 2 x coef
  const mbl = mbh + m // medium button lift

  //                                       Transition
  const transitions = useTransition(open ? mediumButtons : [], (button: any) => button.id, {
    ref: transitionRef,
    trail: 50,
    config: { mass: 1, tension: 320, friction: 19 },
    unique: true,
    from: {
      opacity: 0,
      transform: `translate3d(0rem, ${-2}rem, 0rem)`,
    },
    enter: (button) => {
      return {
        opacity: 1,
        transform: `translate3d(0rem, 0rem, 0rem)`,
        top: `${-mbl * (1 + button.id)}rem`, // +1 shift all medium buttons down. this depends on the padding of the circle.
      };
    },
    leave: (button) => {
      let mod = button.id % 2;
      let nr = -1;
      if (mod) {
        nr = 1;
      }
      return {
        transform: `translate3d(${nr * 1.25}rem, ${-2}rem, 0rem)`,
        opacity: 0,
      };
    },
  });


  //                                       SMALL BUTTON
  //                                       Ref
  const springRef = useRef() as React.RefObject<SpringHandle>;

  //                                       Spring
  const sbh = 1 * 2 * coef // height of small button = padding 1rem * 2 * coef
  const initial = sbh + m 
  const sbl = mbl * (n + 1)
  const config = { mass: 1, tension: 320, friction: 25 };

  const [{ y, rot }, set] = useSpring(() => ({
    ref: springRef,
    config,
    from: { y: -initial, rot: 0, color: "red" }, // why red color?
  }));

  //                                       useEffect
  useEffect(() => {
    const openMenu = () => {
      set({ y: -sbl, rot: 180 });
    };

    const closeMenu = () => {
      set({ y: -initial, rot: 0 });
    };

    open ? openMenu() : closeMenu();
  }, [open, sbl, set]);

  //                                       Style
  const smallButtonStyle = {
    transform: to([y, rot], (y, rot) => `translateY(${y}rem) rotateX(${rot}deg)`),
  };



  //                                       CHAIN
  const springStart = 0;
  const transitionDelay = 0.15;

  useChain(open ? [springRef, transitionRef] : [transitionRef, springRef], [
    springStart,
    transitionDelay,
  ]);

  return (
    <ThemeProvider theme={theme}>
      <Overlay
        overlayProps={overlay}
        style={overlayStyle}
      />
      <C
        left={left}
      >
        <SmallButton
          buttonProps={smallButton}
          style={smallButtonStyle}
        />
        {transitions.map(({ key, props, item }) => (
          <MediumButton
            buttonProps={item}
            key={key}
            style={props}
          />
        ))}
        <LargeButton
          buttonProps={largeButton}
          // style={{margin: "0rem"}}
          style={{margin: `0rem ${lbmx * coef}rem ${lbmb}rem`}}
        />
      </C>
    </ThemeProvider>
  );
};

export default Container;
