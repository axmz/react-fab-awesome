import React, {  ReactNode,  } from "react";
import {  animated,  } from "react-spring";
import styled from "styled-components";
import "./Styles.scss";

interface Props {
  children: ReactNode;
  style: {};
  onClick: () => void
}

const SB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("0.6rem", "#589d62")};
  ${({ theme }) => theme.centeredCircleMixin()};
  top: -1rem;
`;
const SmallButton: React.FC<Props> = ({ children, ...otherProps }) => {
  return <SB {...otherProps}>{children}</SB>;
};

export default SmallButton;
