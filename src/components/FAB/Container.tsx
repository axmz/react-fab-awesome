import React, {
  ReactNode,
  useRef,
  useContext,
  MutableRefObject,
  useState
} from "react";
import {
  interpolate,
  useSpring,
  useTransition,
  useChain,
  animated
} from "react-spring";
import "./Styles.scss";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import LargeButton from "./LargeButton";
import SmallButton from "./SmallButton";
import { Context, ContextType } from "../../context/Context";
import MediumButton from "./MediumButton";

interface Props {}

const Container: React.FC<Props> = () => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const { open, log } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const setLog = ctx.setLog!;

  //////////////////////////////////////// Refs
  const springRef = useRef(null);
  const transitionRef = useRef(null);

  //////////////////////////////////////// Spring
  const [{ y, rot }, set] = useSpring(() => ({
    ref: springRef,
    config: { mass: 1, tension: 320, friction: 23 },
    from: { y: 0, rot: 0 }
  }));

  const openMenu = () => {
    toggleOpen(true)
    set({ y: -170, rot: 180 });
  };
  const closeMenu = () => {
    toggleOpen(false)
    set({ y: 0, rot: 0 });
  };
  // handleClick
  const handleSmallButtonClick = (message: string) => {
    toggleOpen(!open);
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
    setLog(prev => {
      const newArr = [...prev];
      newArr.push(message);
      return newArr;
    });
  };
  const handleMediumButtonClick = (message: string) => {
    toggleOpen(!open);
    setLog(prev => {
      const newArr = [...prev];
      newArr.push(message);
      return newArr;
    });
  };
  const handleLargeButtonClick = (message: string) => {
    setLog(prev => {
      const newArr = [...prev];
      newArr.push(message);
      return newArr;
    });
  };

  //////////////////////////////////////// Transition
  const delay = 200;
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
      // transform: `translateX(-50%) translateY(-20px)`,
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
  useChain(open ? [springRef, transitionRef] : [transitionRef, springRef], [
    0,
    0.2
  ]);

  return (
    <div className={"fab__container"}>
      {/*////////////////////////////////////////  SMALL BUTTON */}
      <SmallButton
        style={{
          transform: interpolate(
            [y, rot],
            (y, rot) => `translateY(${y}px) rotateX(${rot}deg)`
          )
        }}
        onClick={() => handleSmallButtonClick(`Small clicked`)}
      >
        <Arrow className={"button__icon--small"} />
      </SmallButton>

      {/* //////////////////////////////////////// MEDIUM BUTTON */}
      {transitions.map(({ item, key, props }) => (
        <MediumButton
          key={key}
          item={item}
          style={{
            ...props,
            top: `${-9 + 3 * (-1 + item)}rem`
          }}
          onClick={() => handleMediumButtonClick("Medium clicked")}
        />
      ))}

      {/* //////////////////////////////////////// LARGE BUTTON */}
      <LargeButton onClick={() => handleLargeButtonClick("Large clicked")}>
        <Plus className={"button__icon--large"} />
      </LargeButton>
    </div>
  );
};

export default Container;
