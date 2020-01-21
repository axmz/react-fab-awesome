import React, {useContext, ReactNode } from "react";
import styled from "styled-components";
import useLongPress from '../../Utils/longpress'
import {Context} from '../../context/Context'
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

const LargeButton: React.FC<LBProps> = ({children, ...otherProps}) => {
  const ctx = useContext(Context);
  const updateLog = ctx.updateLog!;

  const bind = useLongPress(() => updateLog('Short press'), () => updateLog('Long press'), 1000);
  return <LB {...otherProps} {...bind}>{children}</LB>;
};

export default LargeButton;
