import React, { useRef, useEffect, useContext, ReactNode } from "react";
import { to, animated, useSpring, SpringHandle } from "react-spring";
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

  //////////////////////////////////////// Refs
  const springRef = useRef() as React.RefObject<SpringHandle>;

  //////////////////////////////////////// Spring
  const height = -180;
  const config = { mass: 1, tension: 320, friction: 25 };

  const [{ y, rot}, set] = useSpring(() => ({
    ref: springRef,
    config,
    from: { y: 0, rot: 0, color: "red" }
  }));

  //////////////////////////////////////// open / close
  const openMenu = () => {
    set({ y: height, rot: 180 });
  };

  const closeMenu = () => {
    set({ y: 0, rot: 0 });
  };

  //////////////////////////////////////// useEffect
  useEffect(() => {
    open ? openMenu() : closeMenu();
  }, [open]);

  useEffect(() => {
    collectRef(springRef);
    return () => {
      forgetRef(springRef);
    };
  }, [collectRef, forgetRef, springRef]);

  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    toggleOpen(!open);
    updateLog(message);
    updateLog("Open: " + !open);
  };

  //////////////////////////////////////// Gestures
  const style = {
    transform : to( [y, rot], (y, rot) => `translateY(${y}px) rotateX(${rot}deg)`)
  };

  return (
    <animated.div style={style} className={"SB"}>
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
