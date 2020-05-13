import React, { useRef, useEffect, useContext } from "react";
import { to, useSpring, SpringHandle } from "react-spring";
import SmallButton from "./SmallButton"
// import "../Styles.scss";
// Ctx
import { Context } from "../../../context/Context";
import { Button } from "../Container/Button";

interface Props {
  smallButton: Button,
  buttonsCount: number,
  open: boolean,
}

const SmallButtonContainer: React.FC<Props> = ({open, smallButton, buttonsCount}) => {
  const {icon, styles, cb} = smallButton
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const collectRef = ctx.collectRef!;
  const forgetRef = ctx.forgetRef!;

  //////////////////////////////////////// Refs
  const springRef = useRef() as React.RefObject<SpringHandle>;

  //////////////////////////////////////// Spring
  const height = -4 * buttonsCount // rem
  const config = { mass: 1, tension: 320, friction: 25 };

  const [{ y, rot }, set] = useSpring(() => ({
    ref: springRef,
    config,
    from: { y: 0, rot: 0, color: "red" },
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

  //////////////////////////////////////// Gestures
  const style = {
    transform: to([y, rot], (y, rot) => `translateY(${y}rem) rotateX(${rot}deg)`),
  };

  return (
    <SmallButton handleClick={cb} style={{ ...style, ...styles }}>
      <smallButton.icon/>
    </SmallButton>
  )
}

export default SmallButtonContainer