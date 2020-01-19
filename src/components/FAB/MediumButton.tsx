import React, { useContext, ReactNode, MutableRefObject } from "react";
import "./Styles.scss";
import { useTransition, animated } from "react-spring";
import { Context, ContextType } from "../../context/Context";

interface Props {
  children?: ReactNode;
  ref: MutableRefObject<null>;
}

const MediumButton: React.FC<Props> = ({ ref }) => {
  const { open } = useContext(Context);

  // Transition
  const delay = 200;
  const items = [1, 2, 3];
  const transitions = useTransition(open ? items : [], (item: any) => item, {
    ref,
    trail: 100,
    config: { mass: 1, tension: 320, friction: 19 },
    from: {
      left: "50%",
      opacity: 0,
      transform: `translateY(-20px)`
    },
    enter: {
        delay,
        left: "50%",
        opacity: 1,
        transform: `translateY(0px)`
    },
    leave: {
      left: "50%",
      // transform: `translate3d(-95px, -95px, 0px)`,
      opacity: 0,
    }
  });

  return (
    <>
      {transitions.map(({ item, key, props }) => (
        <animated.div
          key={key}
          style={{
            ...props,
            position: 'absolute',
            top: `${40 * (-1 + item)}px`
          }}
        >
          <div className={"fab__button--medium"}></div>
        </animated.div>
      ))}
    </>
  );
};

export default MediumButton;
