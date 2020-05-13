import React, { ReactNode } from "react";
import styled from "styled-components";

interface LBProps {
  children: ReactNode;
}

const LB = styled.div`
    ${({ theme }) => theme.circleMixin("2rem", "#536d6c")};
    margin: 1rem;
    position: relative
  }
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

const LargeButton: React.FC<LBProps> = ({children, ...otherProps }) => {
  return (
    <LB {...otherProps} >
      <Centered>{children}</Centered>
    </LB>
  );
};

export default LargeButton;
