import React, { useRef, useEffect } from "react";
// Style
import { ThemeProvider } from "styled-components";
import styled from "styled-components";
import theme from "../globalMixins";
import "../Styles.scss";
// Components
import Overlay from "../Overlay/Overlay";
import SmallButton from "../SmallButton/SmallButton";
import MediumButton from "../MediumButton/MediumButton";
import LargeButton from "../LargeButton/LargeButton";
// Spring
import { useChain, SpringHandle, useSpring, to, useTransition, config as conf } from "react-spring";
import { Clickable } from "./Button";
import { useDrag } from "react-use-gesture"

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
  overlay: Clickable;
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
  const { opacity } = useSpring({ opacity: open ? 1 : 0, from: { opacity: 0 } });

  const overlayStyle = {
    zIndex: open ? 1 : -1,
    opacity: opacity,
    touchAction: open ? "auto" : "none",
  };

  //                                       SMALL BUTTON SPRING
  //                                       Ref
  const springRef = useRef() as React.RefObject<SpringHandle>;
  const draggingRef = useRef(false)
  const sbRef = useRef(null)

  //                                       Spring
  const buttonsCount = mediumButtons.length;
  const height = -4 * buttonsCount // rem
  const config = { mass: 1, tension: 320, friction: 25 };

  const [{ y, rot }, set] = useSpring(() => ({
    ref: springRef,
    config,
    from: { y: 0, rot: 0, color: "red" }, // why red color?
  }));


  //                                       useEffect
  const openMenu = () => {
    set({ y: height, rot: 180 });
  };

  const closeMenu = (velocity = 0) => {
    set({ y: 0, rot: 0, config: { ...conf.stiff, velocity } });
  };

  useEffect(() => {
    open ? openMenu() : closeMenu();
  }, [open, height, set, openMenu, closeMenu]);

  //                                       useDrag
  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel }) => {
      console.log('useDrag')
      if (first) draggingRef.current = true
      // if this is not the first or last frame, it's a moving frame
      // then it means the user is dragging
      else if (last) setTimeout(() => (draggingRef.current = false), 0)

      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) { if (cancel) cancel() }

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      if (last) my > height * 0.75 || vy > 0.5 ? closeMenu(vy) : openMenu()
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else set({ y: my, immediate: false })
    },
    { initial: () => [0, y.getValue()], filterTaps: true, bounds: { top: 0 }, rubberband: true, domTarget: sbRef }
  )


  //                                       Style
  const smallButtonStyle = {
    transform: to([y, rot], (y, rot) => `translateY(${y}rem) rotateX(${rot}deg)`),
  };


  //                                       MEDIUM BUTTONS TRANSITION
  //                                       Refs
  const transitionRef = useRef() as React.RefObject<SpringHandle>;

  const n = mediumButtons.length // number of medium buttons
  const d = 4 // distance of small button from large button for each medium button when opened
  const h = 3 + n * d // 3rem is the space btw large button (middle) and small button when closed
  const c = h / (n + 1) // centered position for middle button
  //                                       Transition
  const transitions = useTransition(open ? mediumButtons : [], (button: any) => button.id, {
    ref: transitionRef,
    trail: 50,
    config: { mass: 1, tension: 320, friction: 19 },
    unique: true,
    from: {
      opacity: 0,
      transform: `translate3d(${0}rem, ${-2}rem, 0rem)`,
    },
    enter: (button) => {
      return {
        opacity: 1,
        transform: `translate3d(${0}rem, ${0}rem, 0rem)`,
        top: `${-c * (1 + button.id) + 1}rem`, // +1 shift all medium buttons down. this depends on the padding of the circle.
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
          {...bind()}
          ref={sbRef}
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
        />
      </C>
    </ThemeProvider>
  );
};

export default Container;
