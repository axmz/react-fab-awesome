import React, {
  useRef,
  useEffect,
  createContext,
  useContext,
  ReactNode
} from "react";
import { interpolate, animated, useSpring, SpringHandle } from "react-spring";
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
const SB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("0.6rem", "#589d62")};
  ${({ theme }) => theme.centeredCircleMixin()};
  top: -1.1rem;
`;

// component
const SmallButton: React.FC<Props> = ({ children, ...otherProps }) => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const { open, Y } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;
  const collectRef = ctx.collectRef!;
  const forgetRef = ctx.forgetRef!;
  const setY = ctx.setY!;

  //////////////////////////////////////// Refs
  const springRef = useRef() as React.RefObject<SpringHandle>;

  //////////////////////////////////////// Spring
  const height = -175;
  const [{ y, rot }, set] = useSpring(() => ({
    ref: springRef,
    config: { mass: 1, tension: 320, friction: 25 },
    from: { y: 0, rot: 0 }
  }));

  useEffect(() => {
    collectRef(springRef);

    return () => {
      forgetRef(springRef);
    };
  }, [collectRef, forgetRef, springRef]);

  //////////////////////////////////////// functions

  const openMenu = () => {
    toggleOpen(true);
    set({ y: height, rot: 180 });
    setY(height);
  };

  const closeMenu = () => {
    toggleOpen(false);
    set({ y: 0, rot: 0 });
    setY(0);
  };

  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    open ? closeMenu() : openMenu();
    updateLog(message);
    updateLog("Open: " + !open);
  };

  //////////////////////////////////////// Gestures
  const bind = useDrag(({ down, movement: [mx, my] }) => {});

  return (
    <SB
      {...bind()}
      style={{
        transform: interpolate(
          [y, rot],
          (y, rot) => `translateY(${y}px) rotateX(${rot}deg)`
        )
      }}
      onClick={() => handleButtonClick("Small button clicked")}
      {...otherProps}
    >
      {children}
    </SB>
  );
};

export default SmallButton;
