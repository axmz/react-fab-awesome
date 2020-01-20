import React, { useContext, ReactNode, MutableRefObject } from "react";
import styled from "styled-components";
import "./Styles.scss";
import { useSpring, animated, interpolate } from "react-spring";
import { Context, ContextType } from "../../context/Context";

interface Props {
  children: ReactNode;
  style: {};
  onClick: () => void
}

const SB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("0.6rem", "brown")};
  ${({ theme }) => theme.centeredCircleMixin()};
  top: -1rem;
`;
const SmallButton: React.FC<Props> = ({ children, ...otherProps }) => {
  return <SB {...otherProps}>{children}</SB>;
};

export default SmallButton;
