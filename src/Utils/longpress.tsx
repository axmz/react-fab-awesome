import { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../context/Context";

export default function useLongPress(
  onShortPress: Function = () => {},
  onLongPress: Function = () => {},
  ms = 300
) {
  const ctx = useContext(Context);
  const { open } = ctx;
  const toggleOpen = ctx.toggleOpen!;

  const [startLongPress, setStartLongPress] = useState(false);
  const [executed, setExectued] = useState(false); // check if onLongPress was executed
  const didMount = useRef(false); // To avoid execution at first mount

  useEffect(() => {
    let timerId: number = 0;
    if (didMount.current) {
      setExectued(false);
      if (startLongPress) {
        timerId = setTimeout(() => {
          onLongPress();
          setExectued(true);
        }, ms);
      } else {
        if (!executed) {
          onShortPress();
        }
        clearTimeout(timerId);
      }
    }
    didMount.current = true;
    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  return {
    onMouseDown: () => {
      console.log("onMouseDown");
      setStartLongPress(true);
    },
    onMouseUp: () => {
      console.log("onMouseUp");
      if (open) { toggleOpen(false) }
      setStartLongPress(false);
    },
    onMouseLeave: () => {
      console.log("onMouseLeave");
      setStartLongPress(false);
    },
    onTouchStart: () => {
      console.log("onTouchStart");
      setStartLongPress(true);
    },
    onTouchEnd: (e: any) => {
      e.preventDefault();
      console.log("onTouchEnd");
      if (open) { toggleOpen(false) }
      setStartLongPress(false);
    }
  };
}
