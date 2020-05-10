import React, { useRef, useEffect, useContext, ReactNode } from "react";
import { useTransition, animated, SpringHandle } from "react-spring";
import styled from "styled-components";
import "../Styles.scss";

const MB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1rem", "#c6c1bb")};
  ${({ theme }) => theme.centeredCircleMixin()};
`;

// Props
interface Props {
  children?: ReactNode;
  key: any;
  props: {};
  handleClick: (s: string) => void;
}

// component
const MediumButton: React.FC<Props> = ({ key, props, handleClick, ...otherProps }) => {
  return <MB 
  className={"MB"} 
  key={key} 
  style={props} 
  onClick={() => handleClick("Medium button clicked")} />;
};

export default MediumButton;
