import React, { useRef, useEffect, useContext, ReactNode } from "react";
import { to, animated, useSpring, SpringHandle } from "react-spring";
import styled from "styled-components";
import "../Styles.scss";

// Ctx
import { Context } from "../../../context/Context";

// styled
const SB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("0.6rem", "#589d62")};
  ${({ theme }) => theme.centeredCircleMixin()};
  top: -1.1rem;
`;

// Props
interface Props {
  children: ReactNode;
  handleClick: (s: string) => void;
  style: {}
}

// component
const SmallButton: React.FC<Props> = ({handleClick, style, children, ...otherProps }) => {


  return (
    <SB 
      style={style} 
      className={"SB"} 
      onClick={() => handleClick("Small button clicked")} 
      {...otherProps}
    >
      {children}
    </SB>
  );
};

export default SmallButton;
