import React  from "react";
import { animated } from "react-spring";
import styled from "styled-components";
import { Clickable } from "../Container/Button";

const SB = styled(animated.div)`
  ${({ theme }) => theme.circleMixin("1rem", "#589d62")};
  ${({ theme }) => theme.centeredCircleMixin()};
  // top: -2rem;
`;

const Centered = styled.div`
  ${({ theme }) => theme.centeredIconMixin()};
`;

interface Props {
  style: {};
  buttonProps: Clickable;
}

const SmallButton: React.FC<Props> = React.forwardRef(({
  buttonProps,
  style,
}, ref) => {
  return (
    <SB
      ref={ref}
      style={{ ...style, ...buttonProps.styles }}
      onClick={(e: any) => buttonProps.cb(e)}
    >
      <Centered>
        <buttonProps.icon />
      </Centered>
    </SB>
  );
});

export default SmallButton;