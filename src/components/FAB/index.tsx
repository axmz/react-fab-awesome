import React, { useRef, useContext } from "react";
import { interpolate, useSpring, useTransition, useChain } from "react-spring";
import "./Styles.scss";

// SVG
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";

// Components
import Container from "./Container";
import Overlay from "./Overlay";
import SmallButton from "./SmallButton";
import MediumButton from "./MediumButton";
import LargeButton from "./LargeButton";

// Ctx
import { Context } from "../../context/Context";

export default function() {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const { open } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;

  //////////////////////////////////////// Refs
  const springRef = useRef(null);
  const transitionRef = useRef(null);

  //////////////////////////////////////// Spring
  const height = -170;
  const [{ y, rot }, set] = useSpring(() => ({
    ref: springRef,
    config: { mass: 1, tension: 320, friction: 23 },
    from: { y: 0, rot: 0 }
  }));

  //////////////////////////////////////// functions
  const openMenu = () => {
    toggleOpen(true);
    set({ y: height, rot: 180 });
  };

  const closeMenu = () => {
    toggleOpen(false);
    set({ y: 0, rot: 0 });
  };

  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    open ? closeMenu() : openMenu();
    updateLog(message);
    updateLog("Open: " + !open);
  };

  // Click handels for large button are in the LargeButton component

  const handleOverlayClick = () => {
    closeMenu();
    updateLog("Overlay clicked");
    updateLog("Open: " + !open);
  };

  //////////////////////////////////////// Transition
  const items = [1, 2, 3];
  const transitions = useTransition(open ? items : [], (item: any) => item, {
    ref: transitionRef,
    trail: 100,
    config: { mass: 1, tension: 320, friction: 19 },
    from: {
      position: "absolute",
      left: "0%",
      right: "0%",
      margin: "0 auto",
      width: "0px",
      opacity: 0,
      transform: `translate3d(${0}px, ${-20}px, 0px)`
    },
    enter: {
      opacity: 1,
      transform: `translate3d(${0}px, ${0}px, 0px)`
    },
    leave: item => {
      let mod = item % 2;
      let nr = -1;
      if (mod) {
        nr = 1;
      }
      return {
        transform: `translate3d(${nr * 20}px, ${-20}px, 0px)`,
        opacity: 0
      };
    }
  });

  //////////////////////////////////////// CHAIN
  const springStart = 0;
  const transitionDelay = 0.2;
  useChain(open ? [springRef, transitionRef] : [transitionRef, springRef], [
    springStart,
    transitionDelay
  ]);

  return (
    <>
      <Overlay
        onClick={() => handleOverlayClick()}
        style={{
          zIndex: open ? 1 : -1,
          opacity: y.to([0, height], [0, 1]),
          touchAction: y.to(v => (v > 0 ? "auto" : "none"))
        }}
      />
      <Container>
        <SmallButton
          style={{
            transform: interpolate(
              [y, rot],
              (y, rot) => `translateY(${y}px) rotateX(${rot}deg)`
            )
          }}
          onClick={() => handleButtonClick("Small button clicked")}
        >
          <Arrow className={"button__icon--small"} />
        </SmallButton>
        {transitions.map(({ item, key, props }) => (
          <MediumButton
            key={key}
            item={item}
            style={{ ...props, top: `${-9 + 3 * (-1 + item)}rem` }}
            onClick={() => handleButtonClick("Medium button clicked")}
          />
        ))}
        <LargeButton>
          <Plus className={"button__icon--large"} />
        </LargeButton>
      </Container>
    </>
  );
}
