import React, { ReactNode } from "react";
import { animated } from "react-spring";
import styled from "styled-components";
// import "../Styles.scss";

const SB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1rem", "#589d62")};
  ${({ theme }) => theme.centeredCircleMixin()};
  top: -2rem;
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

interface Props {
  children: ReactNode;
  handleClick: (e: any) => void;
  style: {};
}

const SmallButton: React.FC<Props> = ({
  handleClick,
  style,
  children,
  ...otherProps
}) => {
  return (
    <SB
      style={style}
      onClick={(e: any) => handleClick(e)}
      {...otherProps}
    >
      <Centered>{children}</Centered>
    </SB>
  );
};

export default SmallButton;