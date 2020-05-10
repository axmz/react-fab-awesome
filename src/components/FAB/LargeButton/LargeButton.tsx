import React, { useContext, ReactNode } from "react";
import styled from "styled-components";
import useLongPress from "./longpress";
import { Context } from "../../../context/Context";
import "../Styles.scss";

interface LBProps {
  children: ReactNode;
}

const LB = styled.div`
    ${({ theme }) => theme.circleMixin("1.8rem", "#536d6c")};
    margin: 0.8rem;
    user-select: none;
  }
`;

const Circle = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
  width: 25%;
  height: 25%;
  fill: white;
`;

const LargeButton: React.FC<LBProps> = ({children, ...otherProps }) => {
  return (
    <LB className={"LB"} {...otherProps} >
      <Circle>{children}</Circle>
    </LB>
  );
};

export default LargeButton;
