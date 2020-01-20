import { useState, useEffect, useLayoutEffect, useRef } from "react";

export default function useLongPress(
  onShortPress: Function = () => {},
  onLongPress: Function = () => {},
  ms = 300
) {
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
    onMouseDown: () => setStartLongPress(true),
    onMouseUp: () => setStartLongPress(false),
    onMouseLeave: () => setStartLongPress(false),
    onTouchStart: () => setStartLongPress(true),
    onTouchEnd: () => setStartLongPress(false)
  };
}
