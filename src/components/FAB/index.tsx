import React from "react";
import Container from "./Container/Container";
import "./Styles.scss";
import Emoji from "./Emoji/Emoji";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { Clickable } from "./Container/Button";

//-------------------------------------- Buttons
const defaultLargeButton: Clickable = {
  id: 0,
  icon: () => <Plus fill={"white"} width={"30%"} height={"30%"} />,
  cb: () => { },
  styles: {}
};

const defaultMediumButtons: Clickable[] = [
  {
    id: 0,
    icon: () => <Emoji label={"fruit"} symbol={"🍊"}></Emoji>,
    cb: (e: any) => console.log(e, "clicked"),
    styles: {}
  },
  {
    id: 1,
    icon: () => <Emoji label={"fruit"} symbol={"🥓"}></Emoji>,
    cb: (e: any) => console.log(e, "clicked"),
    styles: {}
  },
  {
    id: 2,
    icon: () => <Emoji label={"fruit"} symbol={"🍌"}></Emoji>,
    cb: (e: any) => console.log(e, "clicked"),
    styles: {}
  },
];

const defaultSmallButton: Clickable = {
  id: 0,
  icon: () => <Arrow fill={"white"} width={".6rem"} height={".6rem"} />,
  cb: () => {},
  styles: {}
};

const defaultOverlay: Clickable = {
  id: 0,
  cb: () => {},
  styles: {}
}

interface Props {
  mediumButtons?: Clickable[];
  smallButton?: Clickable;
  largeButton?: Clickable;
  overlay?: Clickable;
  left?: boolean;
  open: boolean;
}

const FAB: React.FC<Props> = function ({
  open = false,
  left = false,
  mediumButtons = defaultMediumButtons,
  smallButton = defaultSmallButton,
  largeButton = defaultLargeButton,
  overlay = defaultOverlay,
}) {
  return (
    <Container
      open={open}
      left={left}
      mediumButtons={mediumButtons}
      smallButton={smallButton}
      largeButton={largeButton}
      overlay={overlay}
    />
  );
};

export default FAB;
