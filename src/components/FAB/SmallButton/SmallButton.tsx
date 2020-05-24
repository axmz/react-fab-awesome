import React  from "react";
import { animated } from "react-spring";
import styled from "styled-components";
import { Clickable } from "../Container/Button";

const SB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1rem", "#589d62")};
  ${({ theme }) => theme.centeredCircleMixin()};
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

interface Props {
  style: {};
  buttonProps: Clickable;
}

const SmallButton: React.FC<Props> = ({
  buttonProps,
  style,
}) => {
  return (
    <SB
      style={{ ...style, ...buttonProps.styles }}
      onClick={(e: any) => buttonProps.cb(e)}
    >
      <Centered>
        <buttonProps.icon />
      </Centered>
    </SB>
  );
};

export default SmallButton;