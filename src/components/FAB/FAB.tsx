import React from "react";
import "./FAB.scss";
import { useSpring, animated, interpolate } from "react-spring";

const MenuButton: React.FC = () => {
  const [on, toggle] = React.useState(false);
  const props = useSpring({ y: -100 });

  const handleClick = () => {
    toggle(!on);
  };

  React.useEffect(() => {
    console.log(on);
  }, [on]);

  return (
    <div className="fab__container">
      <div className="fab__main" onClick={handleClick}>
        <animated.div
          style={{
            transform: props.y.interpolate(y => `translateY(${y}px)`),
          }}
        >
          <div className="fab__related">
            <div className="fab__related-1"></div>
            <div className="fab__related-2"></div>
            <div className="fab__related-3"></div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default MenuButton;
