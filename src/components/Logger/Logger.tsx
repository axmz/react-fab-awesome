import React, { useContext } from "react";
import "./Styles.scss";
import { Context, ContextType } from "../../context/Context";

interface Props {}

const Logger: React.FC<Props> = () => {
  const { log } = useContext(Context);
  return (
    <div className={"logger__container"}>
      <textarea defaultValue={log} rows={10}></textarea>
    </div>
  );
};

export default Logger;
