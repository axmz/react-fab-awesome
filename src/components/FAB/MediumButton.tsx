import React, { useContext, ReactNode, MutableRefObject } from "react";
import { useTransition, animated } from "react-spring";
import styled from "styled-components";
import "./Styles.scss";
import { Context, ContextType } from "../../context/Context";

interface Props {
  children?: ReactNode;
  style: {};
  key: any;
  item: any;
  onClick: () => void;
}

// ${({ theme }) => theme.centeredCircleMixin()};
const MB = styled(animated.div)`
${({ theme }) => theme.circleMixin("1rem", "blue")};
`;

const MediumButton: React.FC<Props> = ({ key, style, item, ...otherProps }) => {
  return (
    <MB style={style} {...otherProps}></MB>
  );
};

export default MediumButton;
