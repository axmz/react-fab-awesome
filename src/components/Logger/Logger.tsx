import React, { useContext } from "react";
import "./Styles.scss";
import { Context, ContextType } from "../../context/Context";

interface Props {}

const Logger: React.FC<Props> = () => {
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
    <div className={"logger__container"}>
      <textarea defaultValue={parsed} rows={10}></textarea>
    </div>
  );
};

export default Logger;
