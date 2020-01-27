import React, { useContext } from "react";
import styled, { StyledComponent, StyledFunction } from "styled-components";
import { Context } from "../../context/Context";

const C = styled.div<any>`
  position: absolute;
  bottom: 0;
  ${({ left }) => (!left ? `left: 0` : "right: 0")};
  z-index: 20;
`;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checked } = useContext(Context);
  console.log(checked);
  return <C left={checked}>{children}</C>;
};

export default Container;
