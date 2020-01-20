import React, { ReactNode } from "react";
import styled from "styled-components";
import "./Styles.scss";

interface LBProps {
  children?: ReactNode;
  onClick: () => void
}

const LB = styled.div`
    ${({ theme }) => theme.circleMixin("1.8rem", "orange")};
    margin: 0.8rem;
  }
`;

const LargeButton: React.FC<LBProps> = ({children}) => {
  return <LB>{children}</LB>;
};

export default LargeButton;
