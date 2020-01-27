import React, { useRef, useEffect, useContext, ReactNode } from "react";
import { to, animated, useSpring, SpringHandle } from "react-spring";
import { useDrag } from "react-use-gesture";
import styled from "styled-components";
import "./Styles.scss";

// Ctx
import { Context } from "../../context/Context";

// Props
interface Props {
  children: ReactNode;
}

// styled
const SB = styled.div`
  ${({ theme }) => theme.circleMixin("0.6rem", "#589d62")};
  ${({ theme }) => theme.centeredCircleMixin()};
  top: -1.1rem;
`;

// component
const SmallButton: React.FC<Props> = ({ children, ...otherProps }) => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const open = ctx.open!;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;
  const collectRef = ctx.collectRef!;
  const forgetRef = ctx.forgetRef!;
  const setY = ctx.setY!;

  //////////////////////////////////////// Refs
  const springRef = useRef() as React.RefObject<SpringHandle>;

  //////////////////////////////////////// Spring
  const height = -180;
  const [{ y, rot, color }, set] = useSpring(() => ({
    ref: springRef,
    config: { mass: 1, tension: 320, friction: 25 },
    from: { y: 0, rot: 0, color: "red" }
  }));

  //////////////////////////////////////// useEffect
  useEffect(() => {
    if (open) {
      set({ y: height, rot: 180 });
    } else {
      set({ y: 0, rot: 0 });
    }
  }, [open, set, height]);

  useEffect(() => {
    collectRef(springRef);

    return () => {
      forgetRef(springRef);
    };
  }, [collectRef, forgetRef, springRef]);
  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    toggleOpen(!open);
    setY(y);
    updateLog(message);
    updateLog("Open: " + !open);
  };

  //////////////////////////////////////// Gestures
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ y: down ? my : 0 });
    console.log(y);
    console.log(my);
  });

  return (
    <animated.div
      {...bind()}
      style={{
        transform: to(
          [y, rot],
          (y, rot) => `translateY(${y}px) rotateX(${rot}deg)`
        ),
        backgroundColor: color
      }}
      className={'SB'}
    >
      <SB
        onClick={() => handleButtonClick("Small button clicked")}
        {...otherProps}
      >
        {children}
      </SB>
    </animated.div>
  );
};

export default SmallButton;
