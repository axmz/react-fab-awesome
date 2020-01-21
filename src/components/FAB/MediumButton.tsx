import React, { ReactNode } from "react";
import { animated } from "react-spring";
import styled from "styled-components";
import "./Styles.scss";

interface Props {
  children?: ReactNode;
  style: {};
  key: any;
  item: any;
  onClick: () => void;
}

const MB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1rem", "#c6c1bb")};
`;

const MediumButton: React.FC<Props> = ({ style, item, ...otherProps }) => {
  return <MB style={style} {...otherProps}></MB>;
};

export default MediumButton;
