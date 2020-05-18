import React from "react";
import styled from "styled-components";
import { Clickable } from "../Container/Button";

interface Props {
  buttonProps: Clickable;
}

const LB = styled.div`
    ${({ theme }) => theme.circleMixin("2rem", "#536d6c")};
    margin: 1rem;
    position: relative;
  }
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

const LargeButton: React.FC<Props> = ({ buttonProps }) => {
  return (
    <LB
      style={buttonProps.styles}
      onClick={(e: any) => buttonProps.cb(e)}
    >
      <Centered>
        <buttonProps.icon />
      </Centered>
    </LB>
  );
};

export default LargeButton;
