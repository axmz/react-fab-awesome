import React, { useContext } from "react";
import styled  from "styled-components";
import { Context } from "../../context/Context";

const C = styled.div<any>`
  position: absolute;
  bottom: 0;
  ${({ left }) => (!left ? `left: 0` : "right: 0")};
  z-index: 20;
`;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { checked } = useContext(Context);
  return <C left={checked}>{children}</C>;
};

export default Container;
