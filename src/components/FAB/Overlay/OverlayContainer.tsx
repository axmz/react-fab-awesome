import React, { useContext } from "react";
import Overlay from "./Overlay"
import { Context } from "../../../context/Context";

const OverlayContainer = () => {
  const ctx = useContext(Context);
  const { open } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;

  const handleOverlayClick = () => {
    toggleOpen(!open);
    updateLog("Overlay clicked");
    updateLog("Open: " + !open);
  };

  return <Overlay handleClick={handleOverlayClick} isOpen={open ? true : false}/>;
};

export default OverlayContainer;
