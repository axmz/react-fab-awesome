import React from "react";
import Container from "./Container/Container";
import "./Styles.scss";
import Emoji from "./Emoji/Emoji";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { Button } from "./Container/Button";

//-------------------------------------- Buttons
const defaultLargeButton: Button = {
  id: 0,
  icon: () => <Plus fill={"white"} width={"30%"} height={"30%"} />,
  cb: () => {},
};

const defaultMediumButtons: Button[] = [
  {
    id: 0,
    icon: () => <Emoji label={"fruit"} symbol={"🍊"}></Emoji>,
    cb: (e: any) => console.log(e, "clicked"),
  },
  {
    id: 1,
    icon: () => <Emoji label={"fruit"} symbol={"🥓"}></Emoji>,
    cb: (e: any) => console.log(e, "clicked"),
  },
  {
    id: 2,
    icon: () => <Emoji label={"fruit"} symbol={"🍌"}></Emoji>,
    cb: (e: any) => console.log(e, "clicked"),
  },
];

const defaultSmallButton: Button = {
  id: 0,
  icon: () => <Arrow fill={"white"} width={".6rem"} height={".6rem"} />,
  cb: () => {},
};

interface Props {
  mediumButtons?: Button[];
  smallButton?: Button;
  largeButton?: Button;
  left?: boolean;
  open: boolean;
}

const FAB: React.FC<Props> = function ({
  open = false,
  left = false,
  mediumButtons = defaultMediumButtons,
  smallButton = defaultSmallButton,
  largeButton = defaultLargeButton,
}) {
  return (
    <Container
      open={open}
      left={left}
      mediumButtons={mediumButtons}
      smallButton={smallButton}
      largeButton={largeButton}
    />
  );
};

export default FAB;
