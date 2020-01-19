import React, { ReactNode, useRef, useContext, MutableRefObject, useState } from "react";
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
import { Context, ContextType } from "../../context/Context";

interface Props {}

const Container: React.FC<Props> = () => {
  const { log, setLog } = useContext(Context);
  // const { open, toggleOpen, log, setLog } = useContext(Context);
  const [open, toggleOpen] = useState<boolean>(false);

  //////////////////////////////////////// Refs
  const springRef = useRef(null);
  const transitionRef = useRef(null);

  //////////////////////////////////////// Spring
  const { y, rot } = useSpring({
    ref: springRef,
    config: { mass: 1, tension: 320, friction: 23 },
    from: { y: 0, rot: 0 },
    y: open ? -170 : 0,
    rot: open ? 180 : 0
  });

  // handleClick
  const handleClick = () => {
      toggleOpen(!open);
  };

  //////////////////////////////////////// Transition
  const delay = 200;
  const items = [1, 2, 3];
  const transitions = useTransition(open ? items : [], (item: any) => item, {
    ref: transitionRef,
    trail: 100,
    config: { mass: 1, tension: 320, friction: 19 },
    from: {
      left: "50%",
      opacity: 0,
      transform: `translateY(-20px)`
    },
    enter: {
      // delay,
      left: "50%",
      opacity: 1,
      transform: `translateY(0px)`
    },
    leave: {
      left: "50%",
      transform: `translate3d(-95px, -95px, 0px)`,
      opacity: 0
    }
  });

  //////////////////////////////////////// CHAIN
  useChain(open ? [springRef, transitionRef] : [transitionRef, springRef], [ 0, 0.2 ]);

  return (
    <div className={"fab__container"}>
      {/*////////////////////////////////////////  SMALL BUTTON */}
      <animated.div
        style={{
          transform: interpolate(
            [y, rot],
            (y, rot) =>
              `translateX(${0}px) translateY(${y}px) rotateX(${rot}deg)`
          )
        }}
        onClick={handleClick}
      >
        <div className={"fab__button--small"}>
          <Arrow className={"button__icon--small"} />
        </div>
      </animated.div>
      {/* //////////////////////////////////////// MEDIUM BUTTON */}
      {transitions.map(({ item, key, props }) => (
        <animated.div
          key={key}
          style={{
            ...props,
            position: "absolute",
            top: `${40 * (-1 + item)}px`
          }}
        >
          <div className={"fab__button--medium"}></div>
        </animated.div>
      ))}
      {/* //////////////////////////////////////// LARGE BUTTON */}
      <div className={"fab__button--large"}>
        <Plus className={"button__icon--large"} />
      </div>
    </div>
  );
};

export default Container;
