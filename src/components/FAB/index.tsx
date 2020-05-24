import React, { useState } from "react";
import Container from "./Container/Container";
import Emoji from "./Emoji/Emoji";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { Clickable } from "./Container/Button";


interface Props {
  smallButton?: Clickable;
  mediumButtons?: Clickable[];
  largeButton?: Clickable;
  overlay?: Clickable;
  left?: boolean;
  open: boolean;
}

const FAB: React.FC<Props> = function ({
  open = false,
  left = false,
  smallButton,
  mediumButtons,
  largeButton,
  overlay
}) {
  const [o, toggleOpen] = useState(open)

  //-------------------------------------- Default Buttons / Overlay
  //                                       Large
  const defaultLargeButton: Clickable = {
    id: 0,
    icon: () => <Plus fill={"white"} width={"30%"} height={"30%"} />,
    cb: () => toggleOpen(!o),
    styles: {}
  };

  //                                       Medium
  const defaultMediumButtons: Clickable[] = [
    {
      id: 0,
      icon: () => <Emoji label={"fruit"} symbol={"🍊"}></Emoji>,
      cb: () => toggleOpen(!o),
      styles: {}
    },
    {
      id: 1,
      icon: () => <Emoji label={"fruit"} symbol={"🥓"}></Emoji>,
      cb: () => toggleOpen(!o),
      styles: {}
    },
    {
      id: 2,
      icon: () => <Emoji label={"fruit"} symbol={"🍌"}></Emoji>,
      cb: () => toggleOpen(!o),
      styles: {}
    },
  ];

  //                                       Small
  const defaultSmallButton: Clickable = {
    id: 0,
    icon: () => <Arrow fill={"white"} width={".6rem"} height={".6rem"} />,
    cb: () => toggleOpen(!o),
    styles: {}
  };

  //                                       Overlay
  const defaultOverlay: Clickable = {
    id: 0,
    cb: () => toggleOpen(!o),
    styles: {}
  }

  return (
    <Container
      open={open ? open : o}
      left={left}
      mediumButtons={mediumButtons ? mediumButtons : defaultMediumButtons}
      smallButton={smallButton ? smallButton : defaultSmallButton}
      largeButton={largeButton ? largeButton : defaultLargeButton}
      overlay={overlay ? overlay : defaultOverlay}
    />
  );
};

export default FAB;
