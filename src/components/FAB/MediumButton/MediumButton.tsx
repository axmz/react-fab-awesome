import React, { ReactNode } from "react";
import {  animated } from "react-spring";
import styled from "styled-components";

const MB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1rem", "antiquewhite")};
  ${({ theme }) => theme.centeredCircleMixin()};
  top: -1rem;
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

interface Props {
  children?: ReactNode;
  key: any;
  style: {};
  Icon: any; 
  handleClick: (e: any) => void;
}

const MediumButton: React.FC<Props> = ({Icon, style, handleClick, ...otherProps }) => {
  return (
    <MB 
      style={style} 
      onClick={(e: any) => handleClick(e)} 
    >
      <Centered>
        <Icon/>
      </Centered>
    </MB>
  );
};

export default MediumButton;
