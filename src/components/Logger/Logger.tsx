import React, { useContext, useRef, useEffect } from "react";
import "./Styles.scss";
import { Context } from "../../context/Context";

interface Props {
  text: string;
}

const Logger: React.FC<Props> = ({ text }) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      const height = ref.current.scrollHeight;
      ref.current.scrollTo({ top: height, left: 0, behavior: "smooth" });
    }
  }, [text]);

  return (
    <div className={"logger__container"}>
      <textarea ref={ref} defaultValue={text} rows={10}></textarea>
    </div>
  );
};

export default Logger;
