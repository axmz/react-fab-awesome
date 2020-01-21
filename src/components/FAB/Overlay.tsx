import React from 'react'
import styled from "styled-components";
import { animated } from "react-spring";

const O = styled(animated.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6)
`
interface Props {
  style: {};
  onClick: () => void
}

const Overlay: React.FC<Props> = ({style, ...otherProps}) => {

  return (
    <O {...otherProps} style={style}></O>
  )
}

export default Overlay