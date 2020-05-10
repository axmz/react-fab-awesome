import React, { useContext, useRef, useEffect } from "react";
import Logger from './Logger'
import { Context } from "../../context/Context";

const LoggerContainer = () => {
  const { log } = useContext(Context);

  let parsed = "";
  if (log) {
    parsed = log.reduce((acc, cur, i) => {
      if (i === 0) {
        return acc + "> " + cur;
      }
      return acc + "\n> " + cur;
    }, "");
  }

  return (
    <Logger text={parsed}/>
  )
}

export default LoggerContainer