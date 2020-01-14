import React, { useRef } from "react";
import "./Styles.scss";
import LargeButton from "./LargeButton";
import MediumButton from "./MediumButton";
import SmallButton from "./SmallButton";
import { useSpring, animated, useTransition, useChain } from "react-spring";

const Container: React.FC = () => {
  const [on, toggle] = React.useState(false);

  // Animation 1
  const springRef = useRef();
  const {y} = useSpring({
    ref: springRef,
    from: {y: 0},
    y: on ? -100 : 0
  });

  console.log(y)
  // Transition
  const items = [1, 2, 3];
  const transitionRef = useRef();
  const transitions = useTransition(items, null, {
    ref: transitionRef,
    from: {display: 'none', opacity: 0, transform: `translateY(-20px)` },
    enter: { display: 'block',opacity: 1, transform: `translateY(0px)` },
    leave: { display: 'none',opacity: 0, transform: `translateY(-20px)` }
  });

  // Chain
  useChain(on ? [springRef, transitionRef] : [transitionRef, springRef]);

  // handleClick
  const handleClick = () => {
    toggle(!on);
  };

  // useEffect
  React.useEffect(() => {
    console.log(on);
  }, [on]);

  return (
    <div className={"fab__container"}>
      <animated.div
        style={{
          // transform: y.interpolate( val => `translateY(${val})`)
          // transform: `translateY(${y}px)`
          transform: y.interpolate(y => `translateY(${y}px)`)
        }}
        onClick={handleClick}
      >
        <SmallButton />
      </animated.div>
      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          <MediumButton />
        </animated.div>
      ))}
      <LargeButton />
    </div>
  );
};

export default Container;
