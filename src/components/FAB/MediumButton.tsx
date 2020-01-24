import React, {
  useRef,
  useEffect,
  useContext,
  ReactNode,
  RefObject
} from "react";
import { useTransition, animated, SpringHandle } from "react-spring";
import styled from "styled-components";
import "./Styles.scss";

// Ctx
import { Context } from "../../context/Context";

// Props
interface Props {
  children?: ReactNode;
}

// styled
interface StyledProps {
  style: any
}
// const MB: React.FC<StyledProps> = styled(animated.div)`
const MB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1rem", "#c6c1bb")};
  ${({ theme }) => theme.centeredCircleMixin()};
`;

// component
const MediumButton: React.FC = ({ ...otherProps }) => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const { open } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;
  const collectRef = ctx.collectRef!;
  const forgetRef = ctx.forgetRef!;
  //////////////////////////////////////// Refs
  const transitionRef = useRef() as React.RefObject<SpringHandle>;

  useEffect(() => {
    collectRef(transitionRef);

    return () => {
      forgetRef(transitionRef);
    };
  }, [collectRef, forgetRef, transitionRef]);

  //////////////////////////////////////// Transition
  const items = [1, 2, 3];
  const transitions = useTransition(open ? items : [], (item: any) => item, {
    ref: transitionRef,
    trail: 100,
    config: { mass: 1, tension: 320, friction: 19 },
    unique: true,
    from: {
      opacity: 0,
      transform: `translate3d(${0}px, ${-20}px, 0px)`
    },
    enter: item => {
      return {
        opacity: 1,
        transform: `translate3d(${0}px, ${20}px, 0px)`,
        top: `${-10 + 3 * (-1 + item)}rem`
      };
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

  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    toggleOpen(!open);
    updateLog(message);
    updateLog("Open: " + !open);
  };

  return (
    <div>
      {transitions.map(({ key, props }) => (
        <MB
          key={key}
          style={props}
          onClick={() => handleButtonClick("Medium button clicked")}
        />
      ))}
    </div>
  );
};

export default MediumButton;
