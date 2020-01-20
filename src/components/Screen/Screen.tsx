import React from "react";
import "./Screen.scss";

interface Props {
  name?: string
  children: React.ReactNode
}

const Container: React.FC<Props> = ({children}) => {
  return <div className={"container"}>{children}</div>;
};

export default Container;
