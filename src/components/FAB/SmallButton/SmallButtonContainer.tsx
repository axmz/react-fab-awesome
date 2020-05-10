import React, { useRef, useEffect, useContext, ReactNode } from "react";
import { to, animated, useSpring, SpringHandle } from "react-spring";
import styled from "styled-components";
import SmallButton from "./SmallButton"
import "../Styles.scss";
// Ctx
import { Context } from "../../../context/Context";

interface Props {
  Icon: any
}

const SmallButtonContainer: React.FC<Props> = ({Icon}) => {
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
    transform: to([y, rot], (y, rot) => `translateY(${y}px) rotateX(${rot}deg)`),
  };
  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    toggleOpen(!open);
    updateLog(message);
    updateLog("Open: " + !open);
  };


  return (
    <SmallButton handleClick={handleButtonClick} style={style}>
      <Icon className={"button__icon--small"} />
    </SmallButton>
  )
}

export default SmallButtonContainer