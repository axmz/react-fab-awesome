import React, { ReactNode } from "react";
import './Styles.scss'
import  { ContextType } from "../../context/Context";

interface LBProps {
  children?: ReactNode;
}

const LargeButton: React.FC<LBProps> = ({children}) => {
  return ( <div className={'fab__button--large'}>{children}</div>)
}

export default LargeButton
