import React  from "react";
import {  animated } from "react-spring";
import styled from "styled-components";
import { Clickable } from "../Container/Button";

const MB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1.5rem", "antiquewhite")};
  ${({ theme }) => theme.centeredCircleMixin()};
  // top: -1rem;
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

interface Props {
  buttonProps: Clickable;
  style: {}
}

const MediumButton: React.FC<Props> = ({style, buttonProps}) => {
  return (
    <MB 
      style={{...style, ...buttonProps.styles}}
      onClick={(e: any) => buttonProps.cb(e)} 
    >
      <Centered>
        <buttonProps.icon/>
      </Centered>
    </MB>
  );
};

export default MediumButton;
