import React from "react";
import styled from "styled-components";
import { Clickable } from "../Container/Button";

interface Props {
  buttonProps: Clickable;
  style: {}
}

const LB = styled.div`
    ${({ theme }) => theme.circleMixin("3rem", "#536d6c")};
    position: relative;
  }
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

const LargeButton: React.FC<Props> = ({ buttonProps, style }) => {
  return (
    <LB
      style={{...buttonProps.styles, ...style}}
      onClick={(e: any) => buttonProps.cb(e)}
    >
      <Centered>
        <buttonProps.icon />
      </Centered>
    </LB>
  );
};

export default LargeButton;
