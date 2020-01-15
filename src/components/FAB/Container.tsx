import React, { useRef } from "react";
import "./Styles.scss";
import LargeButton from "./LargeButton";
import MediumButton from "./MediumButton";
import SmallButton from "./SmallButton";
import {
  useSpring,
  animated,
  useTransition,
  useChain,
} from "react-spring";

const Container: React.FC = () => {
  // Toggle
  const [on, toggle] = React.useState(false);

  // Spring
  const springRef = useRef();
  const { y } = useSpring({
    ref: springRef,
    config: { mass: 1, tension: 320, friction: 19 },
    from: { y: 0 },
    y: on ? -140 : 0
  });

  // Transition
  const items = [1, 2, 3];
  const transitionRef = useRef();
  const transitions = useTransition(on ? items : [], item => item, {
    ref: transitionRef,
    trail: 100,
    config: { mass: 1, tension: 320, friction: 19 },
    from: {
      position: 'absolute',
      left: '50%',
      opacity: 0,
      transform: `translateY(-20px)`
    },
    enter: { 
      position: 'absolute',
      left: '50%',
      opacity: 1, 
      transform: `translateY(0px)` 
    },
    leave: { 
      position: 'absolute',
      left: '50%',
      opacity: 0, 
      transform: `translateY(-20px)` 
    }
  });

  // Chain
  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef], [
    0,
    0.2
  ]);

  // handleClick
  const handleClick = () => {
    toggle(!on);
  };

  // // useEffect
  // React.useEffect(() => {
  //   console.log(on);
  // }, [on]);

  return (
    <div className={"fab__container"}>
      <animated.div
        style={{
          transform: y.interpolate(
            y => `translateX(${0}px) translateY(${y}px)`
          ),
          top: 0,
          right: 0
        }}
        onClick={handleClick}
      >
        <SmallButton />
      </animated.div>
      {transitions.map(({ item, key, props }) => (
        <animated.div
          key={key}
          style={{
            ...props,
            top: `${40*(-1+item)}px`
            // transform: `translateY(${10 * item}px)`
          }}
        >
          <MediumButton />
        </animated.div>
      ))}
      <LargeButton />
    </div>
  );
};

export default Container;
