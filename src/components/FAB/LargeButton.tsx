import React, { useContext, ReactNode } from "react";
import styled from "styled-components";
import useLongPress from "../../Utils/longpress";
import { Context } from "../../context/Context";
import "./Styles.scss";

interface LBProps {
  children?: ReactNode;
}

const LB = styled.div`
    ${({ theme }) => theme.circleMixin("1.8rem", "#536d6c")};
    margin: 0.8rem;
    user-select: none;
  }
`;

const Icon = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
  width: 25%;
  height: 25%;
  fill: white;
`;

const LargeButton: React.FC<LBProps> = ({ children, ...otherProps }) => {
  const ctx = useContext(Context);
  const updateLog = ctx.updateLog!;

  const bind = useLongPress(
    () => updateLog("Short press"),
    () => updateLog("Long press"),
    1000
  );
  return (
    <LB className={"LB"} {...otherProps} {...bind}>
      <Icon className={"Icon"}>{children}</Icon>
    </LB>
  );
};

export default LargeButton;
