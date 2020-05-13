import React, { useContext } from "react";
// styles
import "./App.scss";
// components
import Screen from "./components/Screen/Screen";
import FAB from "./components/FAB";
import Logger from "./components/Logger/LoggerContainer";
import Switch from "./components/Switch/SwitchContainer";

// Context
import { Context } from "./context/Context";

// SVG
import Emoji from "./components/FAB/Emoji/Emoji";
import { ReactComponent as Music } from "./assets/music.svg";
import { ReactComponent as Arrow } from "./assets/arrow.svg";
import { ReactComponent as Plus } from "./assets/plus.svg";
import { Button } from "./components/FAB/Container/Button";

// medium buttons
const Orange = () => <Emoji label={"fruit"} symbol={"🍊"}></Emoji>
const Bacon = () =>  <Emoji label={"fruit"} symbol={"🥓"}></Emoji>
const Banana = () => <Emoji label={"fruit"} symbol={"🍌"}></Emoji>
const H = () => <div>hello!</div>

const App: React.FC = () => {
  //////////////////////////////////////// Context
  // const {open, checked, toggleOpen, updateLog} = useContext(Context);
  const ctx = useContext(Context);
  const { open, checked } = ctx;
  const toggleOpen = ctx.toggleOpen!;
  const updateLog = ctx.updateLog!;

  //////////////////////////////////////// handleClicks
  const handleButtonClick = (message: string) => {
    toggleOpen(!open);
    updateLog(message);
    updateLog("Open: " + !open);
  };

  const largeButton: Button = {
    id: 0,
    icon: () => <Plus fill={"white"} width={"30%"} height={"30%"} />,
    cb: () => {},
    styles: {},
  };

  const mediumButtons = [
    {
      id: 0,
      icon: H,
      cb: () => handleButtonClick("Medium button clicked"),
      styles: { backgroundColor: "transparent", boxShadow: "none" },
    }, // Text
    {
      id: 1,
      icon: Bacon,
      cb: () => handleButtonClick("Medium button clicked"),
      styles: { backgroundColor: "transparent", boxShadow: "none" },
    }, // Emoji
    {
      id: 2,
      icon: () => <Music width={"50%"} height={"50%"} />,
      cb: () => handleButtonClick("Medium button clicked"),
      styles: { backgroundColor: "yellow" },
    }, // SVG
  ];

  const smallButton: Button = {
    id: 0,
    icon: () => <Arrow fill={"white"} width={".6rem"} height={".6rem"} />,
    cb: () => handleButtonClick("Small button clicked"),
  };

  return (
    <div className="App">
      <Screen>
        <Switch />
        <Logger />
        <FAB
          open={open ? true : false}
          left={checked}
          mediumButtons={mediumButtons}
          smallButton={smallButton}
          largeButton={largeButton}
        />
      </Screen>
    </div>
  );
};

export default App;
