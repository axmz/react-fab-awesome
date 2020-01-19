import React, { useContext, ReactNode, MutableRefObject } from "react";
import "./Styles.scss";
import {
  useSpring,
  animated,
  interpolate,
} from "react-spring";
import {Context, ContextType } from "../../context/Context";

interface Props {
  children: ReactNode;
  ref: MutableRefObject<null>;
}

const SmallButton: React.FC<Props> = ({ children, ref }) => {
  const {open, toggleOpen} = useContext(Context);

  // Spring
  const { y, rot } = useSpring({
    ref,
    config: { mass: 1, tension: 320, friction: 23 },
    from: { y: 0, rot: 0 },
    y: open ? -170 : 0,
    rot: open ? 180 : 0
  });

  // handleClick
  const handleClick = () => {
    if(toggleOpen) {
      toggleOpen(!open);
    }
  };

  return (
    <animated.div
      style={{
        transform: interpolate(
          [y, rot],
          (y, rot) => `translateX(${0}px) translateY(${y}px) rotateX(${rot}deg)`
        )
      }}
      onClick={handleClick}
    >
      <div className={"fab__button--small"}>{children}</div>
    </animated.div>
  );
};


// export default SmallButton;
