import React, { useContext } from "react";
import Switch from './Switch'
import { Context } from "../../context/Context";

const SwitchContainer = () => {
  const ctx = useContext(Context);
  const setChecked = ctx.setChecked!;
  const updateLog = ctx.updateLog!;

  const handleClick = (e: any) => {
    setChecked(e.target.checked);
    updateLog('L/R hand mode changed')
  };

  return (
    <Switch handleClick={handleClick}/>
  )
}

export default SwitchContainer