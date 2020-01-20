import React from "react";
import styled from "styled-components";

const C = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 20;
`;

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <C>{children}</C>;
};

export default Container;
