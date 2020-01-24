import React, {
  useCallback,
  useState,
  useRef,
  useContext,
  useEffect
} from "react";
import { useChain, SpringHandle } from "react-spring";
import "./Styles.scss";

// SVG
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";

// Components
import Container from "./Container";
import Overlay from "./Overlay";
import SmallButton from "./SmallButton";
import MediumButton from "./MediumButton";
import LargeButton from "./LargeButton";

// Ctx
import { Context } from "../../context/Context";

export default function() {
  //////////////////////////////////////// Context
  const ctx = useContext(Context);
  const { open } = ctx;
  const collectedRefs = ctx.collectedRefs!;

  //////////////////////////////////////// CHAIN
  const springStart = 0;
  const transitionDelay = .2;
  useEffect(() => {
    console.log("colrefs", collectedRefs);
  }, [collectedRefs]);

  useChain(open ? collectedRefs : collectedRefs.slice().reverse()
  , [ springStart, transitionDelay ]
  );

  return (
    <>
      <Overlay />
      <Container>
        <SmallButton>
          <Arrow className={"button__icon--small"} />
        </SmallButton>
        <MediumButton />
        <LargeButton>
          <Plus className={"button__icon--large"} />
        </LargeButton>
      </Container>
    </>
  );
}
