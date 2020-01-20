import React, { useContext, useRef, useEffect } from "react";
import "./Styles.scss";
import { Context } from "../../context/Context";

interface Props {}

const Logger: React.FC<Props> = () => {
  const { log } = useContext(Context);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.scrollHeight;
      ref.current.scrollTo({ top: height, left: 0, behavior: "smooth" });
    }
    console.log("works");
  }, [log]);

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
    <div className={"logger__container"}>
      <textarea ref={ref} defaultValue={parsed} rows={10}></textarea>
    </div>
  );
};

export default Logger;
