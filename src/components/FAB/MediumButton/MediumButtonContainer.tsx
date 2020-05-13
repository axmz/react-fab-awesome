import React, { useRef, useEffect, useContext } from "react";
import { useTransition, SpringHandle } from "react-spring";
import MediumButton from "./MediumButton";

// Ctx
import { Context } from "../../../context/FABContext";
import { Button } from "../Container/Button";

interface Props {
  buttons: Button[];
  open: boolean;
}

const MediumButtonContainer: React.FC<Props> = ({open, buttons}) => {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
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

  const n = buttons.length // number of medium buttons
  const d = 4 // distance of small button from large button for each medium button when opened
  const h = 3 + n * d // 3rem is the space btw large button (middle) and small button when closed
  const c = h / (n + 1) // centered position for middle button
  //////////////////////////////////////// Transition
  const transitions = useTransition(open ? buttons : [], (button: any) => button.id, {
    ref: transitionRef,
    trail: 50,
    config: { mass: 1, tension: 320, friction: 19 },
    unique: true,
    from: {
      opacity: 0,
      transform: `translate3d(${0}rem, ${-2}, 0rem)`,
    },
    enter: (button) => {
      return {
        opacity: 1,
        transform: `translate3d(${0}rem, ${0}rem, 0rem)`,
        top: `${-c *(1 + button.id)+1}rem`, // +1 shift all medium buttons down. this depends on the padding of the circle.
      };
    },
    leave: (button) => {
      let mod = button.id % 2;
      let nr = -1;
      if (mod) {
        nr = 1;
      }
      return {
        transform: `translate3d(${nr * 1.25}rem, ${-2}rem, 0rem)`,
        opacity: 0,
      };
    },
  });

  return (
    <>
      {transitions.map(({ key, props, item }) => (
        <MediumButton 
          Icon={item.icon} 
          key={key} 
          style={{...props, ...item.styles}} 
          handleClick={item.cb} 
        />
      ))}
    </>
  );
};

export default MediumButtonContainer;
